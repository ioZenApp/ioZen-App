import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// import { prisma } from '@/lib/db';
import { generateChatflowWorkflow } from '@/workflows/generate-chatflow';

const generateChatflowSchema = z.object({
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

function generateShareUrl(): string {
    // Generate a random 8-character alphanumeric string
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { description } = generateChatflowSchema.parse(body);

        // Trigger the AI workflow to generate chatflow schema
        const schema = await generateChatflowWorkflow(description);

        // TODO: Database not yet initialized - will enable after running migrations
        // const chatflow = await prisma.chatflow.create({
        //     data: {
        //         name: schema.name,
        //         description,
        //         schema: schema as any,
        //         userId: 'temp-user-id',
        //         shareUrl: generateShareUrl(),
        //         status: 'DRAFT',
        //     },
        // });

        // Return the generated schema for now
        return NextResponse.json({
            ...schema,
            shareUrl: generateShareUrl(),
            status: 'DRAFT',
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid request data', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error generating chatflow:', error);
        return NextResponse.json(
            { error: 'Failed to generate chatflow', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
