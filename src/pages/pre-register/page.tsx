import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";

const SCROLL_DISTANCE = 500;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(t: number) {
  return Math.min(Math.max(t, 0), 1);
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return lerp(outMin, outMax, clamp01((value - inMin) / (inMax - inMin)));
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function SpeechBubble({
  children,
  className,
  style,
  arrowLeft = "16px",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  arrowLeft?: string;
}) {
  return (
    <div
      className={`rounded-[16px] px-3 py-[7px] ${className ?? ""}`}
      style={{
        background: "radial-gradient(circle at 30% 30%, #2A3038 0%, #77879E 100%)",
        ...style,
      }}
    >
      <Typography variant="s5-semibold" className="text-gray-0 whitespace-nowrap">
        {children}
      </Typography>
      <div
        className="absolute -bottom-[7px]"
        style={{
          left: arrowLeft,
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "8px solid #2A3038",
        }}
      />
    </div>
  );
}

function PreRegisterPage() {
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(375);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setContainerWidth(el.offsetWidth);

    const onScroll = () => {
      setProgress(clamp01(el.scrollTop / SCROLL_DISTANCE));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const ep = easeInOut(progress);

  // 캐릭터: 왼쪽 아래 크게 → 중앙 작게
  const charBottom = lerp(-100, 20, ep);
  const charLeft = lerp(-100, containerWidth / 2, ep);
  const charTranslateX = lerp(0, -50, ep);
  const charHeightPct = lerp(100, 60, ep);

  // 타이틀 & 힌트: 스크롤 초반 페이드 아웃
  const titleOpacity = mapRange(progress, 0, 0.35, 1, 0);
  const hintOpacity = mapRange(progress, 0, 0.25, 1, 0);

  // 말풍선 1 ("궁금하면 스크롤해줘!"): 초반 유지 → 중간 페이드 아웃
  const bubble1Opacity = mapRange(progress, 0.35, 0.55, 1, 0);

  // 말풍선 2 ("살지 말지 고민되는 상품이 있어..."): 후반 페이드 인
  const bubble2Opacity = mapRange(progress, 0.7, 0.9, 0, 1);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        ref={scrollRef}
        className="relative mx-auto h-screen w-full max-w-[540px] overflow-y-scroll bg-gray-0"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        {/* sticky 시각 레이어 */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 살까말까 로고 */}
          <div
            className="absolute top-7 left-5"
            style={{ opacity: titleOpacity }}
          >
            <Logo />
          </div>

          {/* 토봉 캐릭터 */}
          <img
            src="/tobong.png"
            alt="토봉 캐릭터 랜딩"
            className="absolute max-w-none"
            style={{
              bottom: `${charBottom}px`,
              left: `${charLeft}px`,
              height: `${charHeightPct}%`,
              width: "auto",
              transform: `translateX(${charTranslateX}%)`,
            }}
          />

          {/* 말풍선 1: 궁금하면 스크롤해줘! */}
          <SpeechBubble
            className="absolute top-[110px] right-5"
            style={{ opacity: bubble1Opacity }}
          >
            궁금하면 스크롤해줘!
          </SpeechBubble>

          {/* 말풍선 2: 살지 말지 고민되는 상품이 있어... */}
          <SpeechBubble
            className="absolute top-[150px] right-5"
            style={{ opacity: bubble2Opacity }}
          >
            살지 말지 고민되는 상품이 있어...
          </SpeechBubble>

          {/* 하단 스크롤 힌트 */}
          <Typography
            variant="t1-bold"
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-0 animate-bounce [animation-duration:1.8s]"
            style={{ opacity: hintOpacity }}
          >
            궁금하면 스크롤!!
          </Typography>
        </div>

        {/* 스크롤 공간 */}
        <div aria-hidden style={{ height: `${SCROLL_DISTANCE}px` }} />
      </div>
    </div>
  );
}

export default PreRegisterPage;
