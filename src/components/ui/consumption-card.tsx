import * as React from "react";

import { cn } from "@/lib/utils";
import { BrandAssetBox, type BrandAssetName } from "@/components/ui/brand-asset";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";

interface ConsumptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  assets?: BrandAssetName[];
  buttonText?: string;
  onClose?: () => void;
  onButtonClick?: () => void;
}

function ConsumptionCard({
  assets = ["socks", "tshirt", "pants"],
  buttonText = "고민되는 소비가 있나요?",
  onClose,
  onButtonClick,
  className,
  ...props
}: ConsumptionCardProps) {
  return (
    <div
      data-slot="consumption-card"
      className={cn(
        "relative rounded-[20px] border border-gray-300 bg-gray-0 px-[18px] py-[16px]",
        className
      )}
      {...props}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-[18px] top-[16px] text-gray-500"
        aria-label="닫기"
      >
        <Icon icon="cross" size={20} className="text-gray-500" />
      </button>

      {/* Brand Assets */}
      <div className="flex items-center justify-center gap-[10px] pb-[16px] pt-[8px]">
        {assets.map((asset) => (
          <BrandAssetBox key={asset} asset={asset} />
        ))}
      </div>

      {/* Gradient Button */}
      <button
        type="button"
        onClick={onButtonClick}
        className="w-full rounded-[14px] px-[20px] py-[16px]"
        style={{
          background: "linear-gradient(90deg, #1A1C20 0%, #8A97B2 100%)",
        }}
      >
        <Typography variant="t2-bold" className="text-gray-0">
          {buttonText}
        </Typography>
      </button>
    </div>
  );
}

export { ConsumptionCard };
