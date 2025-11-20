import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PublicChatView } from "@/components/public-chat-view";

interface PageProps {
    params: {
        shareUrl: string;
    };
}

export default async function PublicChatflowPage({ params }: PageProps) {
    const { shareUrl } = await params;
    const chatflow = await prisma.chatflow.findUnique({
        where: { shareUrl },
    });

    if (!chatflow || chatflow.status !== 'PUBLISHED') {
        notFound();
    }

    // Parse schema to get fields
    const schema = chatflow.schema as any;
    const fields = schema.fields || [];

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl h-[80vh] md:h-[600px]">
                <PublicChatView
                    chatflowId={chatflow.id}
                    fields={fields}
                    chatflowName={chatflow.name}
                />
            </div>
        </div>
    );
}
