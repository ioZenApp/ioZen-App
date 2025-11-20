import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateChatflowBackground } from '@/workflows/chatflow-generation';
import { prisma } from '@/lib/db';

// Input validation schema
const generateSchema = z.object({
    description: z.string().min(10, "Description must be at least 10 characters long"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { description } = generateSchema.parse(body);

        // Create a placeholder Chatflow record
        // For MVP, we attach it to a default user or the first user found
        // Since auth isn't fully set up in this context, we'll find the first user
        const user = await prisma.user.findFirst();
        if (!user) {
            return NextResponse.json(
                { error: 'No user found to attach chatflow to' },
                { status: 500 }
            );
        }

        const chatflow = await prisma.chatflow.create({
            data: {
                name: "Untitled Chatflow",
                description: description,
                schema: {}, // Empty schema indicates "generating"
                status: "DRAFT",
                shareUrl: Math.random().toString(36).substring(7), // Temporary random slug
                userId: user.id
            }
        });

        // Trigger background generation (fire and forget)
        generateChatflowBackground(chatflow.id, description).catch(err =>
            console.error("Background generation error:", err)
        );

        return NextResponse.json({ workflowId: chatflow.id });

    } catch (error) {
        console.error('Error starting workflow:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
