import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Settings2 } from "lucide-react";
import prisma from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout";
import { Button } from "@/ui/button";
import { SubmissionsTable } from "@/components/features/chatflow/submissions-table";

interface PageProps {
    params: Promise<{
        workspaceSlug: string;
        id: string;
    }>;
}

export default async function SubmissionsPage({ params }: PageProps) {
    const { workspaceSlug, id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch workspace and verify membership
    const workspace = await prisma.workspace.findUnique({
        where: { slug: workspaceSlug },
        include: {
            members: {
                where: { profileId: user.id }
            }
        }
    });

    if (!workspace || workspace.members.length === 0) {
        notFound();
    }

    // Fetch chatflow
    const chatflow = await prisma.chatflow.findUnique({
        where: {
            id,
            workspaceId: workspace.id
        }
    });

    if (!chatflow) {
        notFound();
    }

    // Fetch submissions
    const submissions = await prisma.chatflowSubmission.findMany({
        where: { chatflowId: id },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-8">
            <PageHeader
                title="Submissions"
                description={`View submissions for ${chatflow.name}`}
                backUrl={`/w/${workspaceSlug}/chatflows/${id}`}
                action={
                    <Link href={`/w/${workspaceSlug}/chatflows/${id}`}>
                        <Button variant="outline">
                            <Settings2 className="w-4 h-4 mr-2" />
                            Configure Chatflow
                        </Button>
                    </Link>
                }
            />

            <SubmissionsTable 
                data={submissions}
                workspaceSlug={workspaceSlug}
                chatflowId={id}
            />
        </div>
    );
}
