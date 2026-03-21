import * as React from "react";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface BridgeBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onAppClick?: () => void;
}

function BridgeBanner({ className, onAppClick, ...props }: BridgeBannerProps) {
  return (
    <div
      data-slot="bridge-banner"
      className={cn(
        "flex w-full items-center gap-[8px] bg-gray-200 px-[20px] py-[14px]",
        className,
      )}
      {...props}
    >
      {/* App Logo */}
      <img
        src="/tobong.png"
        alt="살까말까"
        className="h-[30px] w-[30px] shrink-0 rounded-[8px]"
      />

      {/* Text */}
      <Typography variant="t4-bold" className="flex-1 text-gray-900">
        살까말까 앱에서 더 편리하게!
      </Typography>

      {/* 앱으로 이동 Chip */}
      <button
        type="button"
        onClick={onAppClick}
        className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[20px] bg-gray-900 px-[12px] py-[10px] transition-all duration-200 active:scale-95"
      >
        <Typography variant="s5-semibold" className="text-white">
          앱으로 이동
        </Typography>
      </button>
    </div>
  );
}

export { BridgeBanner };
