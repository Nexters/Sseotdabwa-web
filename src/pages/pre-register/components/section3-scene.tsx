import Lottie from "lottie-react";

import { Stack } from "@/components/ui/flex";

import tobong3 from "../../../../public/lottie/토봉3.json";
import { FadeLayer, SpeechBubble } from "./shared";

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
        <Lottie
          animationData={tobong3}
          loop
          autoplay
          style={{ width: 210, height: "auto" }}
        />
      </Stack>
    </FadeLayer>
  );
}

export { Section3Scene };
