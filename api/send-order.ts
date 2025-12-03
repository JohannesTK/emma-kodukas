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

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total: number;
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
    const { name, email, phone, address, notes, items, total } = req.body as OrderData;

    // Validate required fields
    if (!name || !email || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ error: 'Kõik kohustuslikud väljad peavad olema täidetud' });
    }

    // Basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Vigane e-posti aadress' });
    }

    // Generate order number
    const orderNumber = `TK-${Date.now().toString(36).toUpperCase()}`;

    // Build items table HTML
    const itemsHtml = items
      .map(
        (item) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E0D8D0;">${escapeHtml(item.name)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #E0D8D0; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #E0D8D0; text-align: right;">${(item.price * item.quantity).toFixed(2)}€</td>
          </tr>
        `
      )
      .join('');

    // Send email to shop owner
    const { error: ownerError } = await resend.emails.send({
      from: 'Toidukodu <noreply@toidukodu.com>',
      to: ['emmaleena.niitvahi@gmail.com'],
      replyTo: email,
      subject: `[Toidukodu] Uus tellimus ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5A2B;">Uus tellimus! 🎉</h2>
          <p style="color: #5C5450;">Tellimuse number: <strong>${orderNumber}</strong></p>

          <div style="background-color: #F5F0E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2C2420;">Kliendi andmed</h3>
            <p><strong>Nimi:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-post:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Telefon:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
            <p><strong>Aadress:</strong> ${escapeHtml(address)}</p>
            ${notes ? `<p><strong>Märkused:</strong> ${escapeHtml(notes)}</p>` : ''}
          </div>

          <h3 style="color: #2C2420;">Tellitud tooted</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #F5F0E8;">
                <th style="padding: 10px; text-align: left;">Toode</th>
                <th style="padding: 10px; text-align: center;">Kogus</th>
                <th style="padding: 10px; text-align: right;">Hind</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 15px 10px; font-weight: bold; font-size: 18px;">Kokku:</td>
                <td style="padding: 15px 10px; font-weight: bold; font-size: 18px; text-align: right; color: #8B5A2B;">${total.toFixed(2)}€</td>
              </tr>
            </tfoot>
          </table>

          <p style="color: #8C8480; font-size: 12px; margin-top: 30px;">
            Tellimus saadeti Toidukodu veebipoe kaudu
          </p>
        </div>
      `,
    });

    if (ownerError) {
      console.error('Resend error (owner):', ownerError);
      return res.status(400).json({ error: ownerError.message });
    }

    // Send confirmation email to customer
    const { error: customerError } = await resend.emails.send({
      from: 'Toidukodu <noreply@toidukodu.com>',
      to: [email],
      subject: `Tellimuse kinnitus - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5A2B;">Täname tellimuse eest! 🙏</h2>
          <p>Tere ${escapeHtml(name)},</p>
          <p>Oleme Sinu tellimuse kätte saanud ja võtame peagi ühendust, et kokku leppida kohaletoimetamine.</p>

          <p style="color: #5C5450;">Tellimuse number: <strong>${orderNumber}</strong></p>

          <h3 style="color: #2C2420;">Sinu tellimus</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #F5F0E8;">
                <th style="padding: 10px; text-align: left;">Toode</th>
                <th style="padding: 10px; text-align: center;">Kogus</th>
                <th style="padding: 10px; text-align: right;">Hind</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 15px 10px; font-weight: bold; font-size: 18px;">Kokku:</td>
                <td style="padding: 15px 10px; font-weight: bold; font-size: 18px; text-align: right; color: #8B5A2B;">${total.toFixed(2)}€</td>
              </tr>
            </tfoot>
          </table>

          <div style="background-color: #F5F0E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2C2420;">Tarneaadress</h3>
            <p>${escapeHtml(address)}</p>
          </div>

          <p>Kui Sul on küsimusi, võta julgelt ühendust:</p>
          <p>📧 <a href="mailto:emmaleena.niitvahi@gmail.com">emmaleena.niitvahi@gmail.com</a></p>

          <p style="margin-top: 30px;">Sooja tervitusega,<br><strong>Emma-Leena</strong><br>Toidukodu</p>
        </div>
      `,
    });

    if (customerError) {
      console.error('Resend error (customer):', customerError);
      // Don't fail the order if customer email fails, just log it
    }

    return res.status(200).json({ success: true, orderNumber });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Serveri viga. Proovi hiljem uuesti.' });
  }
}
