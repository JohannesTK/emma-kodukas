import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Since we're using Formspree, we'll redirect to mailto for now
    // In production, you'd integrate with an actual newsletter service
    const mailtoLink = `mailto:emmaleena.niitvahi@gmail.com?subject=Uudiskirja tellimus&body=Palun lisa mind uudiskirja nimekirja: ${email}`;
    window.location.href = mailtoLink;

    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.content}>
          <span style={styles.label}>Ära jää ilma</span>
          <h2 style={styles.title}>Liitu Toidukodu perega</h2>
          <p style={styles.description}>
            Saa esimesena teada uutest retseptidest, toodetest ja erilistest pakkumistest.
          </p>

          {status === 'success' ? (
            <div style={styles.success}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Täname! Kontrollime Sinu e-posti.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form} className="newsletter-form">
              <input
                type="email"
                placeholder="Sinu e-posti aadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={styles.button}
              >
                {status === 'loading' ? 'Saadan...' : 'Liitu nüüd'}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background)',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-lg)',
    color: 'var(--color-primary)',
    display: 'block',
    marginBottom: 'var(--space-3)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-4) 0',
  },
  description: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    margin: '0 0 var(--space-8) 0',
    maxWidth: '550px',
    lineHeight: 1.7,
  },
  form: {
    display: 'flex',
    gap: 'var(--space-3)',
    width: '100%',
    maxWidth: '500px',
  },
  input: {
    flex: 1,
    padding: 'var(--space-4) var(--space-5)',
    fontSize: 'var(--text-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-white)',
  },
  button: {
    padding: 'var(--space-4) var(--space-6)',
    fontSize: 'var(--text-base)',
    fontWeight: 500,
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'background-color var(--transition-fast)',
    whiteSpace: 'nowrap',
  },
  success: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--color-success)',
    fontSize: 'var(--text-base)',
    fontWeight: 500,
  },
  privacy: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    marginTop: 'var(--space-6)',
    marginBottom: 0,
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 480px) {
    .newsletter-form {
      flex-direction: column !important;
    }
    .newsletter-form input,
    .newsletter-form button {
      width: 100% !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default NewsletterSignup;
