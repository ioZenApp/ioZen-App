import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const submissions = await prisma.chatflowSubmission.findMany({
            where: { chatflowId: id },
            orderBy: { createdAt: 'desc' },
            include: {
                messages: true
            }
        });

        return NextResponse.json({ submissions });
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
