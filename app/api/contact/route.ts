import { NextRequest, NextResponse } from 'next/server';
import { transporter, FROM } from '@/lib/mailer';

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ error: 'Please fill in your name, a valid email, and a message.' }, { status: 400 });
        }

        await transporter.sendMail({
            from: FROM,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `[Contact] ${subject || 'New message'} — ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || '—'}</p>
                <p><strong>Message:</strong></p>
                <p>${String(message).replace(/\n/g, '<br>')}</p>
            `,
        });

        return NextResponse.json({ message: 'Message sent successfully!' });
    } catch (err) {
        console.error('[contact] Error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
