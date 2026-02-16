import { BrandAssetBox } from "@/components/ui/brand-asset";
import { Stack } from "@/components/ui/flex";
import { Typography } from "@/components/ui/typography";

import { FadeLayer, SpeechBubble } from "./shared";

interface Section4SceneProps {
  opacity: number;
  promptOpacity: number;
  resultOpacity: number;
  section4VoteId?: string;
  isSection5Visible: boolean;
  onVote: (voteId: string) => void;
}

function Section4Scene({
  opacity,
  promptOpacity,
  resultOpacity,
  section4VoteId,
  isSection5Visible,
  onVote,
}: Section4SceneProps) {
  return (
    <FadeLayer opacity={opacity} className="absolute inset-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <FadeLayer
          opacity={promptOpacity}
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: isSection5Visible ? "none" : "auto" }}
        >
          <div className="flex w-full max-w-[375px] flex-col items-center gap-[10px] px-5">
            <SpeechBubble centerArrow>혹시 너도 살까말까 고민해본적 있어?</SpeechBubble>

            <div className="flex h-[240px] w-full max-w-[412px] items-center justify-center">
              <div
                style={{
                  animation: "brandAssetFloatStep 3s ease-in-out infinite",
                  animationDelay: "0s",
                }}
              >
                <BrandAssetBox
                  asset="socks"
                  iconSize={60}
                  className="z-0 -mr-[8px] rounded-[32px]"
                  style={{ width: 108, height: 125, transform: "rotate(16.98deg)" }}
                />
              </div>
              <div
                style={{
                  animation: "brandAssetFloatStep 3s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              >
                <BrandAssetBox
                  asset="tshirt"
                  iconSize={60}
                  className="z-10 rounded-[32px]"
                  style={{ width: 108, height: 125, transform: "rotate(-18.01deg)" }}
                />
              </div>
              <div
                style={{
                  animation: "brandAssetFloatStep 3s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              >
                <BrandAssetBox
                  asset="pants"
                  iconSize={60}
                  className="z-0 -ml-[8px] rounded-[32px]"
                  style={{ width: 108, height: 125, transform: "rotate(12.76deg)" }}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-[10px]">
              <button
                type="button"
                onClick={() => onVote("yes")}
                className="h-[62px] w-full rounded-[15px] border border-gray-300 bg-gray-100 px-4 text-left"
              >
                <Typography variant="s2-semibold" className="text-gray-900">
                  예
                </Typography>
              </button>
              <button
                type="button"
                onClick={() => onVote("no")}
                className="h-[62px] w-full rounded-[15px] border border-gray-300 bg-gray-100 px-4 text-left"
              >
                <Typography variant="s2-semibold" className="text-gray-900">
                  아니오
                </Typography>
              </button>
            </div>
          </div>
        </FadeLayer>

        <FadeLayer
          opacity={resultOpacity}
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: isSection5Visible ? "auto" : "none" }}
        >
          <Stack className="w-full items-center gap-[24px] px-5">
            <SpeechBubble centerArrow>
              {section4VoteId === "yes"
                ? "여기서 고민을 해결해보면 어때?"
                : "소비 정보에도 참고되니 놀러와줘~!"}
            </SpeechBubble>

            <div className="relative w-[220px] -mb-[60px]">
              <img
                src="/example.png"
                alt="살까말까 예시 화면"
                className="h-auto w-full"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[96px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
                }}
              />
            </div>

            <div className="relative w-full pt-[12px]">
              <img
                src="/tobong.png"
                alt="토봉 캐릭터"
                className="absolute z-0"
                style={{ width: 96, right: 15, bottom: 34 }}
              />
              <button
                type="button"
                className="relative z-10 w-full rounded-[18px] border border-gray-100 bg-gray-100 px-6 py-[18px] text-gray-800"
                style={{ boxShadow: "0 4px 60px 0 rgba(52, 71, 99, 0.2)" }}
              >
                <Typography variant="t1-bold" className="text-gray-900">
                  '살까말까' 바로가기
                </Typography>
              </button>
            </div>
          </Stack>
        </FadeLayer>
      </div>
    </FadeLayer>
  );
}

export { Section4Scene };
