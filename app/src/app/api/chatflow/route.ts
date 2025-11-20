import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // In a real app, we would get the user ID from the session
        // For MVP, we'll just fetch all chatflows or filter by a default user if we had one
        // Since we created a default user in publish, we can fetch all for now

        const chatflows = await prisma.chatflow.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                _count: {
                    select: { submissions: true }
                }
            }
        });

        const formattedChatflows = chatflows.map(cf => ({
            id: cf.id,
            name: cf.name || "Untitled Chatflow",
            status: cf.status, // "Active" | "Draft" | "Archived"
            submissions: cf._count.submissions,
            date: new Date(cf.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            rawDate: cf.createdAt // For sorting if needed
        }));

        return NextResponse.json({ chatflows: formattedChatflows });

    } catch (error) {
        console.error("Failed to fetch chatflows:", error);
        return NextResponse.json(
            { error: "Failed to fetch chatflows" },
            { status: 500 }
        );
    }
}
