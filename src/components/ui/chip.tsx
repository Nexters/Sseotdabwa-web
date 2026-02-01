import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

const chipVariants = cva(
  [
    "inline-flex items-center justify-center px-[12px] py-[10px] rounded-[12px] cursor-pointer",
    "transition-all duration-200",
    "active:scale-95",
  ],
  {
    variants: {
      checked: {
        true: "bg-gray-900",
        false: "bg-gray-200 hover:bg-gray-400",
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, checked, children, ...props }: ChipProps) {
  return (
    <button
      data-slot="chip"
      className={cn(chipVariants({ checked }), className)}
      {...props}
    >
      <Typography
        variant="s5-semibold"
        className={checked ? "text-white" : "text-gray-700"}
      >
        {children}
      </Typography>
    </button>
  );
}

export { Chip, chipVariants };
