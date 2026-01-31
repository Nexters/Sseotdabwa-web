import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dividerVariants = cva("w-full bg-gray-200", {
  variants: {
    size: {
      small: "h-[2px]",
      large: "h-[10px]",
    },
  },
  defaultVariants: {
    size: "small",
  },
})

interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

function Divider({ className, size, ...props }: DividerProps) {
  return (
    <div
      data-slot="divider"
      className={cn(dividerVariants({ size }), className)}
      {...props}
    />
  )
}

export { Divider, dividerVariants }
