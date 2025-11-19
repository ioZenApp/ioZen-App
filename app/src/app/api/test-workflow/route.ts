import { start } from 'workflow/api';
import { testWorkflow } from '@/workflows/test-workflow';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { message } = await request.json();

    // Start workflow asynchronously
    const run = await start(testWorkflow, [message]);

    return NextResponse.json({
        message: 'Test workflow started',
        workflowId: run.id,
    });
}
