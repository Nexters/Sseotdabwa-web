import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Flex } from "./ui/flex";

function SadFaceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="10" fill="#2A3038" />
      <circle cx="7.2" cy="8.1" r="1.1" fill="#F4F5F6" />
      <circle cx="12.8" cy="8.1" r="1.1" fill="#F4F5F6" />
      <path
        d="M6.2 14.4C6.7 12.9 8.1 12 10 12c1.9 0 3.3.9 3.8 2.4"
        stroke="#F4F5F6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface AppBridgeBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

function AppBridgeBanner({ className, ...props }: AppBridgeBannerProps) {
  return (
    <Flex
      direction="col"
      gap={16}
      data-slot="app-bridge-banner"
      className={cn(
        "flex w-full flex-col items-start bg-transparent px-[20px] pb-[40px] pt-[60px]",
        className,
      )}
      {...props}
    >
      <Flex direction="col" gap={40}>
        {/* 로고 (150x36) */}

        <Logo className="text-gray-900" width={150} height={36} />

        {/* 타이틀 */}
        <p
          className="text-gray-900"
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
      </Flex>

      {/* 브랜드 에셋 이미지 */}
      <img
        src="/bridge-assetes.png"
        alt="브랜드 에셋"
        className="h-[240px] w-full max-w-[412px] object-contain"
      />

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScG0GStvzog1HVZjAP9OpHl85azcez2OdAr7YwrI7rvCqInsg/viewform?pli=1"
        target="_blank"
        rel="noreferrer"
        className="flex w-full max-w-[412px] items-center justify-center gap-[8px] rounded-[16px] bg-gray-100 px-5 py-[20px] text-gray-900 transition-colors hover:bg-gray-200"
      >
        <SadFaceIcon />
        <span className="text-t2-bold text-gray-900">불편한 점이 있으신가요?</span>
      </a>
    </Flex>
  );
}

export { AppBridgeBanner };
