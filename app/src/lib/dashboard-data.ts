import prisma from '@/lib/db'
import { startOfDay, subDays, format } from 'date-fns'

export async function getSubmissionsChartData(workspaceId: string) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    return {
      date: startOfDay(date),
      name: format(date, 'EEE'),
    }
  })

  const submissions = await prisma.chatflowSubmission.findMany({
    where: {
      chatflow: { workspaceId },
      createdAt: { gte: last7Days[0].date },
    },
    select: {
      createdAt: true,
    },
  })

  // Map submissions to days
  return last7Days.map(day => {
    const count = submissions.filter(s => 
      startOfDay(s.createdAt).getTime() === day.date.getTime()
    ).length
    
    return {
      name: day.name,
      total: count,
    }
  })
}

export async function getTopChatflows(workspaceId: string) {
  const chatflows = await prisma.chatflow.findMany({
    where: { workspaceId },
    include: {
      _count: {
        select: { submissions: true },
      },
    },
    orderBy: {
      submissions: { _count: 'desc' },
    },
    take: 5,
  })

  return chatflows.map(cf => ({
    name: cf.name,
    value: cf._count.submissions,
  }))
}

export type DashboardStats = {
  totalChatflows: number
  totalSubmissions: number
  recentSubmissions: number
  chatflowsGrowth: number
  chartData: Array<{ name: string; total: number }>
}

export async function getDashboardStats(workspaceId: string): Promise<DashboardStats> {
  const totalChatflows = await prisma.chatflow.count({
    where: { workspaceId },
  })

  const totalSubmissions = await prisma.chatflowSubmission.count({
    where: {
      chatflow: { workspaceId },
    },
  })

  const now = new Date()
  const last7Days = subDays(now, 7)
  const last14Days = subDays(now, 14)

  const recentSubmissions = await prisma.chatflowSubmission.count({
    where: {
      chatflow: { workspaceId },
      createdAt: { gte: last7Days },
    },
  })

  const previousPeriodSubmissions = await prisma.chatflowSubmission.count({
    where: {
      chatflow: { workspaceId },
      createdAt: { gte: last14Days, lt: last7Days },
    },
  })

  // Calculate growth percentage
  const chatflowsGrowth = previousPeriodSubmissions > 0
    ? Math.round(((recentSubmissions - previousPeriodSubmissions) / previousPeriodSubmissions) * 100)
    : 0

  const chartData = await getSubmissionsChartData(workspaceId)

  return {
    totalChatflows,
    totalSubmissions,
    recentSubmissions,
    chatflowsGrowth,
    chartData,
  }
}



