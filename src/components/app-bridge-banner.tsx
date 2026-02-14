import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { BrandAssetBox } from "@/components/ui/brand-asset";
import { PushButton } from "@/components/ui/push-button";

function AppStoreLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M14.94 10.56c-.02-2.27 1.85-3.36 1.94-3.42-1.06-1.55-2.7-1.76-3.28-1.78-1.4-.14-2.73.82-3.44.82-.71 0-1.81-.8-2.98-.78-1.53.02-2.95.89-3.74 2.27-1.59 2.76-.41 6.86 1.15 9.1.76 1.1 1.66 2.33 2.85 2.29 1.14-.05 1.57-.74 2.95-.74 1.38 0 1.77.74 2.97.71 1.23-.02 2-1.12 2.76-2.22.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.4-.92-2.43-3.67Z"
        fill="currentColor"
      />
      <path
        d="M12.63 3.72c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.59.68-1.1 1.77-.96 2.81 1.01.08 2.05-.51 2.68-1.29Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GooglePlayLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 3.5v13l7.5-6.5L4 3.5Z" fill="currentColor" />
      <path d="M11.5 10 4 3.5 14.5 9l-3 1Z" fill="currentColor" />
      <path d="M11.5 10l3 1L4 16.5l7.5-6.5Z" fill="currentColor" />
      <path d="M14.5 9l2 1.5-2 1-3-1.5 3-1Z" fill="currentColor" />
    </svg>
  );
}

interface AppBridgeBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

function AppBridgeBanner({ className, ...props }: AppBridgeBannerProps) {
  return (
    <div
      data-slot="app-bridge-banner"
      className={cn(
        "flex w-full flex-col items-start bg-transparent px-[20px] pb-[40px] pt-[60px]",
        className,
      )}
      {...props}
    >
      {/* 로고 (150x36) */}
      <div className="mb-[40px]">
        <Logo className="text-gray-900" width={150} height={36} />
      </div>

      {/* 타이틀 */}
      <p
        className="mb-[16px] text-gray-900"
        style={{
          fontSize: 26,
          fontWeight: 700,
          lineHeight: "150%",
        }}
      >
        가치있고 현명한 소비를 위한
        <br />
        집단지성의 비교 방법
      </p>

      {/* 브랜드 에셋 이미지 */}
      <div className="mb-[16px] flex h-[240px] w-full max-w-[412px] items-center justify-center">
        <BrandAssetBox
          asset="socks"
          iconSize={60}
          className="z-0 -mr-[8px]"
          style={{ width: 108, height: 125, transform: "rotate(16.98deg)" }}
        />
        <BrandAssetBox
          asset="tshirt"
          iconSize={60}
          className="z-10"
          style={{ width: 108, height: 125, transform: "rotate(-18.01deg)" }}
        />
        <BrandAssetBox
          asset="pants"
          iconSize={60}
          className="z-0 -ml-[8px]"
          style={{ width: 108, height: 125, transform: "rotate(12.76deg)" }}
        />
      </div>

      {/* 스토어 버튼 */}
      <div className="flex w-full max-w-[412px] gap-[16px]">
        <PushButton
          icon={<AppStoreLogo className="text-gray-900" />}
          className="flex-1"
        >
          App Store
        </PushButton>
        <PushButton
          icon={<GooglePlayLogo className="text-gray-900" />}
          className="flex-1"
        >
          Google Play
        </PushButton>
      </div>
    </div>
  );
}

export { AppBridgeBanner };
