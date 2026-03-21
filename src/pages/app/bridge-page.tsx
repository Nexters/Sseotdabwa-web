import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Logo } from "@/components/ui/logo";
import { BrandAssetBox } from "@/components/ui/brand-asset";
import { Typography } from "@/components/ui/typography";
import { Flex } from "@/components/ui/flex";

const APP_STORE_URL = "https://apps.apple.com/kr/app/살까말까-buyornot/id6758535406";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.sseotdabwa.buyornot";

function getAppStoreUrl(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (ua.includes("android")) return GOOGLE_PLAY_URL;
  return APP_STORE_URL;
}

/* ── Apple 로고 아이콘 ── */
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M12.67 11.42c-.3.67-.44.97-.82 1.56-.53.82-1.28 1.84-2.2 1.85-.83.01-1.04-.54-2.17-.53-1.12.01-1.35.54-2.18.53-.93-.01-1.63-.92-2.16-1.74C1.73 10.84 1.6 8.18 2.55 6.77c.67-1 1.74-1.59 2.74-1.59.99 0 1.62.55 2.44.55.79 0 1.28-.55 2.42-.55.89 0 1.83.48 2.5 1.32-2.2 1.2-1.84 4.34.02 4.92zM10.3 3.85c.41-.53.72-1.27.61-2.03-.67.05-1.45.47-1.91 1.02-.41.5-.76 1.25-.63 1.97.73.02 1.49-.41 1.93-.96z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Google Play 로고 아이콘 ── */
function GooglePlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M2.04 1.27C1.88 1.45 1.78 1.72 1.78 2.06v11.88c0 .34.1.6.26.79l.04.04L8.7 8.15v-.1l-.02-.1L2.04 1.27z"
        fill="currentColor"
      />
      <path
        d="M10.88 10.33L8.7 8.15v-.1l-.02-.1 2.2-2.18 2.48 1.41c.71.4.71 1.06 0 1.46l-2.48 1.41-.02.28z"
        fill="currentColor"
      />
      <path
        d="M10.88 10.33l-2.2-2.18-6.6 6.62c.23.25.62.28 1.06.03l7.74-4.47z"
        fill="currentColor"
      />
      <path
        d="M10.88 5.77L3.14 1.3c-.44-.25-.83-.22-1.06.03l6.6 6.62 2.2-2.18z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── QR 플레이스홀더 ── */
function QRPlaceholder() {
  return (
    <img
      src="/bridge-assetes.png"
      alt="QR 코드"
      className="h-[230px] w-[230px] rounded-[16px] border border-gray-200 object-contain p-[16px]"
    />
  );
}

