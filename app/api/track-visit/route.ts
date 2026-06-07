import { NextRequest, NextResponse } from 'next/server';
import { parseUserAgent } from '@/lib/ua';
import { logVisit } from '@/lib/visits';

export async function POST(req: NextRequest) {
    try {
        const { path, referrer } = await req.json();

        const forwardedFor = req.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip');
        const userAgent = req.headers.get('user-agent') || '';
        const { os, browser, deviceType, device } = parseUserAgent(userAgent);

        await logVisit({
            ip,
            user_agent: userAgent,
            device_type: deviceType,
            device,
            browser,
            os,
            referrer: typeof referrer === 'string' ? referrer : null,
            path: typeof path === 'string' ? path : null,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[track-visit] Error:', err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
