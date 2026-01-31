import * as React from "react";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  icon?: React.ReactNode;
}

function Snackbar({ message, icon, className, ...props }: SnackbarProps) {
  return (
    <div
      data-slot="snackbar"
      className={cn(
        "inline-flex items-center gap-2 rounded-[10px] bg-gray-900 px-[14px] py-[12px]",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <Typography variant="b5-medium" className="text-gray-50">
        {message}
      </Typography>
    </div>
  );
}

export { Snackbar };
