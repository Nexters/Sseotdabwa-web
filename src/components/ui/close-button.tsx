import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <button
      type="button"
      data-slot="close-button"
      aria-label="닫기"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-[8px] bg-transparent text-gray-0 transition-all duration-150 ease-in hover:bg-gray-1000 active:scale-95",
        className,
      )}
      {...props}
    >
      <Icon icon="cross" size={20} className="text-gray-0" />
    </button>
  );
}

export { CloseButton };
export type { CloseButtonProps };
