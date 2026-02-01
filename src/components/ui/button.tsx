import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Typography, type TypographyVariant } from "@/components/ui/typography";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center cursor-pointer",
    "transition-colors duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        filled:
          "bg-gray-900 hover:bg-gray-800 active:bg-gray-1000 disabled:bg-gray-300 disabled:border-transparent",
        neutral:
          "bg-gray-100 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100",
        outline:
          "bg-transparent border border-gray-300 hover:bg-gray-100 active:bg-gray-400 disabled:bg-gray-0",
      },
      size: {
        large: "w-[148px] h-[50px] rounded-[14px]",
        small: "p-[10px] rounded-[10px]",
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
  },
);

const textColorMap = {
  filled: "text-white",
  neutral: "text-gray-700",
  outline: "text-gray-800",
} as const;

const disabledTextColorMap = {
  filled: "text-gray-700",
  neutral: "text-gray-500",
  outline: "text-gray-500",
} as const;

const typographyMap: Record<"large" | "small", TypographyVariant> = {
  large: "t2-bold",
  small: "s5-semibold",
};

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant = "filled",
  size = "large",
  rounded,
  fullWidth,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variantKey = variant ?? "filled";
  const textColor = disabled
    ? disabledTextColorMap[variantKey]
    : textColorMap[variantKey];

  return (
    <button
      data-slot="button"
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size, rounded, fullWidth }),
        className,
      )}
      {...props}
    >
      <Typography
        variant={typographyMap[size ?? "large"]}
        className={textColor}
      >
        {children}
      </Typography>
    </button>
  );
}

export { Button, buttonVariants };
