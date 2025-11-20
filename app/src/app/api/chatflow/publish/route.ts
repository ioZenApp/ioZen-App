import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const publishSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    schema: z.object({
        fields: z.array(z.any())
    })
});

function generateSlug(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, schema } = publishSchema.parse(body);

        // For MVP, we'll use a default user or create one if not exists
        // In a real app, this would come from the session
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'demo@iozen.ai',
                    name: 'Demo User'
                }
            });
        }

        // Generate unique shareUrl
        let shareUrl = generateSlug();
        let isUnique = false;
        while (!isUnique) {
            const existing = await prisma.chatflow.findUnique({
                where: { shareUrl }
            });
            if (!existing) {
                isUnique = true;
            } else {
                shareUrl = generateSlug();
            }
        }

        const chatflow = await prisma.chatflow.create({
            data: {
                name,
                description: description || '',
                schema: schema as any, // Prisma Json type
                status: 'PUBLISHED',
                shareUrl,
                userId: user.id
            }
        });

        return NextResponse.json(chatflow);

    } catch (error) {
        console.error('Error publishing chatflow:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
