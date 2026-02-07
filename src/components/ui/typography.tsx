import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      // Display
      "d1-bold": "text-d1-bold",
      "d2-bold": "text-d2-bold",
      // Heading
      "h1-bold": "text-h1-bold",
      "h2-bold": "text-h2-bold",
      "h3-bold": "text-h3-bold",
      "h4-bold": "text-h4-bold",
      "h1-semibold": "text-h1-semibold",
      // Title
      "t1-bold": "text-t1-bold",
      "t2-bold": "text-t2-bold",
      "t3-bold": "text-t3-bold",
      "t4-bold": "text-t4-bold",
      // Sub Title
      "s1-semibold": "text-s1-semibold",
      "s2-semibold": "text-s2-semibold",
      "s3-semibold": "text-s3-semibold",
      "s4-semibold": "text-s4-semibold",
      "s5-semibold": "text-s5-semibold",
      // Body
      "b1-medium": "text-b1-medium",
      "b2-medium": "text-b2-medium",
      "b3-medium": "text-b3-medium",
      "b4-medium": "text-b4-medium",
      "b5-medium": "text-b5-medium",
      "b6-medium": "text-b6-medium",
      "b7-medium": "text-b7-medium",
      // Caption
      "c1-medium": "text-c1-medium",
      "c2-medium": "text-c2-medium",
      "c3-medium": "text-c3-medium",
      "c1-regular": "text-c1-regular",
      "c2-regular": "text-c2-regular",
      "c3-regular": "text-c3-regular",
      // Paragraph
      "p1-medium": "text-p1-medium",
      "p2-medium": "text-p2-medium",
      "p3-medium": "text-p3-medium",
      "p4-medium": "text-p4-medium",
      "p1-regular": "text-p1-regular",
      "p2-regular": "text-p2-regular",
      "p3-regular": "text-p3-regular",
      "p4-regular": "text-p4-regular",
    },
  },
  defaultVariants: {
    variant: "b2-medium",
  },
});

type TypographyVariant = VariantProps<typeof typographyVariants>["variant"];

type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & TypographyVariant extends null | undefined
  ? object
  : { variant?: TypographyVariant };

type TypographyProps<E extends React.ElementType = "span"> =
  PolymorphicProps<E> &
    Omit<React.ComponentPropsWithoutRef<E>, keyof PolymorphicProps<E>> & {
      variant?: TypographyVariant;
    };

function Typography<E extends React.ElementType = "span">({
  as,
  variant,
  className,
  children,
  ...props
}: TypographyProps<E>) {
  const Component: React.ElementType = as || "span";

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Typography, typographyVariants, type TypographyVariant };
