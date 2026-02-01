import * as React from "react";

import { cn } from "@/lib/utils";
import {
  BrandAssetBox,
  type BrandAssetName,
} from "@/components/ui/brand-asset";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";

interface ConsumptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  assets?: BrandAssetName[];
  buttonText?: string;
  defaultVisible?: boolean;
  onClose?: () => void;
  onButtonClick?: () => void;
}

function ConsumptionCard({
  assets = ["socks", "tshirt", "pants"],
  buttonText = "고민되는 소비가 있나요?",
  defaultVisible = true,
  onClose,
  onButtonClick,
  className,
  ...props
}: ConsumptionCardProps) {
  const [isVisible, setIsVisible] = React.useState(defaultVisible);
  const [isMounted, setIsMounted] = React.useState(defaultVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
      onClose?.();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      data-slot="consumption-card"
      className={cn(
        "relative rounded-[20px] border border-gray-300 bg-gray-0 px-[18px] py-[16px]",
        "transition-opacity duration-300 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-[18px] top-[16px] text-gray-500"
        aria-label="닫기"
      >
        <Icon icon="cross" size={16} className="text-gray-500" />
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
        className="w-full rounded-[14px] py-[13px]"
        style={{
          background: "linear-gradient(90deg, #1A1C20 0%, #8A97B2 100%)",
        }}
      >
        <Typography variant="s4-semibold" className="text-gray-0">
          {buttonText}
        </Typography>
      </button>
    </div>
  );
}

export { ConsumptionCard };
