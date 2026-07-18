import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Privacy, MoonshotStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET /api/moonshots/top?limit=3
// Reads the same database as the oystr app directly (mirrors its own
// /api/moonshots/top) since the full app isn't publicly reachable yet.
export async function GET(req: NextRequest) {
    try {
        const limit = Math.min(
            parseInt(req.nextUrl.searchParams.get('limit') ?? '3'),
            6
        );

        const moonshots = await prisma.moonshot.findMany({
            where: { privacy: Privacy.PUBLIC, status: MoonshotStatus.ACTIVE, image_url: { not: null } },
            include: {
                user: {
                    select: { id: true, name: true, handle: true, verified: true, image: true, avatar_color: true },
                },
                interactions: {
                    where: { type: 'CREW', user: { verified: true } },
                    select: { id: true },
                },
            },
            orderBy: [{ stars: 'desc' }, { crew: 'desc' }, { comments: 'desc' }],
            take: limit * 5,
        });

        const ranked = moonshots
            .sort(
                (a, b) =>
                    b.stars + b.crew * 2 + b.comments -
                    (a.stars + a.crew * 2 + a.comments)
            )
            .slice(0, limit)
            .map(m => {
                const daysLeft = Math.max(
                    0,
                    Math.ceil(
                        (new Date(m.target_date).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    )
                );
                return {
                    id: m.id,
                    title: m.title,
                    handle: m.user.handle,
                    categories: m.categories,
                    image_url: m.image_url,
                    stars: m.stars,
                    comments: m.comments,
                    crew_total: m.crew,
                    crew_verified: m.interactions.length,
                    days_left: daysLeft,
                    user: m.user,
                };
            });

        return NextResponse.json({ moonshots: ranked });
    } catch (error) {
        console.error('[GET /api/moonshots/top]', error);
        return NextResponse.json({ moonshots: [] }, { status: 200 });
    }
}
