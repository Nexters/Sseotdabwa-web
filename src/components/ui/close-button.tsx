import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconClassName?: string;
  size?: 36 | 40;
}

function CloseButton({
  className,
  iconClassName,
  size = 40,
  ...props
}: CloseButtonProps) {
  return (
    <button
      type="button"
      data-slot="close-button"
      aria-label="닫기"
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] bg-transparent text-gray-0 transition-all duration-150 ease-in hover:bg-gray-1000 active:scale-95",
        size === 36 ? "size-9" : "size-10",
        className,
      )}
      {...props}
    >
      <Icon icon="cross" size={20} className={cn("text-gray-0", iconClassName)} />
    </button>
  );
}

export { CloseButton };
export type { CloseButtonProps };
