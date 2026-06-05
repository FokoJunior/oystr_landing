import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // port 465 = SSL
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const FROM = process.env.SMTP_FROM || '"Oystr" <oystr@bmptravel.com>';

// ── Email Templates ──────────────────────────────────────────────────────────

export function confirmationEmail(email: string) {
    return {
        from: FROM,
        to: email,
        subject: '🚀 You\'re on the Oystr crew list!',
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#04070E;font-family:'Inter',Arial,sans-serif;color:#F0F6FF;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 48px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:rgba(16,24,40,0.9);border:1px solid rgba(56,189,248,0.15);border-radius:20px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(56,189,248,0.12),rgba(251,191,36,0.06));padding:48px 40px;text-align:center;">
              <img src="https://oystr-landing.vercel.app/logo-theme-sombre.png" alt="OYSTR" style="height:60px;width:auto;margin-bottom:12px;" onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
              <div style="display:none;font-size:3rem;font-weight:900;letter-spacing:-0.04em;margin-bottom:8px;">
                OYS<span style="color:#38BDF8;">TR</span><span style="color:#FBBF24;">.</span>
              </div>
              <div style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Bucket List Help — Coming Soon</div>
            </td>

          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="font-size:1.5rem;font-weight:800;color:#38BDF8;margin:0 0 16px;">You're officially on the crew! 🎉</h2>
              <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin:0 0 24px;">
                Dreams are the content. The community makes them happen.<br><br>
                <strong style="color:#fff;">You'll be the first to know</strong> when OYSTR launches on <strong style="color:#FBBF24;">July 15, 2026</strong>. We'll send you an exclusive early access invite so you can start launching your Moonshots from day one.
              </p>
              <div style="background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.15);border-radius:12px;padding:20px 24px;margin-bottom:32px;">
                <p style="margin:0;font-size:0.8rem;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:8px;">Your Moonshot starts on</p>
                <p style="margin:0;font-size:1.5rem;font-weight:700;color:#FBBF24;">July 15, 2026 🌕</p>
              </div>
              <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;line-height:1.6;margin:0;">
                Stay tuned. Big dreams require bold communities.<br>
                — The OYSTR Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.06);padding:24px 40px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:0.75rem;">
                OYSTR · oystr · St. Catharines, ON<br>
                © 2026 Closure Solutions Ltd.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    };
}

export function launchEmail(email: string) {
    return {
        from: FROM,
        to: email,
        subject: '🌕 OYSTR is LIVE — Your Moonshots await!',
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#04070E;font-family:'Inter',Arial,sans-serif;color:#F0F6FF;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 48px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:rgba(16,24,40,0.9);border:1px solid rgba(251,191,36,0.2);border-radius:20px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(56,189,248,0.08));padding:48px 40px;text-align:center;">
              <div style="font-size:3rem;font-weight:900;letter-spacing:-0.04em;margin-bottom:8px;">
                OYS<span style="color:#38BDF8;">TR</span><span style="color:#FBBF24;">.</span>
              </div>
              <div style="display:inline-block;background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.3);border-radius:9999px;padding:6px 18px;margin-top:12px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:#FBBF24;font-weight:700;">🚀 We Are Live!</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="font-size:1.5rem;font-weight:800;color:#FBBF24;margin:0 0 16px;">The wait is over. Let's launch your Moonshot. 🌕</h2>
              <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin:0 0 24px;">
                As one of our early crew members, you get <strong style="color:#fff;">early access</strong> to the OYSTR platform today. 
                Start discovering Moonshots, join crews, and share your own epic life goals with the community.
              </p>
              <div style="text-align:center;margin:32px 0;">
                <a href="https://oystr.ca" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#38BDF8,#0284C7);color:#fff;font-weight:700;font-size:1rem;border-radius:12px;text-decoration:none;box-shadow:0 4px 20px rgba(56,189,248,0.3);">Launch My Moonshot →</a>
              </div>
              <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;line-height:1.6;margin:0;">
                You're receiving this because you signed up for early access.<br>
                Dreams are the content. The community makes them happen.<br>
                — The OYSTR Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.06);padding:24px 40px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:0.75rem;">
                OYSTR · oystr.ca · St. Catharines, ON<br>
                © 2026 Closure Solutions Ltd.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    };
}
