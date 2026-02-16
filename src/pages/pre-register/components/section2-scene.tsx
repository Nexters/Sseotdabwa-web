import { FeedCard } from "@/components/ui/feed-card";
import { Stack } from "@/components/ui/flex";

import { FadeLayer, SpeechBubble } from "./shared";

interface Section2SceneProps {
  contentOpacity: number;
  whiteOpacity: number;
  selectedVoteId?: string;
  onVote: (optionId: string) => void;
}

function Section2Scene({
  contentOpacity,
  whiteOpacity,
  selectedVoteId,
  onVote,
}: Section2SceneProps) {
  return (
    <>
      <FadeLayer opacity={contentOpacity}>
        <Stack align="center" gap={20} className="relative pt-[35px]">
          <SpeechBubble centerArrow animateOn="visible" isVisible={contentOpacity > 0.01}>
            한 번 투표해볼래?
          </SpeechBubble>
          <img
            src="/tobong.png"
            alt="토봉 캐릭터"
            style={{ width: 82, height: "auto" }}
          />
        </Stack>

        <div className="relative z-0 -mt-[30px] px-5">
          <FeedCard
            content="두쫀쿠 너~무 먹고싶은데 집근처엔 이 가격뿐..."
            image="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
            price={31900}
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
