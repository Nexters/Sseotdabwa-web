import { useEffect, useRef, useState } from "react";

import { FeedCard } from "@/components/ui/feed-card";
import { Stack } from "@/components/ui/flex";
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
  centerArrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  centerArrow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[16px] px-3 py-[7px] ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #2A3038 0%, #77879E 100%)",
        ...style,
      }}
    >
      <Typography variant="s5-semibold" className="text-gray-0">
        {children}
      </Typography>
      <div
        className={`absolute -bottom-[7px] ${centerArrow ? "left-1/2 -translate-x-1/2" : "left-4"}`}
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
  const [scrollTop, setScrollTop] = useState(0);
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

    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  // ── 섹션 1: 캐릭터 축소 애니메이션 ──
  const progress = clamp01(scrollTop / SCROLL_DISTANCE);
  const ep = easeInOut(progress);

  const charStartBottom = -containerHeight * 0.14;
  const charStartLeft = -containerWidth * 0.2;
  const charEndHeightPct = 28;
  const charEndBottom = (containerHeight * (1 - charEndHeightPct / 100)) / 2;
  const charEndLeft = containerWidth / 2;

  const charBottom = lerp(charStartBottom, charEndBottom, ep);
  const charLeft = lerp(charStartLeft, charEndLeft, ep);
  const charTranslateX = lerp(0, -50, ep);
  const charHeightPct = lerp(100, charEndHeightPct, ep);

  const logoTop = containerHeight * 0.04;
  const bubble1Top = containerHeight * 0.16;
  const bubble2Top = containerHeight * 0.3;
  const hintBottom = containerHeight * 0.06;

  const titleOpacity = mapRange(progress, 0, 0.35, 1, 0);
  const hintOpacity = mapRange(progress, 0, 0.25, 1, 0);
  const bubble1Opacity = mapRange(progress, 0.35, 0.55, 1, 0);
  const bubble2Opacity = mapRange(progress, 0.7, 0.9, 0, 1);

  // ── 섹션 2: 슬라이드 인 & 콘텐츠 fade-in ──
  // section2Entry: 0 = 섹션2 하단에 걸침, 1 = 뷰포트 꽉 채움
  const section2Entry = clamp01(
    (scrollTop - SCROLL_DISTANCE) / containerHeight,
  );
  // 완전히 채워진 순간(90~100%)에만 콘텐츠 fade-in
  const section2ContentOpacity = mapRange(section2Entry, 0.9, 1.0, 0, 1);

  const section2CharHeight = containerHeight * 0.15;

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        ref={scrollRef}
        className="relative mx-auto h-screen w-full max-w-[540px] overflow-y-scroll bg-gray-0"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        {/* ── 섹션 1: 스크롤 애니메이션 ── */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="absolute left-5"
            style={{ top: logoTop, opacity: titleOpacity }}
          >
            <Logo />
          </div>

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

          <SpeechBubble
            className="absolute right-5"
            style={{ top: bubble1Top, opacity: bubble1Opacity }}
          >
            궁금하면 스크롤해줘!
          </SpeechBubble>

          <SpeechBubble
            className="absolute right-5"
            style={{ top: bubble2Top, opacity: bubble2Opacity }}
          >
            살지 말지 고민되는 상품이 있어...
          </SpeechBubble>

          <Typography
            variant="t1-bold"
            className="absolute left-1/2 -translate-x-1/2 text-gray-0 animate-bounce [animation-duration:1.8s]"
            style={{ bottom: hintBottom, opacity: hintOpacity }}
          >
            궁금하면 스크롤!!
          </Typography>

          {/* 섹션1 fade-out: 애니메이션 끝날 때 흰 화면으로 덮음 */}
          <div
            className="pointer-events-none absolute inset-0 bg-gray-0"
            style={{ opacity: mapRange(progress, 0.85, 1.0, 0, 1) }}
          />
        </div>

        {/* 섹션 1 스크롤 공간 */}
        <div aria-hidden style={{ height: `${SCROLL_DISTANCE}px` }} />

        {/* ── 섹션 2: 피드 카드 ──
            z-1 + bg-gray-0 → 아래서 올라오며 섹션 1을 흰 화면으로 덮음
            콘텐츠는 섹션2가 뷰포트를 꽉 채울 때(section2Entry 90~100%) fade-in */}
        <div className="relative z-1 min-h-screen bg-gray-0 pb-20">
          <div
            style={{
              opacity: section2ContentOpacity,
              transition: "opacity 0.15s ease-out",
            }}
          >
            {/* 말풍선 + 캐릭터 */}
            <Stack align="center" gap={20} className="pt-[35px] pb-6">
              <SpeechBubble centerArrow>한 번 투표해볼래?</SpeechBubble>
              <img
                src="/tobong.png"
                alt="토봉 캐릭터"
                style={{ height: section2CharHeight, width: "auto" }}
              />
            </Stack>

            {/* 피드 카드 */}
            <div className="px-5">
              <FeedCard
                username="참새방앗간12456"
                category="업무·공부 생산성"
                timeAgo="6시간 전"
                content="두쫀쿠 너~무 먹고싶은데 집근처엔 이 가격뿐..."
                image="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
                price={31900}
                voteOptions={[
                  { id: "1", label: "사! 가즈아!", percentage: 80 },
                  { id: "2", label: "애매하긴 해..", percentage: 20 },
                ]}
                voteCount={89}
                isVoting={true}
                selectedVoteId="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreRegisterPage;
