import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    authMethod: 'LOGIN',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
});

export const FROM = process.env.SMTP_FROM || '"Oystr" <info@oystr.ca>';

// ── Email Templates ──────────────────────────────────────────────────────────

export function confirmationEmail(email: string, firstName = '') {
    const name = firstName || 'there';
    return {
        from: FROM,
        to: email,
        subject: "You're on the Oystr waitlist!",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>You're on the Oystr waitlist!</title>
</head>
<body style="margin:0;padding:0;background:#F2F5FC;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F5FC;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr>
          <td style="background:#0B1729;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <img src="https://oystr.ca/logo-blanc.png" alt="Oystr" height="36" style="display:block;margin:0 auto 10px;height:36px;max-width:140px;object-fit:contain;"/>
            <div style="font-size:12px;color:#4A5870;font-family:monospace;">oystr.ca</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8898B3;margin-bottom:12px;">Waitlist Confirmed</div>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:800;color:#0B1632;letter-spacing:-0.02em;line-height:1.2;">
              Hey ${name} —<br/>you're on the list!
            </h1>
            <div style="width:36px;height:3px;background:#C9A84C;border-radius:2px;margin-bottom:24px;"></div>
            <p style="margin:0 0 20px;font-size:15px;color:#4A5870;line-height:1.7;">
              What's on your bucket list? You're about to find out.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#4A5870;line-height:1.7;">
              You'll be among the <strong style="color:#0B1632;">first to discover Oystr</strong> when we launch on
              <strong style="color:#0B1632;">July 15, 2026</strong>. We'll send you an exclusive early access invite straight to your inbox.
            </p>

            <!-- Launch date box -->
            <div style="background:#F8FAFF;border:1px solid #E2E8F0;border-radius:12px;padding:18px 22px;margin-bottom:28px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8898B3;margin-bottom:6px;">Your Moonshot starts on</div>
              <div style="font-size:20px;font-weight:800;color:#C9A84C;letter-spacing:-0.01em;">July 15, 2026 🌕</div>
            </div>

            <p style="margin:0;font-size:13px;color:#8898B3;line-height:1.6;">
              Big dreams require bold communities.<br/>
              — The Oystr Team
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0B1729;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;color:#4A5870;font-family:monospace;">
              Oystr · oystr.ca · St. Catharines, ON
            </p>
            <p style="margin:0;font-size:11px;color:#2A3A57;">
              © 2026 Closure Solutions Ltd. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    };
}

export function launchEmail(email: string) {
    return {
        from: FROM,
        to: email,
        subject: '🌕 Oystr is Live — Your Moonshot starts now!',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Oystr is Live!</title>
</head>
<body style="margin:0;padding:0;background:#F2F5FC;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F5FC;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr>
          <td style="background:#0B1729;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <img src="https://oystr.ca/logo-blanc.png" alt="Oystr" height="36" style="display:block;margin:0 auto 10px;height:36px;max-width:140px;object-fit:contain;"/>
            <div style="display:inline-block;background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);border-radius:999px;padding:5px 16px;margin-top:8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#C9A84C;font-weight:700;">🚀 We Are Live</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8898B3;margin-bottom:12px;">Early Access</div>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:800;color:#0B1632;letter-spacing:-0.02em;line-height:1.2;">
              The wait is over.<br/>Your Moonshot starts now.
            </h1>
            <div style="width:36px;height:3px;background:#C9A84C;border-radius:2px;margin-bottom:24px;"></div>
            <p style="margin:0 0 20px;font-size:15px;color:#4A5870;line-height:1.7;">
              As one of our first crew members, you get <strong style="color:#0B1632;">early access</strong> to Oystr today.
              Declare your dream, build your crew, and make it real.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#4A5870;line-height:1.7;">
              Everything you signed up for is ready and waiting for you.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#0B1632;border-radius:12px;">
                  <a href="https://oystr.ca"
                    style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:-0.01em;">
                    Launch my Moonshot
                    <span style="color:#C9A84C;margin-left:6px;">→</span>
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:13px;color:#8898B3;line-height:1.6;">
              You're receiving this because you joined the Oystr waitlist.<br/>
              Dreams are the content. The community makes them happen.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0B1729;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;color:#4A5870;font-family:monospace;">
              Oystr · oystr.ca · St. Catharines, ON
            </p>
            <p style="margin:0;font-size:11px;color:#2A3A57;">
              © 2026 Closure Solutions Ltd. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    };
}
