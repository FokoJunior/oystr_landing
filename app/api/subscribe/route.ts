import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';
import { transporter, confirmationEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // Validate
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        // Save subscriber
        const { added, already } = addSubscriber(email);

        if (already) {
            return NextResponse.json({ message: 'Already on the list!', already: true });
        }

        // Send confirmation email
        await transporter.sendMail(confirmationEmail(email.trim().toLowerCase()));

        return NextResponse.json({ message: 'Subscribed successfully!', added: true });
    } catch (err) {
        console.error('[subscribe] Error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
