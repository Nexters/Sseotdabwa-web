import { useEffect, useRef } from "react";
import { useLottie } from "lottie-react";

import { Stack } from "@/components/ui/flex";

import tobong3 from "@/assets/lottie/토봉3.json";
import { FadeLayer, SpeechBubble } from "./shared";

interface TobongLottieProps {
  isVisible: boolean;
  onComplete?: () => void;
}

function TobongLottie({ isVisible, onComplete }: TobongLottieProps) {
  const playCountRef = useRef(0);
  const hasStartedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  const { View, animationItem } = useLottie({
    animationData: tobong3,
    loop: false,
    autoplay: false,
  });

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!animationItem) return;

    const handleComplete = () => {
      playCountRef.current += 1;
      if (playCountRef.current < 2) {
        // 2번째 재생: 0 ~ totalFrames/3 구간만 재생
        const target = Math.floor(animationItem.totalFrames / 4);
        animationItem.playSegments([0, target], true);
      } else {
        onCompleteRef.current?.();
      }
    };

    animationItem.addEventListener("complete", handleComplete);

    return () => {
      try {
        animationItem.removeEventListener("complete", handleComplete);
      } catch {
        // noop
      }
    };
  }, [animationItem]);

  useEffect(() => {
    if (!animationItem) return;
    if (isVisible && !hasStartedRef.current) {
      hasStartedRef.current = true;
      playCountRef.current = 0;
      animationItem.goToAndPlay(0, true);
    }
    if (!isVisible) {
      hasStartedRef.current = false;
      playCountRef.current = 0;
      animationItem.stop();
    }
  }, [animationItem, isVisible]);

  return <div style={{ width: 266, height: 320 }}>{View}</div>;
}

interface Section3SceneProps {
  opacity: number;
  transitionMs?: number;
  onAnimationComplete?: () => void;
}

function Section3Scene({
  opacity,
  transitionMs = 340,
  onAnimationComplete,
}: Section3SceneProps) {
  const isVisible = opacity > 0.01;

  return (
    <FadeLayer
      opacity={opacity}
      transitionMs={transitionMs}
      className="pointer-events-none absolute inset-0"
    >
      <Stack
        align="center"
        gap={10}
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2"
      >
        <SpeechBubble centerArrow animateOn="visible" isVisible={isVisible}>
          의견줘서 고마워~~!
        </SpeechBubble>
        <TobongLottie isVisible={isVisible} onComplete={onAnimationComplete} />
      </Stack>
    </FadeLayer>
  );
}

export { Section3Scene };
