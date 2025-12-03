import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
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

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Kõik väljad on kohustuslikud' });
    }

    // Basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Vigane e-posti aadress' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Toidukodu <noreply@toidukodu.com>',
      to: ['emmaleena.niitvahi@gmail.com'],
      replyTo: email,
      subject: `[Toidukodu] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5A2B;">Uus sõnum Toidukodust</h2>
          <div style="background-color: #F5F0E8; padding: 20px; border-radius: 8px;">
            <p><strong>Nimi:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-post:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Teema:</strong> ${escapeHtml(subject)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #E0D8D0; margin: 20px 0;" />
          <div style="background-color: #FDFBF7; padding: 20px; border-radius: 8px;">
            <p><strong>Sõnum:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="color: #8C8480; font-size: 12px; margin-top: 20px;">
            Saadetud Toidukodu kontaktvormi kaudu
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Serveri viga. Proovi hiljem uuesti.' });
  }
}
