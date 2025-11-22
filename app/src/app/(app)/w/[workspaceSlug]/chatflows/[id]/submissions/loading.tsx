import { Skeleton } from '@/ui/feedback'
import { LoadingTable } from '@/ui/feedback'

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96 mb-8" />
      </div>
      <LoadingTable rows={10} cols={5} />
    </div>
  )
}

