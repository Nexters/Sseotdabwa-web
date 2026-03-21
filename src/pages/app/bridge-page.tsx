import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { BrandAssetBox } from "@/components/ui/brand-asset";
import { Typography } from "@/components/ui/typography";
import { Flex } from "@/components/ui/flex";

function getAppStoreUrl(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("android")) {
    return "https://play.google.com/store";
  }
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return "https://apps.apple.com";
  }
  return "https://apps.apple.com";
}

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
    <div className="flex min-h-[100svh] min-h-[100dvh] w-full items-center justify-center bg-white">
      <Flex direction="col" align="center" className="w-full max-w-[375px] px-[20px]">
        {/* Illustration - Brand Asset Cards */}
        <div className="flex h-[235px] w-[230px] items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Background card (tilted left) */}
            <div
              className="absolute"
              style={{ transform: "rotate(-8deg) translateX(-20px)" }}
            >
              <div
                className="flex items-center justify-center rounded-[18px] border-[1.5px] border-gray-200 bg-gray-0"
                style={{
                  width: 120,
                  height: 140,
                  boxShadow: "0px 4px 30px 0px #D7DCE180",
                }}
              >
                <div className="h-[20px] w-[60px] rounded-[6px] bg-gray-300" />
              </div>
            </div>

            {/* Background card (tilted right) */}
            <div
              className="absolute"
              style={{ transform: "rotate(6deg) translateX(20px)" }}
            >
              <div
                className="flex items-center justify-center rounded-[18px] border-[1.5px] border-gray-200 bg-gray-0"
                style={{
                  width: 120,
                  height: 140,
                  boxShadow: "0px 4px 30px 0px #D7DCE180",
                }}
              >
                <div className="h-[20px] w-[60px] rounded-[6px] bg-gray-300" />
              </div>
            </div>

            {/* Front card with socks icon */}
            <div className="relative z-10">
              <div
                className="flex flex-col items-center justify-center gap-[12px] rounded-[18px] border-[1.5px] border-gray-200 bg-gray-0"
                style={{
                  width: 130,
                  height: 150,
                  boxShadow: "0px 4px 30px 0px #D7DCE180",
                }}
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

        {/* Text */}
        <p
          className="mt-[24px] text-center text-gray-900"
          style={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: "150%",
          }}
        >
          투표 등록부터, 알림까지
          <br />
          살까말까 앱에서 경험해보세요!
        </p>

        {/* CTA Button - Primary Green */}
        <button
          type="button"
          onClick={handleOpenApp}
          className="mt-[32px] flex w-full max-w-[211px] cursor-pointer items-center justify-center rounded-[14px] bg-green-200 py-[15px] transition-all duration-200 active:scale-95"
        >
          <Typography variant="t2-bold" className="text-white">
            편하게 앱으로 보기
          </Typography>
        </button>

        {/* Web continue link */}
        <button
          type="button"
          onClick={handleContinueWeb}
          className="mt-[16px] cursor-pointer bg-transparent"
        >
          <Typography variant="s5-semibold" className="text-gray-800 underline">
            웹으로 계속하기
          </Typography>
        </button>
      </Flex>
    </div>
  );
}

export default BridgePage;
