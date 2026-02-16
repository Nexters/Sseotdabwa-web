import { useEffect, useRef, useState } from "react";

import { BrandAssetBox } from "@/components/ui/brand-asset";
import { FeedCard } from "@/components/ui/feed-card";
import { Stack } from "@/components/ui/flex";
import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";

const SCROLL_DISTANCE = 1200;
const SECTION2_WAIT_MS = 1000;
const SECTION2_WHITE_MS = 1400;
const SECTION3_HOLD_MS = 2000;

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
      className={`relative inline-flex w-fit items-center rounded-[10px] px-3 py-[7px] ${className ?? ""}`}
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

function FadeLayer({
  opacity,
  children,
  className,
  style,
}: {
  opacity: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ opacity, transition: "opacity 0.2s ease-out", ...style }}
    >
      {children}
    </div>
  );
}

function PreRegisterPage() {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(375);
  const [containerHeight, setContainerHeight] = useState(667);
  const [selectedVoteId, setSelectedVoteId] = useState<string>();
  const [section4VoteId, setSection4VoteId] = useState<string>();
  const [section2Phase, setSection2Phase] = useState<
    "default" | "wait" | "white" | "section3" | "section4"
  >("default");
  const section2TimersRef = useRef<number[]>([]);

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

  useEffect(() => {
    return () => {
      section2TimersRef.current.forEach((timer) => window.clearTimeout(timer));
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
  const bubble1Top = 60;
  const bubble2Top = containerHeight * 0.3;
  const hintBottom = containerHeight * 0.06;

  const titleOpacity = mapRange(progress, 0, 0.35, 1, 0);
  const hintOpacity = mapRange(progress, 0, 0.25, 1, 0);
  const bubble1Opacity = mapRange(progress, 0.35, 0.55, 1, 0);
  const bubble2Opacity = mapRange(progress, 0.7, 0.9, 0, 1);

  // ── 섹션 1 → 2 전환 ──
  // 애니메이션 완료 후 h-screen만큼 토봉이가 더 보인 뒤 fade-out
  const HOLD_DISTANCE = containerHeight; // 토봉이 유지 구간
  const TOTAL_SPACER = SCROLL_DISTANCE + HOLD_DISTANCE;

  // 섹션1 fade-out: HOLD 구간 마지막 30%에서 흰 화면으로
  const fadeOutStart = SCROLL_DISTANCE + HOLD_DISTANCE * 0.7;
  const fadeOutEnd = SCROLL_DISTANCE + HOLD_DISTANCE;
  const section1FadeOut = mapRange(scrollTop, fadeOutStart, fadeOutEnd, 0, 1);

  // section2Entry: 0 = 섹션2 하단에 걸침, 1 = 뷰포트 꽉 채움
  const section2Entry = clamp01((scrollTop - TOTAL_SPACER) / containerHeight);
  // 완전히 채워진 순간(90~100%)에만 콘텐츠 fade-in
  const section2IntroOpacity = mapRange(section2Entry, 0.9, 1.0, 0, 1);

  // ── 섹션 2 → 3 전환 (vote 이후, 시간 기반) ──
  const section2ContentOpacity =
    section2Phase === "white" ||
    section2Phase === "section3" ||
    section2Phase === "section4"
      ? 0
      : section2IntroOpacity;
  const section2WhiteOpacity = section2Phase === "white" ? 1 : 0;
  const section3ContentOpacity = section2Phase === "section3" ? 1 : 0;
  const section4ContentOpacity = section2Phase === "section4" ? 1 : 0;

  const handleVote = (optionId: string) => {
    if (selectedVoteId) return;
    setSelectedVoteId(optionId);
    setSection2Phase("wait");

    const whiteTimer = window.setTimeout(() => {
      setSection2Phase("white");
    }, SECTION2_WAIT_MS);

    const section3Timer = window.setTimeout(() => {
      setSection2Phase("section3");
    }, SECTION2_WAIT_MS + SECTION2_WHITE_MS);

    const section4Timer = window.setTimeout(
      () => {
        setSection2Phase("section4");
      },
      SECTION2_WAIT_MS + SECTION2_WHITE_MS + SECTION3_HOLD_MS,
    );

    section2TimersRef.current = [whiteTimer, section3Timer, section4Timer];
  };

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
            centerArrow
            style={{
              position: "absolute",
              top: bubble1Top,
              right: 40,
              opacity: bubble1Opacity,
            }}
          >
            궁금하면 스크롤해줘!
          </SpeechBubble>

          <SpeechBubble
            centerArrow
            className="whitespace-nowrap"
            style={{
              position: "absolute",
              top: bubble2Top,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: bubble2Opacity,
            }}
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
          <FadeLayer
            opacity={section1FadeOut}
            className="pointer-events-none absolute inset-0 bg-gray-0"
          />
        </div>

        {/* 섹션 1 스크롤 공간 */}
        <div aria-hidden style={{ height: TOTAL_SPACER }} />

        {/* ── 섹션 2: 피드 카드 ──
            z-1 + bg-gray-0 → 아래서 올라오며 섹션 1을 흰 화면으로 덮음
            콘텐츠는 섹션2가 뷰포트를 꽉 채울 때(section2Entry 90~100%) fade-in */}
        <div className="relative z-1 mx-auto h-screen overflow-hidden bg-gray-0">
          <FadeLayer opacity={section2ContentOpacity}>
            {/* 말풍선 + 캐릭터: top 35px, 간격 20px, 토봉이 z-10 */}
            <Stack align="center" gap={20} className="relative pt-[35px]">
              <SpeechBubble centerArrow>한 번 투표해볼래?</SpeechBubble>
              <img
                src="/tobong.png"
                alt="토봉 캐릭터"
                style={{ width: 82, height: "auto" }}
              />
            </Stack>

            {/* 피드 카드: 토봉이와 -50px 겹침 */}
            <div className="relative z-0 -mt-[30px] px-5">
              <FeedCard
                content="두쫀쿠 너~무 먹고싶은데 집근처엔 이 가격뿐..."
                image="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
                price={31900}
                voteOptions={[
                  { id: "1", label: "사! 가즈아!", percentage: 80 },
                  { id: "2", label: "애매하긴 해..", percentage: 20 },
                ]}
                selectedVoteId={selectedVoteId}
                onVote={handleVote}
              />
            </div>
          </FadeLayer>

          <FadeLayer
            opacity={section2WhiteOpacity}
            className="pointer-events-none absolute inset-0 bg-gray-0"
          />
          <FadeLayer
            opacity={section3ContentOpacity}
            className="pointer-events-none absolute inset-0"
          >
            <Stack
              align="center"
              gap={100}
              className="absolute bottom-[135px] left-1/2 -translate-x-1/2"
            >
              <SpeechBubble centerArrow>의견줘서 고마워~~!</SpeechBubble>
              <img
                src="/tobong.png"
                alt="토봉 캐릭터 감사 인사"
                style={{ width: 210, height: "auto" }}
              />
            </Stack>
          </FadeLayer>

          <FadeLayer
            opacity={section4ContentOpacity}
            className="absolute inset-0"
            style={{
              pointerEvents: section2Phase === "section4" ? "auto" : "none",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {!section4VoteId ? (
                <div className="flex w-full max-w-[375px] flex-col items-center gap-[10px] px-5">
                  <SpeechBubble centerArrow>
                    혹시 너도 살까말까 고민해본적 있어?
                  </SpeechBubble>

                  <div className="flex h-[240px] w-full max-w-[412px] items-center justify-center">
                    <div
                      style={{
                        animation:
                          "brandAssetFloatStep 3s ease-in-out infinite",
                        animationDelay: "0s",
                      }}
                    >
                      <BrandAssetBox
                        asset="socks"
                        iconSize={60}
                        className="z-0 -mr-[8px] rounded-[32px]"
                        style={{
                          width: 108,
                          height: 125,
                          transform: "rotate(16.98deg)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        animation:
                          "brandAssetFloatStep 3s ease-in-out infinite",
                        animationDelay: "1s",
                      }}
                    >
                      <BrandAssetBox
                        asset="tshirt"
                        iconSize={60}
                        className="z-10 rounded-[32px]"
                        style={{
                          width: 108,
                          height: 125,
                          transform: "rotate(-18.01deg)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        animation:
                          "brandAssetFloatStep 3s ease-in-out infinite",
                        animationDelay: "2s",
                      }}
                    >
                      <BrandAssetBox
                        asset="pants"
                        iconSize={60}
                        className="z-0 -ml-[8px] rounded-[32px]"
                        style={{
                          width: 108,
                          height: 125,
                          transform: "rotate(12.76deg)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-[10px]">
                    <button
                      type="button"
                      onClick={() => setSection4VoteId("yes")}
                      className="h-[62px] w-full rounded-[15px] border border-gray-300 bg-gray-100 px-4 text-left"
                    >
                      <Typography
                        variant="s2-semibold"
                        className="text-gray-900"
                      >
                        예
                      </Typography>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSection4VoteId("no")}
                      className="h-[62px] w-full rounded-[15px] border border-gray-300 bg-gray-100 px-4 text-left"
                    >
                      <Typography
                        variant="s2-semibold"
                        className="text-gray-900"
                      >
                        아니오
                      </Typography>
                    </button>
                  </div>
                </div>
              ) : (
                <Stack className="w-full items-center gap-[24px] px-5">
                  <SpeechBubble centerArrow>
                    {section4VoteId === "yes"
                      ? "여기서 고민을 해결해보면 어때?"
                      : "소비 정보에도 참고되니 놀러와줘~!"}
                  </SpeechBubble>

                  <div className="relative w-[220px] -mb-[60px]">
                    <img
                      src="/example.png"
                      alt="살까말까 예시 화면"
                      className="h-auto w-full"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[96px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
                      }}
                    />
                  </div>

                  <div className="relative w-full pt-[12px]">
                    <img
                      src="/tobong.png"
                      alt="토봉 캐릭터"
                      className="absolute z-0"
                      style={{ width: 96, right: 15, bottom: 34 }}
                    />
                    <button
                      type="button"
                      className="relative z-10 py-[18px] w-full rounded-[18px] bg-gray-100 px-6 text-gray-800 border border-gray-100"
                      style={{
                        boxShadow: "0 4px 60px 0 rgba(52, 71, 99, 0.2)",
                      }}
                    >
                      <Typography variant="t1-bold" className="text-gray-900">
                        '살까말까' 바로가기
                      </Typography>
                    </button>
                  </div>
                </Stack>
              )}
            </div>
          </FadeLayer>
        </div>
      </div>
      <style>{`
        @keyframes brandAssetFloatStep {
          0% { transform: translateY(0); }
          15% { transform: translateY(-10px); }
          30% { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default PreRegisterPage;
