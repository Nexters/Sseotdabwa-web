import * as React from "react"

import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  rounded?: boolean
}

function Skeleton({ className, width, height, rounded = false, style, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(rounded ? "rounded-full" : "rounded-[12px]", className)}
      style={{
        width,
        height,
        background: "linear-gradient(90deg, #F3F4F5 0%, #FBFBFC 50%, #F3F4F5 100%)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 600ms ease-in-out 200ms infinite",
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
