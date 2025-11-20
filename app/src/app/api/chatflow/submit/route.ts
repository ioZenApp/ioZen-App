import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const submissionSchema = z.object({
    submissionId: z.string().optional(),
    chatflowId: z.string(),
    data: z.record(z.any()),
    status: z.enum(['IN_PROGRESS', 'COMPLETED', 'ABANDONED']).default('COMPLETED'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { submissionId, chatflowId, data, status } = submissionSchema.parse(body);

        // Verify chatflow exists
        const chatflow = await prisma.chatflow.findUnique({
            where: { id: chatflowId },
        });

        if (!chatflow) {
            return NextResponse.json(
                { error: "Chatflow not found" },
                { status: 404 }
            );
        }

        let submission;

        if (submissionId) {
            // Update existing submission to mark as complete
            submission = await prisma.chatflowSubmission.update({
                where: { id: submissionId },
                data: {
                    data,
                    status,
                    completedAt: status === 'COMPLETED' ? new Date() : null,
                },
            });
        } else {
            // Create new submission (backward compatibility)
            submission = await prisma.chatflowSubmission.create({
                data: {
                    chatflowId,
                    data,
                    status,
                    completedAt: status === 'COMPLETED' ? new Date() : null,
                },
            });
        }

        return NextResponse.json({
            success: true,
            submissionId: submission.id
        });

    } catch (error) {
        console.error("Submission failed:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid submission data", details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
