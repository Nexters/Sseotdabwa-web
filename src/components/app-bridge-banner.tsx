import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { Flex } from "./ui/flex";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/app-url";

/* ── Apple 아이콘 ── */
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM8.82258 15.3427C8.42804 14.8663 7.9373 14.6957 7.34401 14.834L7.19355 14.875L6.60484 15.8911C6.37903 16.2863 6.5121 16.7903 6.90726 17.0161C7.26949 17.2231 7.7232 17.1286 7.97023 16.807L8.03226 16.7137L8.82258 15.3427ZM13.2097 8.66129C12.7218 9.06452 12.2298 10.2581 12.9194 11.4476L15.9597 16.7137C16.1895 17.1089 16.6895 17.2419 17.0847 17.0161C17.4469 16.8054 17.5889 16.3677 17.4361 15.9919L17.3871 15.8911L16.5847 14.5H17.7742C18.2298 14.5 18.5968 14.1331 18.5968 13.6774C18.5968 13.2568 18.2841 12.9118 17.8776 12.8612L17.7742 12.8548H15.6331L13.44 9.05741L13.2097 8.66129ZM13.4879 5.61694C13.1257 5.40995 12.672 5.50451 12.4249 5.82608L12.3629 5.91935L11.996 6.55242L11.6371 5.91935C11.4073 5.52419 10.9073 5.39113 10.5121 5.61694C10.1499 5.82762 10.0079 6.26532 10.1606 6.64118L10.2097 6.74194L11.0484 8.19758L8.3629 12.8508H6.26613C5.81048 12.8508 5.44355 13.2177 5.44355 13.6734C5.44355 14.094 5.7562 14.439 6.16268 14.4896L6.26613 14.496H13.746C14.0869 13.8562 13.6854 12.9472 12.9357 12.8579L12.8145 12.8508H10.2621L13.7903 6.74194C14.0161 6.34677 13.8831 5.84274 13.4879 5.61694Z"
        fill="#2A3038"
      />
    </svg>
  );
}

/* ── Google Play 아이콘 ── */
function GooglePlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.61069 1.81396L13.794 12L3.61179 22.1864C3.41873 22.1048 3.24963 21.962 3.13652 21.7667C3.04837 21.6144 3.00195 21.4416 3.00195 21.2656V2.73453C3.00195 2.32109 3.25285 1.96625 3.61069 1.81396ZM14.501 12.707L16.803 15.009L5.86595 21.342L14.501 12.707ZM17.7 9.50896L20.5071 11.1347C20.9851 11.4114 21.1483 12.0232 20.8715 12.5011C20.784 12.6523 20.6584 12.778 20.5071 12.8655L17.699 14.491L15.208 12L17.7 9.50896ZM5.86595 2.65796L16.804 8.98996L14.501 11.293L5.86595 2.65796Z"
        fill="#2A3038"
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
