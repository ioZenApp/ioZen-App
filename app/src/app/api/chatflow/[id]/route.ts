import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { ChatflowStatus } from '@prisma/client';

const updateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    schema: z.any().optional(),
    status: z.nativeEnum(ChatflowStatus).optional(),
});

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const chatflow = await prisma.chatflow.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { submissions: true }
                }
            }
        });

        if (!chatflow) {
            return NextResponse.json(
                { error: 'Chatflow not found' },
                { status: 404 }
            );
        }

        // Format the response to match the expected structure
        const formattedChatflow = {
            id: chatflow.id,
            name: chatflow.name,
            description: chatflow.description,
            schema: chatflow.schema,
            status: chatflow.status,
            shareUrl: chatflow.shareUrl,
            submissions: chatflow._count.submissions,
            createdAt: chatflow.createdAt,
            updatedAt: chatflow.updatedAt,
        };

        return NextResponse.json({ chatflow: formattedChatflow });

    } catch (error) {
        console.error('Failed to fetch chatflow:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await req.json();
        const validatedData = updateSchema.parse(body);

        // Check if chatflow exists
        const existingChatflow = await prisma.chatflow.findUnique({
            where: { id }
        });

        if (!existingChatflow) {
            return NextResponse.json(
                { error: 'Chatflow not found' },
                { status: 404 }
            );
        }

        // Update the chatflow
        const updatedChatflow = await prisma.chatflow.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json({
            success: true,
            chatflow: updatedChatflow
        });

    } catch (error) {
        console.error('Failed to update chatflow:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid request data', details: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
