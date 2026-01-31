import * as React from "react";

import { cn } from "@/lib/utils";

type AlignValue = "start" | "center" | "end" | "stretch" | "baseline";
type JustifyValue =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

const alignMap: Record<AlignValue, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<JustifyValue, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  align?: AlignValue;
  justify?: JustifyValue;
  direction?: "row" | "col";
}

function Flex({
  gap,
  align,
  justify,
  direction = "row",
  className,
  style,
  ...props
}: FlexProps) {
  return (
    <div
      data-slot="flex"
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      style={{
        ...style,
        ...(gap !== undefined && { gap: `${gap}px` }),
      }}
      {...props}
    />
  );
}

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  align?: AlignValue;
  justify?: JustifyValue;
}

function Group({ gap, align, justify, className, style, ...props }: GroupProps) {
  return (
    <div
      data-slot="group"
      className={cn(
        "flex flex-row",
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      style={{
        ...style,
        ...(gap !== undefined && { gap: `${gap}px` }),
      }}
      {...props}
    />
  );
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  align?: AlignValue;
  justify?: JustifyValue;
}

function Stack({ gap, align, justify, className, style, ...props }: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn(
        "flex flex-col",
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      style={{
        ...style,
        ...(gap !== undefined && { gap: `${gap}px` }),
      }}
      {...props}
    />
  );
}

export { Flex, Group, Stack };
export type { FlexProps, GroupProps, StackProps, AlignValue, JustifyValue };
