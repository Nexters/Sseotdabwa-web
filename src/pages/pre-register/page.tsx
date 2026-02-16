import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";

const SCROLL_DISTANCE = 1200;

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
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative rounded-[16px] px-3 py-[7px] ${className ?? ""}`}
      style={{
        background: "radial-gradient(circle at 30% 30%, #2A3038 0%, #77879E 100%)",
        ...style,
      }}
    >
      <Typography variant="s5-semibold" className="text-gray-0">
        {children}
      </Typography>
      <div
        className="absolute -bottom-[7px] left-4"
        style={{
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
  const [containerHeight, setContainerHeight] = useState(667);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerWidth(el.offsetWidth);
      setContainerHeight(el.offsetHeight);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);

    const onScroll = () => {
      setProgress(clamp01(el.scrollTop / SCROLL_DISTANCE));
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const ep = easeInOut(progress);

  // 캐릭터 시작/끝 위치 — 모두 컨테이너 비율 기반
  const charStartBottom = -containerHeight * 0.14; // 머리가 상단 14% 지점에 위치
  const charStartLeft = -containerWidth * 0.2;     // 왼쪽 20% 잘림

  const charEndHeightPct = 28;
  const charEndBottom = containerHeight * (1 - charEndHeightPct / 100) / 2; // 수직 중앙
  const charEndLeft = containerWidth / 2;          // 수평 중앙

  const charBottom = lerp(charStartBottom, charEndBottom, ep);
  const charLeft = lerp(charStartLeft, charEndLeft, ep);
  const charTranslateX = lerp(0, -50, ep);
  const charHeightPct = lerp(100, charEndHeightPct, ep);

  // UI 요소 위치 — 컨테이너 높이 비율
  const logoTop = containerHeight * 0.04;
  const bubble1Top = containerHeight * 0.16;
  const bubble2Top = containerHeight * 0.30; // 캐릭터 상단(36%) 위
  const hintBottom = containerHeight * 0.06;

  // 투명도
  const titleOpacity = mapRange(progress, 0, 0.35, 1, 0);
  const hintOpacity = mapRange(progress, 0, 0.25, 1, 0);
  const bubble1Opacity = mapRange(progress, 0.35, 0.55, 1, 0);
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
            className="absolute left-5"
            style={{ top: logoTop, opacity: titleOpacity }}
          >
            <Logo />
          </div>

          {/* 토봉 캐릭터 */}
          <img
            src="/tobong.png"
            alt="토봉 캐릭터 랜딩"
            className="absolute max-w-none"
            style={{
              bottom: charBottom,
              left: charLeft,
              height: `${charHeightPct}%`,
              width: "auto",
              transform: `translateX(${charTranslateX}%)`,
            }}
          />

          {/* 말풍선 1: 궁금하면 스크롤해줘! */}
          <SpeechBubble
            className="absolute right-5"
            style={{ top: bubble1Top, opacity: bubble1Opacity }}
          >
            궁금하면 스크롤해줘!
          </SpeechBubble>

          {/* 말풍선 2: 살지 말지 고민되는 상품이 있어... */}
          <SpeechBubble
            className="absolute right-5"
            style={{ top: bubble2Top, opacity: bubble2Opacity }}
          >
            살지 말지 고민되는 상품이 있어...
          </SpeechBubble>

          {/* 하단 스크롤 힌트 */}
          <Typography
            variant="t1-bold"
            className="absolute left-1/2 -translate-x-1/2 text-gray-0 animate-bounce [animation-duration:1.8s]"
            style={{ bottom: hintBottom, opacity: hintOpacity }}
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
