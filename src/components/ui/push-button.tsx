import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pushButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-[8px] cursor-pointer",
    "w-[198px] h-[50px] rounded-[14px]",
    "transition-colors duration-150 ease-in",
    "active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: "bg-gray-200 hover:bg-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PushButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pushButtonVariants> {
  icon?: React.ReactNode;
}

function PushButton({
  className,
  variant,
  icon,
  children,
  ...props
}: PushButtonProps) {
  return (
    <button
      data-slot="push-button"
      className={cn(
        pushButtonVariants({ variant }),
        "rounded-[12px] py-4",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="text-b1-medium text-gray-900">{children}</span>
    </button>
  );
}

export { PushButton, pushButtonVariants };
