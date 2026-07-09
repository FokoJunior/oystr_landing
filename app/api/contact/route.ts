import { NextRequest, NextResponse } from 'next/server';
import { transporter, FROM, contactAckHtml } from '@/lib/mailer';

export async function POST(req: NextRequest) {
    let name: string, email: string, message: string;
    try {
        const body = await req.json();
        name    = (body.name    ?? '').trim();
        email   = (body.email   ?? '').trim();
        message = (body.message ?? '').trim();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.includes('..')) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const escaped = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');

    try {
        await transporter.sendMail({
            from: FROM,
            to: process.env.SMTP_USER,
            replyTo: `${name} <${email}>`,
            subject: `[Contact] New message — ${name}`,
            html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Contact Message</title></head>
<body style="margin:0;padding:0;background:#F2F5FC;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F5FC;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr>
          <td style="background:#0B1729;border-radius:16px 16px 0 0;padding:28px 40px;text-align:center;">
            <img src="https://oystr.ca/logo-blanc.png" alt="Oystr" height="32" style="display:block;margin:0 auto 8px;height:32px;max-width:120px;object-fit:contain;"/>
            <div style="font-size:11px;color:#4A5870;font-family:monospace;">New contact message · oystr.ca</div>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:32px 40px;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0;">
            <div style="margin-bottom:20px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8898B3;margin-bottom:4px;">From</div>
              <div style="font-size:15px;color:#0B1632;font-weight:600;">${name}</div>
              <div style="font-size:13px;color:#4A5870;">${email}</div>
            </div>
            <div style="width:36px;height:2px;background:#C9A84C;border-radius:2px;margin-bottom:20px;"></div>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8898B3;margin-bottom:10px;">Message</div>
            <p style="margin:0;font-size:15px;color:#4A5870;line-height:1.7;">${escaped}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0B1729;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#4A5870;font-family:monospace;">Oystr · oystr.ca · St. Catharines, ON</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
        });
    } catch (err) {
        console.error('[contact] SMTP error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    // Accusé de réception — non-bloquant
    transporter.sendMail({
        from: FROM,
        to: email,
        subject: 'We received your message — Oystr',
        html: contactAckHtml({ name, message }),
    }).catch(err => console.error('[contact] Ack error:', err));

    return NextResponse.json({ message: 'Message sent successfully!' });
}
