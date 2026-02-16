import { useEffect, useRef, useState } from "react";

import { Section1Scene } from "./components/section1-scene";
import { Section2Scene } from "./components/section2-scene";
import { Section3Scene } from "./components/section3-scene";
import { Section4Scene } from "./components/section4-scene";

const SCROLL_DISTANCE = 1200;
const SECTION2_WAIT_MS = 1000;
const SECTION2_WHITE_MS = 1400;
const SECTION3_HOLD_MS = 2000;
const SECTION4_TO_5_FADE_MS = 260;
const SECTION3_TO_4_FADE_OUT_MS = 320;
const SECTION3_TO_4_FADE_IN_MS = 340;

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

function PreRegisterPage() {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(375);
  const [containerHeight, setContainerHeight] = useState(667);
  const [selectedVoteId, setSelectedVoteId] = useState<string>();
  const [section4VoteId, setSection4VoteId] = useState<string>();
  const [isSection4FadingOut, setIsSection4FadingOut] = useState(false);
  const [isSection5Visible, setIsSection5Visible] = useState(false);
  const [section2Phase, setSection2Phase] = useState<
    | "default"
    | "wait"
    | "white"
    | "section3"
    | "section3-fadeout"
    | "section4-fadein"
    | "section4"
  >("default");
  const section2TimersRef = useRef<number[]>([]);
  const section4TimersRef = useRef<number[]>([]);

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
      section4TimersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

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

  const holdDistance = containerHeight;
  const totalSpacer = SCROLL_DISTANCE + holdDistance;
  const fadeOutStart = SCROLL_DISTANCE + holdDistance * 0.7;
  const fadeOutEnd = SCROLL_DISTANCE + holdDistance;
  const section1FadeOut = mapRange(scrollTop, fadeOutStart, fadeOutEnd, 0, 1);

  const section2Entry = clamp01((scrollTop - totalSpacer) / containerHeight);
  const section2IntroOpacity = mapRange(section2Entry, 0.9, 1.0, 0, 1);

  const section2ContentOpacity =
    section2Phase === "white" ||
    section2Phase === "section3" ||
    section2Phase === "section3-fadeout" ||
    section2Phase === "section4-fadein" ||
    section2Phase === "section4"
      ? 0
      : section2IntroOpacity;
  const section2WhiteOpacity = section2Phase === "white" ? 1 : 0;
  const section3ContentOpacity =
    section2Phase === "section3" ? 1 : section2Phase === "section3-fadeout" ? 0 : 0;
  const section4ContentOpacity =
    section2Phase === "section4-fadein" || section2Phase === "section4" ? 1 : 0;
  const section4PromptOpacity = isSection4FadingOut ? 0 : 1;
  const section5ContentOpacity = isSection5Visible ? 1 : 0;

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

    const section3FadeOutTimer = window.setTimeout(() => {
      setSection2Phase("section3-fadeout");
    }, SECTION2_WAIT_MS + SECTION2_WHITE_MS + SECTION3_HOLD_MS);

    const section4FadeInTimer = window.setTimeout(() => {
      setSection2Phase("section4-fadein");
    }, SECTION2_WAIT_MS + SECTION2_WHITE_MS + SECTION3_HOLD_MS + SECTION3_TO_4_FADE_OUT_MS);

    const section4Timer = window.setTimeout(() => {
      setSection2Phase("section4");
    }, SECTION2_WAIT_MS + SECTION2_WHITE_MS + SECTION3_HOLD_MS + SECTION3_TO_4_FADE_OUT_MS + SECTION3_TO_4_FADE_IN_MS);

    section2TimersRef.current = [
      whiteTimer,
      section3Timer,
      section3FadeOutTimer,
      section4FadeInTimer,
      section4Timer,
    ];
  };

  const handleSection4Vote = (voteId: string) => {
    if (section4VoteId) return;

    setSection4VoteId(voteId);
    setIsSection4FadingOut(true);

    const section5Timer = window.setTimeout(() => {
      setIsSection5Visible(true);
    }, SECTION4_TO_5_FADE_MS);

    section4TimersRef.current = [section5Timer];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        ref={scrollRef}
        className="relative mx-auto h-screen w-full max-w-[540px] overflow-y-scroll bg-gray-0"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        <Section1Scene
          logoTop={logoTop}
          titleOpacity={titleOpacity}
          charBottom={charBottom}
          charLeft={charLeft}
          charHeightPct={charHeightPct}
          charTranslateX={charTranslateX}
          bubble1Top={bubble1Top}
          bubble1Opacity={bubble1Opacity}
          bubble2Top={bubble2Top}
          bubble2Opacity={bubble2Opacity}
          hintBottom={hintBottom}
          hintOpacity={hintOpacity}
          section1FadeOut={section1FadeOut}
        />

        <div aria-hidden style={{ height: totalSpacer }} />

        <div className="relative z-1 mx-auto h-screen overflow-hidden bg-gray-0">
          <Section2Scene
            contentOpacity={section2ContentOpacity}
            whiteOpacity={section2WhiteOpacity}
            selectedVoteId={selectedVoteId}
            onVote={handleVote}
          />

          <Section3Scene opacity={section3ContentOpacity} transitionMs={SECTION3_TO_4_FADE_OUT_MS} />

          {(section2Phase === "section3-fadeout" ||
            section2Phase === "section4-fadein" ||
            section2Phase === "section4") && (
            <Section4Scene
              opacity={section4ContentOpacity}
              promptOpacity={section4PromptOpacity}
              resultOpacity={section5ContentOpacity}
              section4VoteId={section4VoteId}
              isSection5Visible={isSection5Visible}
              onVote={handleSection4Vote}
              transitionMs={SECTION3_TO_4_FADE_IN_MS}
            />
          )}
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
