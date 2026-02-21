import React from "react";
import { useLottie } from "lottie-react";

import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";

import tobong1 from "@/assets/lottie/토봉1.json";
import { FadeLayer, SpeechBubble } from "./shared";

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

function TobongLottie({ style }: { style?: React.CSSProperties }) {
  const { View } = useLottie({
    animationData: tobong1,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%", display: "block" },
  });
  return (
    <div className="absolute" style={style}>
      {View}
    </div>
  );
}

interface Section1SceneProps {
  scrollTop: number;
  containerWidth: number;
  containerHeight: number;
  scrollDistance: number;
}

function Section1Scene({
  scrollTop,
  containerWidth,
  containerHeight,
  scrollDistance,
}: Section1SceneProps) {
  const progress = clamp01(scrollTop / scrollDistance);
  const ep = easeInOut(progress);

  const scale = containerWidth / 375;
  const charStartWidth = 638 * scale;
  const charStartHeight = 567 * scale;
  const charEndWidth = 302 * scale;
  const charEndHeight = 268 * scale;

  const charStartBottom = -containerHeight * 0.14;
  const charStartLeft = -containerWidth * 0.2;
  const charEndBottom = (containerHeight - charEndHeight) / 2;
  const charEndLeft = containerWidth / 2;

  const charBottom = lerp(charStartBottom, charEndBottom, ep);
  const charLeft = lerp(charStartLeft, charEndLeft, ep);
  const charTranslateX = lerp(0, -50, ep);
  const charWidth = lerp(charStartWidth, charEndWidth, ep);
  const charHeight = lerp(charStartHeight, charEndHeight, ep);

  const logoTop = containerHeight * 0.04;
  const bubble2Bottom = charEndBottom + charEndHeight + 26;
  const hintBottom = containerHeight * 0.06;

  const titleOpacity = mapRange(progress, 0, 0.35, 1, 0);
  const hintOpacity = mapRange(progress, 0, 0.25, 1, 0);
  const bubble2Opacity = mapRange(progress, 0.7, 0.9, 0, 1);

  const holdDistance = containerHeight;
  const fadeOutStart = scrollDistance + holdDistance * 0.7;
  const fadeOutEnd = scrollDistance + holdDistance;
  const section1FadeOut = mapRange(scrollTop, fadeOutStart, fadeOutEnd, 0, 1);

  return (
    <div className="sticky top-0 h-screen" style={{ overflow: "clip" }}>
      <div
        className="absolute left-[24px]"
        style={{ top: logoTop, opacity: titleOpacity }}
      >
        <Logo width={100} height={24} />
      </div>

      <TobongLottie
        style={{
          bottom: charBottom,
          left: charLeft,
          width: charWidth,
          height: charHeight,
          transform: `translateX(${charTranslateX}%)`,
        }}
      />

      <SpeechBubble
        centerArrow
        animateOn="visible"
        isVisible={bubble2Opacity > 0.01}
        animateDelayMs={300}
        className="whitespace-nowrap"
        style={{
          position: "absolute",
          bottom: bubble2Bottom,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: bubble2Opacity,
        }}
      >
        살지 말지 고민되는 상품이 있어...
      </SpeechBubble>

      <div
        className="absolute left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-[10px] [animation-duration:1.8s]"
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
