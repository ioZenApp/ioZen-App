import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Container, PageHeader } from '@/components/layout'
import { Button } from '@/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/navigation'
import { OverviewTab } from '@/components/features/dashboard/overview-tab'
import { AnalyticsTab } from '@/components/features/dashboard/analytics-tab'
import { getDashboardStats } from '@/lib/dashboard-data'

interface DashboardPageProps {
  params: Promise<{ workspaceSlug: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
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

  // Get chatflows for this workspace
  const chatflows = await prisma.chatflow.findMany({
    where: { workspaceId: workspace.id },
    include: {
      _count: {
        select: { submissions: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Get dashboard stats
  const stats = await getDashboardStats(workspace.id)

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description={`Welcome to ${workspace.name}`}
        action={
          <Link href={`/w/${workspaceSlug}/chatflows/new`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Chatflow
            </Button>
          </Link>
        }
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab stats={stats} chatflows={chatflows} workspaceSlug={workspaceSlug} />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab workspaceId={workspace.id} />
        </TabsContent>
      </Tabs>
    </Container>
  )
}
