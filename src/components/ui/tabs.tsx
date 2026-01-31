import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "gap-[14px]",
      line: "gap-[14px]",
    },
  },
  defaultVariants: {
    variant: "line",
  },
});

function TabsList({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "text-t2-bold text-gray-700",
    "transition-all duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:text-gray-900",
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default: "",
        line: [
          "pb-2",
          "after:absolute after:bottom-0 after:left-0 after:right-0",
          "after:h-[2px] after:bg-gray-black",
          "after:scale-x-0 after:transition-all after:duration-300",
          "data-[state=active]:text-gray-black",
          "data-[state=active]:after:scale-x-100",
        ],
      },
    },
    defaultVariants: {
      variant: "line",
    },
  },
);

function TabsTrigger({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
