import * as React from "react"

import { Group, Stack } from "@/components/ui/flex"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface FeedCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function FeedCardSkeleton({ className, ...props }: FeedCardSkeletonProps) {
  return (
    <div
      data-slot="feed-card-skeleton"
      className={cn("w-full bg-white", className)}
      {...props}
    >
      <Stack gap={16}>
        {/* Header */}
        <Group gap={10} align="center">
          <Skeleton width={32} height={32} rounded />
          <Stack gap={6}>
            <Skeleton width={120} height={14} />
            <Skeleton width={60} height={12} />
          </Stack>
        </Group>

        {/* Body */}
        <Stack gap={12} className="overflow-hidden rounded-2xl bg-gray-100 px-4 py-3.5">
          {/* Image */}
          <Skeleton className="w-full rounded-[12px]" style={{ aspectRatio: "5 / 4" }} />

          {/* Vote options */}
          <Stack gap={8}>
            <Skeleton height={47} className="w-full rounded-[8px]" />
            <Skeleton height={47} className="w-full rounded-[8px]" />
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

export { FeedCardSkeleton }
