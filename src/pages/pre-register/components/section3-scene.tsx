import { useLottie } from "lottie-react";

import { Stack } from "@/components/ui/flex";

import tobong3 from "@/assets/lottie/토봉3.json";
import { FadeLayer, SpeechBubble } from "./shared";

function TobongLottie() {
  const { View } = useLottie({ animationData: tobong3, loop: true, autoplay: true })
  return <div style={{ width: 210 }}>{View}</div>
}

interface Section3SceneProps {
  opacity: number;
  transitionMs?: number;
}

function Section3Scene({ opacity, transitionMs = 340 }: Section3SceneProps) {
  return (
    <FadeLayer
      opacity={opacity}
      transitionMs={transitionMs}
      className="pointer-events-none absolute inset-0"
    >
      <Stack
        align="center"
        gap={100}
        className="absolute bottom-[135px] left-1/2 -translate-x-1/2"
      >
        <SpeechBubble
          centerArrow
          animateOn="visible"
          isVisible={opacity > 0.01}
        >
          의견줘서 고마워~~!
        </SpeechBubble>
        <TobongLottie />
      </Stack>
    </FadeLayer>
  );
}

export { Section3Scene };
