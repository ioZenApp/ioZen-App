import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // Check environment variables (without exposing values)
        const envCheck = {
            DATABASE_URL: !!process.env.DATABASE_URL,
            DIRECT_URL: !!process.env.DIRECT_URL,
            DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
            DIRECT_URL_length: process.env.DIRECT_URL?.length || 0,
            NODE_ENV: process.env.NODE_ENV,
        };

        // Test database connection
        const connectionTest = await prisma.$queryRaw`SELECT 1 as test`;

        // Try to count chatflows
        const chatflowCount = await prisma.chatflow.count();

        // Try to fetch one chatflow
        const sampleChatflow = await prisma.chatflow.findFirst();

        return NextResponse.json({
            status: 'success',
            environment: envCheck,
            connectionTest,
            chatflowCount,
            sampleChatflow: sampleChatflow ? {
                id: sampleChatflow.id,
                name: sampleChatflow.name,
                status: sampleChatflow.status,
            } : null,
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Database test failed:', error);

        return NextResponse.json({
            status: 'error',
            error: {
                message: error.message,
                code: error.code,
                name: error.name,
                stack: error.stack?.split('\n').slice(0, 5), // First 5 lines of stack
            },
            environment: {
                DATABASE_URL: !!process.env.DATABASE_URL,
                DIRECT_URL: !!process.env.DIRECT_URL,
                NODE_ENV: process.env.NODE_ENV,
            },
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}
