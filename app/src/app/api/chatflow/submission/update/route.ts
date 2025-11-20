import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updateSubmissionSchema = z.object({
    submissionId: z.string().nullable().optional(),
    chatflowId: z.string(),
    fieldName: z.string(),
    fieldValue: z.any(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { submissionId, chatflowId, fieldName, fieldValue } = updateSubmissionSchema.parse(body);

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
            // Update existing submission
            const existingSubmission = await prisma.chatflowSubmission.findUnique({
                where: { id: submissionId },
            });

            if (!existingSubmission) {
                return NextResponse.json(
                    { error: "Submission not found" },
                    { status: 404 }
                );
            }

            // Merge new field data with existing data
            const currentData = existingSubmission.data as Record<string, any>;
            const updatedData = {
                ...currentData,
                [fieldName]: fieldValue,
            };

            submission = await prisma.chatflowSubmission.update({
                where: { id: submissionId },
                data: {
                    data: updatedData,
                    status: 'IN_PROGRESS',
                },
            });
        } else {
            // Create new submission with first field
            submission = await prisma.chatflowSubmission.create({
                data: {
                    chatflowId,
                    data: { [fieldName]: fieldValue },
                    status: 'IN_PROGRESS',
                },
            });
        }

        return NextResponse.json({
            success: true,
            submissionId: submission.id,
            data: submission.data,
        });

    } catch (error) {
        console.error("Submission update failed:", error);
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
