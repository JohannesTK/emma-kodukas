import { useState, useEffect, useRef } from 'react';
import {
  getSessionId,
  clearSession,
  getOrCreateSession,
  getMessages,
  saveMessage,
} from '../lib/supabase';
import type { Message } from '../lib/supabase';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

const WELCOME_MESSAGE = `Tere! Olen Sinu isiklik tehisintellektist toidunõustaja, treenitud Emma-Leena toidufilosoofia järgi.

Aitan Sul luua tervislikke ja maitsvaid toidukavasid just Sinu vajadustele.

Räägi mulle:
• Mida Sa armastad süüa?
• Mida Sa ei saa süüa?
• Kui palju aega Sul on süüa teha?`;

const EXAMPLE_PROMPTS = [
  'Tee mulle nädala toidukava, olen vegan',
  'Mul on 30 min aega, mida õhtuks teha?',
  'Tahan rohkem valku, aga ei söö liha',
];

const Tehiskokk = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showExamples, setShowExamples] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session and load messages
  useEffect(() => {
    const initSession = async () => {
      const id = getSessionId();
      setSessionId(id);

      // Try to get existing session and messages
      await getOrCreateSession(id);
      const existingMessages = await getMessages(id);

      if (existingMessages.length > 0) {
        setMessages(
          existingMessages.map((m: Message) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            imageUrl: m.image_url,
          }))
        );
        setShowExamples(false);
      } else {
        // Show welcome message for new sessions
        setMessages([
          {
            id: 'welcome',
            role: 'assistant',
            content: WELCOME_MESSAGE,
          },
        ]);
      }

      setIsInitializing(false);
    };

    initSession();
  }, []);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setShowExamples(false);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Add user message to UI
    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: userMessage },
    ]);

    // Save user message to database
    if (sessionId) {
      await saveMessage(sessionId, 'user', userMessage);
    }

    setIsLoading(true);

    // Create placeholder for streaming response
    const assistantMsgId = `assistant-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: 'assistant', content: '' },
    ]);

    let fullResponse = '';

    try {
      // Call API endpoint with streaming
      const response = await fetch('/api/tehiskokk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages
            .filter((m) => m.id !== 'welcome')
            .concat({ id: userMsgId, role: 'user', content: userMessage })
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Midagi läks valesti');
      }

      // Handle SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Stream not available');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE messages
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);

              if (parsed.error) {
                throw new Error(parsed.error);
              }

              if (parsed.text) {
                fullResponse += parsed.text;
                // Update message in real-time
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId ? { ...m, content: fullResponse } : m
                  )
                );
              }

              if (parsed.done) {
                // Stream complete
              }
            } catch (e) {
              if (e instanceof SyntaxError) {
                // Skip invalid JSON
              } else {
                throw e;
              }
            }
          }
        }
      }

      // Save assistant message to database
      if (sessionId && fullResponse) {
        await saveMessage(sessionId, 'assistant', fullResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      // Update the placeholder message with error
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? { ...m, content: 'Vabandust, midagi läks valesti. Palun proovi uuesti.' }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleNewConversation = () => {
    clearSession();
    const newId = getSessionId();
    setSessionId(newId);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGE,
      },
    ]);
    setShowExamples(true);
  };

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Bullet points
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return `<li key="${i}">${line.slice(2)}</li>`;
        }
        return line;
      })
      .join('\n');
  };

  if (isInitializing) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner} />
            <p>Laadin...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <button
            onClick={handleNewConversation}
            style={styles.newChatButton}
            title="Alusta uut vestlust"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Uus vestlus</span>
          </button>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>Tehiskokk</h1>
            <p style={styles.subtitle}>Emma-Leena isiklik toidunõustaja</p>
          </div>
          <div style={{ width: '120px' }} /> {/* Spacer for balance */}
        </header>

        {/* Chat Container */}
        <div style={styles.chatContainer} className="tehiskokk-chat">
          {/* Messages */}
          <div style={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.messageWrapper,
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {message.role === 'assistant' && (
                  <div style={styles.avatar}>
                    <img
                      src="/images/1.jpeg"
                      alt="Emma-Leena"
                      style={styles.avatarImage}
                    />
                  </div>
                )}
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(message.role === 'user' ? styles.userBubble : styles.assistantBubble),
                  }}
                >
                  <div
                    style={styles.messageContent}
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                  {message.imageUrl && (
                    <img
                      src={message.imageUrl}
                      alt="Retsepti pilt"
                      style={styles.messageImage}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator - only show when streaming hasn't started yet */}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div style={styles.typingIndicator}>
                <span style={styles.typingDot} />
                <span style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
                <span style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
              </div>
            )}

          </div>

          {/* Input Area */}
          <div style={styles.inputArea}>
            <div style={styles.inputContainer}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Kirjuta siia..."
                style={styles.input}
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                style={{
                  ...styles.sendButton,
                  opacity: !input.trim() || isLoading ? 0.5 : 1,
                  cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
                }}
                aria-label="Saada sõnum"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        {showExamples && (
          <div style={styles.examplesContainer}>
            <p style={styles.examplesTitle}>Näited, mida küsida:</p>
            <div style={styles.examplesGrid}>
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  style={styles.exampleButton}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p style={styles.disclaimer}>
          Tehiskokk on tehisintellekti abiline ja ei asenda professionaalset toitumisnõustajat.
          Konsulteeri alati arstiga, kui Sul on terviseprobleeme või erivajadusi.
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)',
    paddingBottom: 'var(--space-8)',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 var(--space-4)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: 'var(--space-4)',
    color: 'var(--color-text-light)',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid var(--color-border)',
    borderTopColor: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-6) 0',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: 'var(--space-4)',
  },
  headerContent: {
    textAlign: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: 0,
  },
  subtitle: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    margin: 'var(--space-1) 0 0 0',
  },
  newChatButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-2) var(--space-4)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-light)',
    fontSize: 'var(--text-sm)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  chatContainer: {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '500px',
    maxHeight: '85vh',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  messageWrapper: {
    display: 'flex',
    gap: 'var(--space-3)',
    alignItems: 'flex-start',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 'var(--space-3) var(--space-4)',
    borderRadius: 'var(--radius-lg)',
    lineHeight: 1.6,
  },
  userBubble: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderBottomRightRadius: 'var(--radius-sm)',
  },
  assistantBubble: {
    backgroundColor: 'var(--color-background-alt)',
    color: 'var(--color-text)',
    borderBottomLeftRadius: 'var(--radius-sm)',
  },
  messageContent: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  messageImage: {
    marginTop: 'var(--space-3)',
    maxWidth: '100%',
    borderRadius: 'var(--radius-md)',
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: 'var(--space-2) 0',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-muted)',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  inputArea: {
    padding: 'var(--space-4)',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-background)',
  },
  inputContainer: {
    display: 'flex',
    gap: 'var(--space-3)',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    padding: 'var(--space-3) var(--space-4)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    fontFamily: 'inherit',
    resize: 'none',
    minHeight: '44px',
    maxHeight: '150px',
    lineHeight: 1.5,
  },
  sendButton: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-fast)',
  },
  examplesContainer: {
    marginTop: 'var(--space-6)',
    padding: 'var(--space-5)',
    backgroundColor: 'var(--color-background-alt)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
  },
  examplesTitle: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    marginBottom: 'var(--space-4)',
  },
  examplesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  },
  exampleButton: {
    padding: 'var(--space-3) var(--space-4)',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    textAlign: 'left',
  },
  disclaimer: {
    marginTop: 'var(--space-6)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-text-muted)',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 1.6,
  },
};

// Add CSS keyframes for animations
const animationStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  .tehiskokk-chat::-webkit-scrollbar {
    width: 6px;
  }
  .tehiskokk-chat::-webkit-scrollbar-track {
    background: transparent;
  }
  .tehiskokk-chat::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
  }
  @media (max-width: 640px) {
    .tehiskokk-chat {
      max-height: calc(100vh - 200px) !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

export default Tehiskokk;
