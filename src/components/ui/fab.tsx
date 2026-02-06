import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface FABProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  onChange?: (isOpen: boolean) => void;
}

function FAB({ onChange, className, onClick, ...props }: FABProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    onChange?.(nextState);
    onClick?.(e);
  };

  return (
    <button
      data-slot="fab"
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "size-[60px] rounded-full",
        "transition-all duration-300 ease-in-out",
        "shadow-[0_4px_30px_rgba(0,0,0,0.2)]",
        isOpen ? "bg-white" : "bg-gray-800",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Icon
        icon="plus"
        size={24}
        className={cn(
          "transition-transform duration-300 ease-in-out",
          isOpen ? "rotate-45 text-gray-800" : "rotate-0 text-white",
        )}
      />
    </button>
  );
}

export { FAB };
