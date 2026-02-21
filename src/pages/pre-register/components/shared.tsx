import { useEffect, useRef, useState } from "react";

import { Typography } from "@/components/ui/typography";

function SpeechBubble({
  children,
  className,
  style,
  centerArrow = false,
  animateOn,
  isVisible = true,
  animateDelayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  centerArrow?: boolean;
  animateOn?: "mount" | "visible" | "inView";
  isVisible?: boolean;
  animateDelayMs?: number;
}) {
  const popRef = useRef<HTMLDivElement>(null);
  const hasToggleAnimatedRef = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [isPendingAnimation, setIsPendingAnimation] = useState(false);

  useEffect(() => {
    if (animateOn !== "inView") return;

    const el = popRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0.25 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [animateOn]);

  useEffect(() => {
    const shouldAnimate =
      animateOn === "mount" || (animateOn === "visible" && isVisible);
    const shouldAnimateInView =
      animateOn === "inView" && isVisible && isInView;
    const shouldPlay = shouldAnimate || shouldAnimateInView;
    if (!shouldPlay) {
      setIsPendingAnimation(false);
      if (animateOn === "visible" || animateOn === "inView") {
        hasToggleAnimatedRef.current = false;
      }
      return;
    }
    if ((animateOn === "visible" || animateOn === "inView") && hasToggleAnimatedRef.current)
      return;

    const el = popRef.current;
    if (!el) return;

    const motionReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionReduce.matches) {
      setIsPendingAnimation(false);
      return;
    }
    const baseTransform = el.style.transform?.trim() ?? "";
    const withBase = (suffix: string) =>
      baseTransform ? `${baseTransform} ${suffix}` : suffix;

    let didRunAnimation = false;
    setIsPendingAnimation(true);
    const timerId = window.setTimeout(() => {
      didRunAnimation = true;
      if (animateOn === "visible" || animateOn === "inView") {
        hasToggleAnimatedRef.current = true;
      }
      setIsPendingAnimation(false);
      // 말풍선이 아래로 내려올 때 로띠와의 간격(10px)을 유지하기 위해
      // 기준점을 -10px(위)로 잡고, 최고점은 -18px(-8px 추가)까지 올라감
      el.animate(
        [
          { transform: withBase("translateY(-10px)"), offset: 0 },
          { transform: withBase("translateY(-18px)"), offset: 1 / 6 },
          { transform: withBase("translateY(-18px)"), offset: 2 / 6 },
          { transform: withBase("translateY(-18px)"), offset: 3 / 6 },
          { transform: withBase("translateY(-10px)"), offset: 4 / 6 },
          { transform: withBase("translateY(-10px)"), offset: 5 / 6 },
          { transform: withBase("translateY(-10px)"), offset: 1 },
        ],
        {
          duration: 2000,
          easing: "ease-in-out",
          fill: "both",
          iterations: Infinity,
        },
      );
    }, Math.max(0, animateDelayMs));

    return () => {
      window.clearTimeout(timerId);
      setIsPendingAnimation(false);
      if (!didRunAnimation && (animateOn === "visible" || animateOn === "inView")) {
        hasToggleAnimatedRef.current = false;
      }
    };
  }, [animateDelayMs, animateOn, isVisible, isInView]);

  return (
    <div
      ref={popRef}
      className={`relative inline-flex w-fit items-center rounded-[10px] px-[12px] py-[10px] ${className ?? ""}`}
      style={{
        background: "#2A3038",
        visibility: isPendingAnimation ? "hidden" : "visible",
        ...style,
      }}
    >
      <Typography variant="s4-semibold" className="text-gray-0">
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
  transitionMs = 200,
}: {
  opacity: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  transitionMs?: number;
}) {
  return (
    <div
      className={className}
      style={{ opacity, transition: `opacity ${transitionMs}ms ease-out`, ...style }}
    >
      {children}
    </div>
  );
}

export { SpeechBubble, FadeLayer };
