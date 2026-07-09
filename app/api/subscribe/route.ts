import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';
import { transporter, confirmationEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
    try {
        const { email, firstName } = await req.json();

        const emailStr = (typeof email === 'string' ? email : '').trim().toLowerCase();
        if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr) || emailStr.includes('..')) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        const { added, already } = await addSubscriber(emailStr);

        if (already) {
            return NextResponse.json({ message: 'Already on the list!', already: true });
        }

        // Fire-and-forget — don't block the response on email delivery
        transporter
            .sendMail(confirmationEmail(emailStr, typeof firstName === 'string' ? firstName.trim() : ''))
            .catch((err) => console.error('[subscribe] Confirmation email failed:', err));

        return NextResponse.json({ message: 'Subscribed successfully!', added: true });
    } catch (err) {
        console.error('[subscribe] Error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
