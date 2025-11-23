import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, MessageSquare, BarChart3, Clock } from 'lucide-react'
import prisma from '@/lib/db'
import { createClient } from '@/lib/supabase/server'
import { Container, PageHeader } from '@/components/layout'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/data-display'

interface PageProps {
    params: Promise<{ workspaceSlug: string }>
}

export default async function ChatflowsPage({ params }: PageProps) {
    const { workspaceSlug } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get workspace
    const workspace = await prisma.workspace.findUnique({
        where: { slug: workspaceSlug },
    })

    if (!workspace) {
        redirect('/w')
    }

    // Get all chatflows for this workspace
    const chatflows = await prisma.chatflow.findMany({
        where: { workspaceId: workspace.id },
        include: {
            _count: {
                select: { submissions: true },
            },
        },
        orderBy: { updatedAt: 'desc' },
    })

    return (
        <Container>
            <PageHeader
                title="Chatflows"
                description="Manage your conversational forms"
                action={
                    <Link href={`/w/${workspaceSlug}/chatflows/new`}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Chatflow
                        </Button>
                    </Link>
                }
            />

            {chatflows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <MessageSquare className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">No chatflows yet</h3>
                    <p className="text-muted-foreground mt-2 text-center text-sm max-w-md">
                        Create your first chatflow to start collecting conversational data from your users.
                    </p>
                    <Link href={`/w/${workspaceSlug}/chatflows/new`} className="mt-6">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Chatflow
                        </Button>
                    </Link>
                </div>
            ) : (
                <ul className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
                    {chatflows.map((chatflow) => (
                        <li key={chatflow.id}>
                            <Link href={`/w/${workspaceSlug}/chatflows/${chatflow.id}`}>
                                <div className="rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-semibold leading-none">{chatflow.name}</h3>
                                            {chatflow.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {chatflow.description}
                                                </p>
                                            )}
                                        </div>
                                        <Badge
                                            variant={
                                                chatflow.status === 'PUBLISHED'
                                                    ? 'published'
                                                    : chatflow.status === 'DRAFT'
                                                        ? 'draft'
                                                        : 'archived'
                                            }
                                        >
                                            {chatflow.status.toLowerCase()}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <BarChart3 className="h-3.5 w-3.5" />
                                            <span>{chatflow._count.submissions}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>
                                                {new Date(chatflow.updatedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    )
}
