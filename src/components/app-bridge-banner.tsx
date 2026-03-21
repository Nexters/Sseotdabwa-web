import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { Flex } from "./ui/flex";

const APP_STORE_URL =
  "https://apps.apple.com/kr/app/살까말까-buyornot/id6758535406";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.sseotdabwa.buyornot";

/* ── Apple 아이콘 ── */
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M15.84 14.28c-.37.84-.55 1.21-1.03 1.95-.66 1.03-1.6 2.3-2.75 2.31-1.04.01-1.3-.67-2.71-.66-1.4.01-1.69.67-2.73.66-1.16-.01-2.04-1.15-2.7-2.17-1.85-2.87-2.04-6.24-.9-8.03.84-1.25 2.17-1.99 3.43-1.99 1.24 0 2.02.69 3.05.69.99 0 1.6-.69 3.03-.69 1.11 0 2.29.6 3.12 1.65-2.74 1.5-2.3 5.42.19 6.28zM12.88 4.81c.51-.66.9-1.59.76-2.54-.83.06-1.81.59-2.39 1.28-.51.63-.95 1.56-.78 2.46.91.03 1.86-.51 2.41-1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Google Play 아이콘 ── */
function GooglePlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.55 1.59C2.35 1.81 2.22 2.15 2.22 2.58v14.84c0 .43.13.76.33.99l.05.05L10.87 10.19v-.13l-.02-.12L2.55 1.59z"
        fill="currentColor"
      />
      <path
        d="M13.6 12.91l-2.73-2.72v-.13l-.02-.12 2.75-2.73 3.1 1.76c.89.5.89 1.33 0 1.83l-3.1 1.76v.35z"
        fill="currentColor"
      />
      <path
        d="M13.6 12.91l-2.75-2.72-8.25 8.28c.29.31.77.35 1.33.04l9.67-5.6z"
        fill="currentColor"
      />
      <path
        d="M13.6 7.21L3.93 1.62c-.55-.31-1.04-.28-1.33.04l8.25 8.28 2.75-2.73z"
        fill="currentColor"
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

      {/* App Store / Google Play 버튼 */}
      <div className="flex w-full max-w-[412px] gap-[12px]">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer noopener nofollow noindex"
          className="flex h-[60px] flex-1 items-center justify-center gap-[4px] rounded-[12px] bg-gray-200 py-[16px] transition-all duration-200 hover:bg-gray-300 active:scale-95"
        >
          <AppleIcon className="text-gray-900" />
          <Typography variant="s3-semibold" className="text-gray-900">
            App Store
          </Typography>
        </a>
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noreferrer noopener nofollow noindex"
          className="flex h-[60px] flex-1 items-center justify-center gap-[4px] rounded-[12px] bg-gray-200 py-[16px] transition-all duration-200 hover:bg-gray-300 active:scale-95"
        >
          <GooglePlayIcon className="text-gray-900" />
          <Typography variant="s3-semibold" className="text-gray-900">
            Google Play
          </Typography>
        </a>
      </div>
    </Flex>
  );
}

export { AppBridgeBanner };
