import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AppBridgeBanner } from "@/components/app-bridge-banner";
import { Typography } from "@/components/ui/typography";
import { Flex } from "@/components/ui/flex";
import { getAppStoreUrl } from "@/utils/app-url";

/* ── QR 코드 (https://buyornot.com/app) ── */
function QRCode() {
  return (
    <div className="flex p-[18px] items-center justify-center rounded-[18px] bg-gray-200">
      <img
        src="/qr-app.png"
        alt="앱 다운로드 QR 코드"
        className="h-[244px] w-[244px] object-contain"
      />
    </div>
  );
}

/* ── 모바일 카드 일러스트 (230×235) ── */
function CardIllustration() {
  return (
    <img
      src="/bridge-illustration.svg"
      alt="앱 브릿지 일러스트"
      className="h-[235px] w-[230px] object-contain"
    />
  );
}

/* ── 메인 페이지 ── */
function BridgePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOpenApp = useCallback(() => {
    const url = getAppStoreUrl(window.navigator.userAgent);
    window.open(url, "_blank");
  }, []);

  const handleContinueWeb = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const needRedirect = searchParams.get("redirect") === "true";

    if (needRedirect) {
      handleOpenApp();
      navigate("/app", { replace: true });
    }
  }, []);

  return (
    <div className="app-layout flex w-full justify-center">
      {/* 데스크탑: 사이드바 (App Store / Google Play 버튼) */}
      <div className="app-bridge sticky top-0 hidden h-[100svh] h-[100dvh] max-w-[412px] self-start">
        <AppBridgeBanner />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative w-full max-w-[540px]">
        <div className="flex min-h-[100svh] min-h-[100dvh] flex-col items-center justify-center bg-white pb-[env(safe-area-inset-bottom)]">
          <Flex
            direction="col"
            align="center"
            className="w-full max-w-[375px] px-[20px]"
          >
            {/* 모바일: 카드 일러스트 / 데스크탑: QR 코드 */}
            <div className="sm:hidden">
              <CardIllustration />
            </div>
            <div className="hidden sm:block">
              <QRCode />
            </div>

            {/* 텍스트 - 모바일: 20px / 데스크탑: 26px */}
            <p className="mt-[20px] text-center text-[20px] font-bold leading-[150%] text-gray-900 sm:mt-[50px] sm:text-[26px]">
              투표 등록부터, 알림까지
              <br />
              살까말까 앱에서 경험해보세요!
            </p>

            {/* CTA 버튼 - 모바일에서만 노출 (Primary, L, Square) */}
            <button
              type="button"
              onClick={handleOpenApp}
              className="mt-[30px] flex w-full max-w-[211px] cursor-pointer items-center justify-center rounded-[14px] bg-gray-900 py-[15px] transition-all duration-200 active:scale-95 sm:hidden"
            >
              <Typography variant="t2-bold" className="text-white">
                편하게 앱으로 보기
              </Typography>
            </button>

            {/* 웹으로 계속하기 - 모바일: s5-semibold / 데스크탑: s1-semibold */}
            <button
              type="button"
              onClick={handleContinueWeb}
              className="mt-[20px] cursor-pointer bg-transparent sm:mt-[30px]"
            >
              <span className="text-gray-800 underline sm:hidden">
                <Typography variant="s5-semibold">웹으로 계속하기</Typography>
              </span>
              <span className="hidden text-gray-800 underline sm:inline">
                <Typography variant="s1-semibold">웹으로 계속하기</Typography>
              </span>
            </button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default BridgePage;
