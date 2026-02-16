import { useEffect, useRef } from "react";

import { Typography } from "@/components/ui/typography";

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
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = popRef.current;
    if (!el) return;

    const motionReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionReduce.matches) return;

    el.animate(
      [
        { transform: "translateY(6px) scale(0.88)" },
        { transform: "translateY(0) scale(1)" },
      ],
      {
        duration: 260,
        easing: "cubic-bezier(0.2, 0.85, 0.25, 1)",
        fill: "both",
      },
    );
  }, []);

  return (
    <div
      className={`relative inline-flex w-fit items-center rounded-[10px] px-3 py-[7px] ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #2A3038 0%, #77879E 100%)",
        ...style,
      }}
    >
      <div ref={popRef}>
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
