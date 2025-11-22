import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/data-display'
import { AnalyticsChart } from './analytics-chart'
import { SimpleBarList } from './simple-bar-list'
import { getTopChatflows } from '@/lib/dashboard-data'
import { TrendingUp, Users, MousePointerClick, Clock } from 'lucide-react'

type AnalyticsTabProps = {
  workspaceId: string
}

export async function AnalyticsTab({ workspaceId }: AnalyticsTabProps) {
  const topChatflows = await getTopChatflows(workspaceId)

  // Mock data for the area chart (you can replace with real data later)
  const weeklyData = [
    { name: 'Mon', submissions: 42 },
    { name: 'Tue', submissions: 38 },
    { name: 'Wed', submissions: 51 },
    { name: 'Thu', submissions: 45 },
    { name: 'Fri', submissions: 48 },
    { name: 'Sat', submissions: 32 },
    { name: 'Sun', submissions: 28 },
  ]

  return (
    <div className="space-y-4">
      {/* Traffic overview chart */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Trends</CardTitle>
          <CardDescription>Weekly submission patterns</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <AnalyticsChart data={weeklyData} />
        </CardContent>
      </Card>

      {/* Additional metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,431</div>
            <p className="text-xs text-muted-foreground">+12.4% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
            <p className="text-xs text-muted-foreground">-2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground">+24s from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed analytics */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Top Chatflows</CardTitle>
            <CardDescription>Most active chatflows this week</CardDescription>
          </CardHeader>
          <CardContent>
            {topChatflows.length > 0 ? (
              <SimpleBarList
                items={topChatflows}
                valueFormatter={(n) => `${n}`}
                barClass="bg-primary"
              />
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No chatflows yet
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Status Breakdown</CardTitle>
            <CardDescription>Submissions by status</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Completed', value: 74 },
                { name: 'In Progress', value: 18 },
                { name: 'Abandoned', value: 8 },
              ]}
              valueFormatter={(n) => `${n}%`}
              barClass="bg-muted-foreground"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

