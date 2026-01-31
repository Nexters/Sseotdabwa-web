import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "transition-colors",
    "disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-700 disabled:border-transparent",
  ],
  {
    variants: {
      variant: {
        filled: "bg-gray-900 text-white",
        outline: "bg-transparent text-gray-800 border border-gray-300",
      },
      size: {
        large: "w-[148px] h-[50px] rounded-[14px] text-t2-bold",
        small: "p-[10px] rounded-[10px] text-s5-semibold",
      },
      rounded: {
        true: "!rounded-full",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "large",
      rounded: false,
      fullWidth: false,
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  rounded,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, rounded, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
