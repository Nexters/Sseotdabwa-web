import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Typography, type TypographyVariant } from "@/components/ui/typography";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center cursor-pointer",
    "transition-colors",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-transparent",
  ],
  {
    variants: {
      variant: {
        filled: "bg-gray-900",
        outline: "bg-transparent border border-gray-300",
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
  outline: "text-gray-800",
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
  const textColor = disabled
    ? "text-gray-700"
    : textColorMap[variant ?? "filled"];

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
