import { Stack } from "@/components/ui/flex";

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
        <SpeechBubble centerArrow animate>
          의견줘서 고마워~~!
        </SpeechBubble>
        <img
          src="/tobong.png"
          alt="토봉 캐릭터 감사 인사"
          style={{ width: 210, height: "auto" }}
        />
      </Stack>
    </FadeLayer>
  );
}

export { Section3Scene };
