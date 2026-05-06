import { Card, Skeleton } from '@heroui/react'

export function PokemonCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden">
      <Card.Header className="h-40 items-center justify-center p-0">
        <Skeleton className="w-28 h-28 rounded-full" />
      </Card.Header>

      <Card.Content className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-3 w-14 rounded" />
              <Skeleton className="h-2 flex-1 rounded-full" />
              <Skeleton className="h-3 w-8 rounded" />
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  )
}