/* ── 데스크탑 사이드바 (App Store / Google Play 버튼) ── */
function BridgeSidebar() {
  return (
    <Flex
      direction="col"
      gap={16}
      data-slot="bridge-sidebar"
      className="flex w-full flex-col items-start bg-transparent px-[20px] pb-[40px] pt-[60px]"
    >
      <Flex direction="col" gap={40}>
        <Logo className="text-gray-900" width={150} height={36} />
        <p
          className="text-gray-900"
          style={{ fontSize: 26, fontWeight: 700, lineHeight: "150%" }}
        >
          가치있고 현명한 소비를 위한
          <br />
          집단지성의 비교 방법
        </p>
      </Flex>

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
          className="flex flex-1 items-center justify-center gap-[6px] rounded-[12px] border border-gray-300 bg-gray-0 px-[16px] py-[14px] transition-all duration-200 hover:bg-gray-100 active:scale-95"
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
          className="flex flex-1 items-center justify-center gap-[6px] rounded-[12px] border border-gray-300 bg-gray-0 px-[16px] py-[14px] transition-all duration-200 hover:bg-gray-100 active:scale-95"
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

/* ── 모바일 카드 일러스트 ── */
function CardIllustration() {
  return (
    <div className="flex h-[235px] w-[230px] items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div
          className="absolute"
          style={{ transform: "rotate(-8deg) translateX(-20px)" }}
        >
          <div
            className="flex items-center justify-center rounded-[18px] border-[1.5px] border-gray-200 bg-gray-0"
            style={{ width: 120, height: 140, boxShadow: "0px 4px 30px 0px #D7DCE180" }}
          >
            <div className="h-[20px] w-[60px] rounded-[6px] bg-gray-300" />
          </div>
        </div>
        <div
          className="absolute"
          style={{ transform: "rotate(6deg) translateX(20px)" }}
        >
          <div
            className="flex items-center justify-center rounded-[18px] border-[1.5px] border-gray-200 bg-gray-0"
            style={{ width: 120, height: 140, boxShadow: "0px 4px 30px 0px #D7DCE180" }}
          >
            <div className="h-[20px] w-[60px] rounded-[6px] bg-gray-300" />
          </div>
        </div>
        <div className="relative z-10">
          <div
            className="flex flex-col items-center justify-center gap-[12px] rounded-[18px] border-[1.5px] border-gray-200 bg-gray-0"
            style={{ width: 130, height: 150, boxShadow: "0px 4px 30px 0px #D7DCE180" }}
          >
            <BrandAssetBox asset="socks" iconSize={40} className="!h-[70px] !w-[60px] !rounded-[12px]" />
            <div className="flex w-[80px] flex-col gap-[4px]">
              <div className="h-[8px] w-full rounded-[4px] bg-gray-900" />
              <div className="h-[8px] w-[50px] rounded-[4px] bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 메인 페이지 ── */
function BridgePage() {
  const navigate = useNavigate();

  const handleOpenApp = useCallback(() => {
    const url = getAppStoreUrl(window.navigator.userAgent);
    window.open(url, "_blank");
  }, []);

  const handleContinueWeb = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="app-layout flex w-full justify-center">
      {/* 데스크탑: 사이드바 (App Store / Google Play 버튼) */}
      <div className="app-bridge sticky top-0 hidden h-[100svh] h-[100dvh] max-w-[412px] self-start">
        <BridgeSidebar />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative w-full max-w-[540px]">
        <div className="flex min-h-[100svh] min-h-[100dvh] flex-col items-center justify-center bg-white pb-[env(safe-area-inset-bottom)]">
          <Flex direction="col" align="center" className="w-full max-w-[375px] px-[20px]">
            {/* 모바일: 카드 일러스트 / 데스크탑: QR 코드 */}
            <div className="sm:hidden">
              <CardIllustration />
            </div>
            <div className="hidden sm:block">
              <QRPlaceholder />
            </div>

            {/* 텍스트 - 모바일: 20px / 데스크탑: 26px */}
            <p className="mt-[24px] text-center text-[20px] font-bold leading-[150%] text-gray-900 sm:mt-[50px] sm:text-[26px]">
              투표 등록부터, 알림까지
              <br />
              살까말까 앱에서 경험해보세요!
            </p>

            {/* CTA 버튼 - 모바일에서만 노출 */}
            <button
              type="button"
              onClick={handleOpenApp}
              className="mt-[32px] flex w-full max-w-[211px] cursor-pointer items-center justify-center rounded-[14px] bg-green-200 py-[15px] transition-all duration-200 active:scale-95 sm:hidden"
            >
              <Typography variant="t2-bold" className="text-white">
                편하게 앱으로 보기
              </Typography>
            </button>

            {/* 웹으로 계속하기 - 모바일: s5-semibold / 데스크탑: s1-semibold */}
            <button
              type="button"
              onClick={handleContinueWeb}
              className="mt-[16px] cursor-pointer bg-transparent sm:mt-[30px]"
            >
              <span className="text-gray-800 underline sm:hidden">
                <Typography variant="s5-semibold" as="span">
                  웹으로 계속하기
                </Typography>
              </span>
              <span className="hidden text-gray-800 underline sm:inline">
                <Typography variant="s1-semibold" as="span">
                  웹으로 계속하기
                </Typography>
              </span>
            </button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default BridgePage;
