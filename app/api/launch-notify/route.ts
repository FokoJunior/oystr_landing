/**
 * POST /api/launch-notify
 * Sends the launch email to all subscribers.
 * Protected by LAUNCH_NOTIFY_SECRET env var.
 * 
 * Usage after launch:
 *   curl -X POST https://your-domain.com/api/launch-notify \
 *     -H "Content-Type: application/json" \
 *     -d '{"secret":"oystr_launch_2026_secret"}'
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/subscribers';
import { transporter, launchEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
    try {
        const { secret } = await req.json();

        // Protect endpoint
        if (!secret || secret !== process.env.LAUNCH_NOTIFY_SECRET) {
            return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
        }

        const subscribers = getSubscribers();
        if (subscribers.length === 0) {
            return NextResponse.json({ message: 'No subscribers found.', sent: 0 });
        }

        let sent = 0;
        let failed = 0;
        const errors: string[] = [];

        // Send in batches of 10 to avoid overwhelming the SMTP server
        for (let i = 0; i < subscribers.length; i += 10) {
            const batch = subscribers.slice(i, i + 10);
            await Promise.allSettled(
                batch.map(async (email) => {
                    try {
                        await transporter.sendMail(launchEmail(email));
                        sent++;
                    } catch (err) {
                        failed++;
                        errors.push(email);
                        console.error(`[launch-notify] Failed to send to ${email}:`, err);
                    }
                })
            );
            // Small pause between batches
            if (i + 10 < subscribers.length) {
                await new Promise((r) => setTimeout(r, 2000));
            }
        }

        return NextResponse.json({
            message: `Launch emails sent.`,
            total: subscribers.length,
            sent,
            failed,
            failedEmails: errors,
        });
    } catch (err) {
        console.error('[launch-notify] Error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}

// Also expose GET to check subscriber count (protected)
export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');
    if (!secret || secret !== process.env.LAUNCH_NOTIFY_SECRET) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const subscribers = getSubscribers();
    return NextResponse.json({ count: subscribers.length, subscribers });
}
