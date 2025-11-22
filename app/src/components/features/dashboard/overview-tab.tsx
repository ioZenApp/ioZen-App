import Link from 'next/link'
import { MessageSquare, BarChart3, TrendingUp, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/data-display'
import { Badge } from '@/ui/data-display'
import { SubmissionsChart } from './submissions-chart'
import type { Chatflow } from '@prisma/client'
import type { DashboardStats } from '@/lib/dashboard-data'

type OverviewTabProps = {
  stats: DashboardStats
  chatflows: Array<Chatflow & { _count: { submissions: number } }>
  workspaceSlug: string
}

export function OverviewTab({ stats, chatflows, workspaceSlug }: OverviewTabProps) {
  return (
    <div className="space-y-4">
      {/* Stat cards grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chatflows</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalChatflows}</div>
            <p className="text-xs text-muted-foreground">
              Active chatflows in workspace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              All-time submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.chatflowsGrowth >= 0 ? '+' : ''}{stats.chatflowsGrowth}% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. per Day</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.recentSubmissions / 7)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 7 days average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart section */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions Overview</CardTitle>
          <CardDescription>Daily submissions over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionsChart data={stats.chartData} />
        </CardContent>
      </Card>

      {/* Recent chatflows list */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Chatflows</CardTitle>
          <CardDescription>Your latest chatflows and their submission counts</CardDescription>
        </CardHeader>
        <CardContent>
          {chatflows.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No chatflows yet. Create your first one!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {chatflows.map((chatflow) => (
                <div key={chatflow.id}>
                  <Link
                    href={`/w/${workspaceSlug}/chatflows/${chatflow.id}`}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">
                        {chatflow.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {chatflow._count.submissions} submissions
                      </p>
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
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

