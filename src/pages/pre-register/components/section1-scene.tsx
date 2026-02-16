import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";

import { FadeLayer, SpeechBubble } from "./shared";

interface Section1SceneProps {
  logoTop: number;
  titleOpacity: number;
  charBottom: number;
  charLeft: number;
  charHeightPct: number;
  charTranslateX: number;
  bubble1Top: number;
  bubble1Opacity: number;
  bubble2Top: number;
  bubble2Opacity: number;
  hintBottom: number;
  hintOpacity: number;
  section1FadeOut: number;
}

function Section1Scene({
  logoTop,
  titleOpacity,
  charBottom,
  charLeft,
  charHeightPct,
  charTranslateX,
  bubble1Top,
  bubble1Opacity,
  bubble2Top,
  bubble2Opacity,
  hintBottom,
  hintOpacity,
  section1FadeOut,
}: Section1SceneProps) {
  return (
    <div className="sticky top-0 h-screen overflow-hidden">
      <div className="absolute left-5" style={{ top: logoTop, opacity: titleOpacity }}>
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

      <div
        className="absolute left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-[4px] [animation-duration:1.8s]"
        style={{ bottom: hintBottom, opacity: hintOpacity }}
      >
        <Typography variant="t1-bold" className="text-gray-0">
          궁금하면 스크롤!!
        </Typography>
        <Icon icon="down" size={12} className="text-gray-0" />
      </div>

      <FadeLayer
        opacity={section1FadeOut}
        className="pointer-events-none absolute inset-0 bg-gray-0"
      />
    </div>
  );
}

export { Section1Scene };
