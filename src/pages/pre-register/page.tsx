import { useEffect, useRef, useState } from "react";

import { Section1Scene } from "./components/section1-scene";
import { Section2Scene } from "./components/section2-scene";
import { Section3Scene } from "./components/section3-scene";
import { Section4Scene } from "./components/section4-scene";

const SCROLL_DISTANCE = 1200;
const SECTION2_WAIT_MS = 1000;
const SECTION2_WHITE_MS = 1400;
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

  const holdDistance = containerHeight;
  const totalSpacer = SCROLL_DISTANCE + holdDistance;

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

    section2TimersRef.current = [
      whiteTimer,
      section3Timer,
    ];
  };

  const handleSection3AnimationComplete = () => {
    setSection2Phase("section3-fadeout");

    const section4FadeInTimer = window.setTimeout(() => {
      setSection2Phase("section4-fadein");
    }, SECTION3_TO_4_FADE_OUT_MS);

    const section4Timer = window.setTimeout(() => {
      setSection2Phase("section4");
    }, SECTION3_TO_4_FADE_OUT_MS + SECTION3_TO_4_FADE_IN_MS);

    section2TimersRef.current.push(section4FadeInTimer, section4Timer);
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
    <div className="min-h-[100svh] min-h-[100dvh] bg-gray-100 overflow-hidden">
      <div
        ref={scrollRef}
        className="relative mx-auto h-[100svh] h-[100dvh] w-full max-w-[540px] overflow-y-scroll bg-gray-0"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        <Section1Scene
          scrollTop={scrollTop}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          scrollDistance={SCROLL_DISTANCE}
        />

        <div aria-hidden style={{ height: totalSpacer }} />

        <div className="relative z-1 mx-auto h-[100svh] h-[100dvh] overflow-hidden bg-gray-0">
          <Section2Scene
            contentOpacity={section2ContentOpacity}
            whiteOpacity={section2WhiteOpacity}
            selectedVoteId={selectedVoteId}
            onVote={handleVote}
            containerWidth={containerWidth}
          />

          <Section3Scene opacity={section3ContentOpacity} transitionMs={SECTION3_TO_4_FADE_OUT_MS} onAnimationComplete={handleSection3AnimationComplete} />

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
              containerWidth={containerWidth}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes brandAssetFloat {
          0%   { transform: translateY(0); }
          25%  { transform: translateY(-14px); }
          50%  { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default PreRegisterPage;
