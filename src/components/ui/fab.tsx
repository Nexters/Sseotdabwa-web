import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { usePreRegister } from "@/pages/pre-register/components/pre-register-provider";

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function FAB({ className, ...props }: FABProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { open: openPreRegister } = usePreRegister();

  const handleClick = () => {
    setIsOpen(true);
    openPreRegister();
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
