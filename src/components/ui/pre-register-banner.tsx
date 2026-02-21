import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Typography } from "@/components/ui/typography"

interface PreRegisterBannerProps extends React.HTMLAttributes<HTMLButtonElement> {}

function PreRegisterBanner({ className, ...props }: PreRegisterBannerProps) {
  return (
    <button
      data-slot="pre-register-banner"
      className={cn(
        "flex w-full items-center gap-[6px] rounded-[10px] bg-gray-300 px-[16px] py-[14px]",
        className,
      )}
      {...props}
    >
      <Typography variant="s5-semibold" className="shrink-0 text-gray-900">
        안내
      </Typography>
      <Typography variant="b5-semibold" className="flex-1 text-left text-gray-800">
        사전 예약하고 앱 출시 안내를 받아보세요!
      </Typography>
      <Icon icon="right" size={14} className="shrink-0 text-gray-600" />
    </button>
  )
}

export { PreRegisterBanner }
