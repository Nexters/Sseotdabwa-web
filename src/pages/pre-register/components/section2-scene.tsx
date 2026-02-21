import { useLottie } from "lottie-react";

import { FeedCard } from "@/components/ui/feed-card";
import { Stack } from "@/components/ui/flex";

import tobong2 from "@/assets/lottie/토봉2.json";
import { FadeLayer, SpeechBubble } from "./shared";

function TobongLottie() {
  const { View } = useLottie({
    animationData: tobong2,
    loop: true,
    autoplay: true,
  });
  return <div style={{ width: 82, height: 73 }}>{View}</div>;
}

interface Section2SceneProps {
  contentOpacity: number;
  whiteOpacity: number;
  selectedVoteId?: string;
  onVote: (optionId: string) => void;
  containerWidth: number;
}

function Section2Scene({
  contentOpacity,
  whiteOpacity,
  selectedVoteId,
  onVote,
  containerWidth,
}: Section2SceneProps) {
  const px = containerWidth > 375 ? 40 : 20;
  return (
    <>
      <FadeLayer opacity={contentOpacity}>
        <Stack align="center" gap={0} className="pt-[35px]">
          <SpeechBubble
            centerArrow
            animateOn="visible"
            isVisible={contentOpacity > 0.01}
          >
            한 번 투표해볼래?
          </SpeechBubble>
          <div style={{ marginTop: 12 }}>
            <TobongLottie />
          </div>
        </Stack>

        <div className="relative z-0 -mt-[21px]" style={{ paddingInline: px }}>
          <FeedCard
            priceTypographyVariant={containerWidth > 375 ? "h2-bold" : "t1-bold"}
            zoomable={false}
            content="두쫀쿠 너~무 먹고싶은데 집근처엔 이 가격뿐..."
            image="https://buy-or-not.com/du.png"
            imageWidth={1}
            imageHeight={1}
            price={9_700}
            voteOptions={[
              { id: "1", label: "사! 가즈아!", percentage: 80 },
              { id: "2", label: "애매하긴 해..", percentage: 20 },
            ]}
            selectedVoteId={selectedVoteId}
            onVote={onVote}
          />
        </div>
      </FadeLayer>

      <FadeLayer
        opacity={whiteOpacity}
        className="pointer-events-none absolute inset-0 bg-gray-0"
      />
    </>
  );
}

export { Section2Scene };
