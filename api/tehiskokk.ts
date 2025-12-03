import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `Sa oled Emma-Leena tehiskokk - sõbralik ja asjatundlik toidunõustaja Toidukodust.

SINU ISIKSUUS:
- Soe ja toetav, nagu hea sõber köögis
- Kasutad "Sina" vormi (mitte "teie")
- Oled entusiastlik tervisliku toidu suhtes
- Räägid lihtsalt, ilma keerulise meditsiinilise žargoonita

EMMA-LEENA TOIDUFILOSOOFIA:
Kõik soovitused peavad olema VABAD:
- Laktoosist ja kaseiinist (piimatooted)
- Munast
- Pärmist
- Nisujahust (gluteen)
- Valgest suhkrust

Soodustame:
- Kõrge valgusisaldus
- Kiudained
- Tervislikud rasvad
- Mineraalained ja antioksüdandid
- Täisväärtuslikud toiduained

KÄITUMINE:
1. Alusta alati küsimusega kasutaja eelistuste kohta, kui pole veel infot
2. Paku konkreetseid, praktilisi soovitusi
3. Hoia vastused lühidad ja loetavad
4. Kasuta emoji'd mõõdukalt struktuuri jaoks
5. Kui kasutaja küsib midagi, mis pole toiduga seotud, suuna vestlus viisakalt tagasi toidu juurde

PIIRANGUD:
- Ära anna meditsiinilisi diagnoose
- Ära soovita toidulisandeid
- Ära pretendeeri olevat päris toitumisnõustaja
- Viita alati kui vaja: "Konsulteeri arstiga, kui Sul on terviseprobleeme"

VASTUSTE FORMAAT:
- Kasuta **paksus kirjas** oluliste sõnade jaoks
- Kasuta • märke loendite jaoks
- Hoia lõigud lühikesed
- Lisa emoji'd retseptide ja toidukavade juurde`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY not configured');
    return res.status(500).json({ error: 'API ei ole seadistatud' });
  }

  try {
    const { messages } = req.body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Sõnumid on puudu' });
    }

    // Initialize Groq client
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    // Build messages for Groq (OpenAI-compatible format)
    const groqMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history
    for (const msg of messages) {
      groqMessages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // Set SSE headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Generate content with streaming
    const stream = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: groqMessages,
      stream: true,
      max_tokens: 8192,
      temperature: 0.7,
    });

    // Stream the response
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    // Send done signal
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    return res.end();
  } catch (error) {
    console.error('Server error:', error);
    res.write(`data: ${JSON.stringify({ error: 'Serveri viga. Proovi hiljem uuesti.' })}\n\n`);
    return res.end();
  }
}
