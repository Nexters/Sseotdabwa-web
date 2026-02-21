import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";

import { Typography } from "@/components/ui/typography";

import { FadeLayer, SpeechBubble } from "./shared";
import { Group } from "@/components/ui/flex";
import tobong4 from "@/assets/lottie/토봉4.json";

function TobongLottie() {
  const { View } = useLottie({
    animationData: tobong4,
    loop: true,
    autoplay: true,
  });
  return <div style={{ width: 96, height: 96 }}>{View}</div>;
}

interface Section4SceneProps {
  opacity: number;
  promptOpacity: number;
  resultOpacity: number;
  section4VoteId?: string;
  isSection5Visible: boolean;
  onVote: (voteId: string) => void;
  transitionMs?: number;
  containerWidth: number;
}

function Section4Scene({
  opacity,
  promptOpacity,
  resultOpacity,
  section4VoteId,
  isSection5Visible,
  onVote,
  transitionMs = 340,
  containerWidth,
}: Section4SceneProps) {
  const px = containerWidth > 375 ? 40 : 20;
  return (
    <FadeLayer
      opacity={opacity}
      transitionMs={transitionMs}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <FadeLayer
          opacity={promptOpacity}
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: isSection5Visible ? "none" : "auto" }}
        >
          <div className="flex w-full flex-col items-center gap-[10px]">
            <SpeechBubble
              centerArrow
              animateOn="visible"
              isVisible={opacity > 0.01 && promptOpacity > 0.01}
            >
              혹시 너도 살까말까 고민해본적 있어?
            </SpeechBubble>

            <div className="flex py-[62px] w-full items-center justify-center">
              <div
                style={{
                  animation: "brandAssetFloat 3s ease-in-out infinite",
                  animationDelay: "0s",
                  marginRight: -10,
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 87,
                    height: 101,
                    transform: "rotate(-16.98deg)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 26,
                      background: "#fff",
                      boxShadow: "0 8px 56px 0 rgba(215, 220, 225, 0.5)",
                    }}
                  />
                  <img
                    src="/socks.png"
                    alt="양말"
                    style={{
                      position: "relative",
                      width: 87,
                      height: 101,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  animation: "brandAssetFloat 3s ease-in-out infinite",
                  animationDelay: "1s",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 87,
                    height: 101,
                    transform: "rotate(18.01deg)",
                  }}
                >
                  <div
                    style={{
                      margin: 1,
                      position: "absolute",
                      inset: 0,
                      borderRadius: 26,
                      background: "#fff",
                      boxShadow: "0 8px 56px 0 rgba(215, 220, 225, 0.5)",
                    }}
                  />
                  <img
                    src="/tshirt.png"
                    alt="옷"
                    style={{
                      position: "relative",
                      width: 87,
                      height: 101,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  animation: "brandAssetFloat 3s ease-in-out infinite",
                  animationDelay: "2s",
                  marginLeft: -10,
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 87,
                    height: 101,
                    transform: "rotate(-6.22deg)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 26,
                      background: "#fff",
                      boxShadow: "0 8px 56px 0 rgba(215, 220, 225, 0.5)",
                    }}
                  />
                  <img
                    src="/pants.png"
                    alt="바지"
                    style={{
                      position: "relative",
                      width: 87,
                      height: 101,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="flex w-full flex-col gap-[10px]"
              style={{ paddingInline: px }}
            >
              <button
                type="button"
                onClick={() => onVote("yes")}
                className="w-full rounded-[15px] border border-gray-300 px-[15px] py-[14px] hover:bg-gray-100 text-left transition-all delay-200 active:scale-99"
              >
                <Typography variant="s2-semibold" className="text-gray-900">
                  응!
                </Typography>
              </button>
              <button
                type="button"
                onClick={() => onVote("no")}
                className="w-full rounded-[15px] border border-gray-300 px-[15px] py-[14px] hover:bg-gray-100 text-left transition-all delay-200 active:scale-99"
              >
                <Typography variant="s2-semibold" className="text-gray-900">
                  아니..
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
          <div
            className="flex w-full flex-col items-center"
            style={{ paddingBlock: 40, paddingInline: px }}
          >
            <SpeechBubble
              centerArrow
              animateOn="visible"
              isVisible={opacity > 0.01 && resultOpacity > 0.01}
            >
              {section4VoteId === "yes"
                ? "여기서 고민을 해결해보면 어때?"
                : "소비 정보에도 참고되니 놀러와줘~!"}
            </SpeechBubble>

            <div
              className="relative w-[220px] -mb-[60px]"
              style={{ marginTop: 11 }}
            >
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
              <div className="absolute z-0" style={{ right: 15, bottom: 34 }}>
                <TobongLottie />
              </div>
              <Link
                to="/"
                className="relative z-10 block w-full px-6 py-[18px] text-center"
                style={{
                  borderRadius: 15,
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 4px 60px 0 rgba(52, 71, 99, 0.2)",
                }}
              >
                <Group align="center" justify="center" gap={6}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.3035 8.13676C4.46067 7.98496 4.67117 7.90096 4.88967 7.90286C5.10817 7.90476 5.31718 7.9924 5.47168 8.14691C5.62619 8.30142 5.71383 8.51043 5.71573 8.72892C5.71763 8.94742 5.63363 9.15792 5.48183 9.31509L4.2035 10.5934C3.53437 11.2889 3.16476 12.219 3.17411 13.1841C3.18345 14.1491 3.57099 15.0719 4.25345 15.7543C4.93592 16.4367 5.85883 16.824 6.82386 16.8332C7.78888 16.8424 8.719 16.4727 9.41433 15.8034L10.6927 14.5259C10.8498 14.3741 11.0603 14.2901 11.2788 14.292C11.4973 14.2939 11.7063 14.3816 11.8608 14.5361C12.0154 14.6906 12.103 14.8996 12.1049 15.1181C12.1068 15.3366 12.0228 15.5471 11.871 15.7043L10.5927 16.9826C9.58519 17.9674 8.23 18.5153 6.82114 18.5073C5.41229 18.4992 4.06343 17.936 3.06726 16.9397C2.07109 15.9434 1.50796 14.5945 1.50008 13.1856C1.4922 11.7768 2.0402 10.4216 3.02517 9.41426L4.3035 8.13676Z"
                      fill="#2A3038"
                    />
                    <path
                      d="M11.9708 6.85866C12.1272 6.70241 12.3392 6.61467 12.5603 6.61475C12.7813 6.61482 12.9933 6.70271 13.1496 6.85908C13.3058 7.01545 13.3936 7.22748 13.3935 7.44854C13.3934 7.6696 13.3055 7.88158 13.1492 8.03783L8.03832 13.1487C7.88206 13.305 7.67009 13.3929 7.44903 13.393C7.22797 13.3931 7.01594 13.3053 6.85957 13.1491C6.7032 12.9928 6.61531 12.7809 6.61523 12.5598C6.61516 12.3387 6.7029 12.1267 6.85915 11.9703L11.9708 6.85866Z"
                      fill="#2A3038"
                    />
                    <path
                      d="M13.1979 1.4585C14.256 1.45877 15.2902 1.77271 16.1699 2.36063C17.0495 2.94856 17.7351 3.78407 18.14 4.76157C18.545 5.73907 18.651 6.81467 18.4447 7.85241C18.2385 8.89016 17.7292 9.84346 16.9813 10.5918L15.7038 11.871C15.5466 12.0228 15.3361 12.1068 15.1176 12.1049C14.8991 12.103 14.6901 12.0154 14.5356 11.8608C14.3811 11.7063 14.2934 11.4973 14.2915 11.2788C14.2896 11.0603 14.3736 10.8498 14.5254 10.6927L15.8029 9.41433C16.4936 8.72317 16.8816 7.78603 16.8816 6.80891C16.8816 5.83179 16.4936 4.89465 15.8029 4.2035C15.4609 3.8612 15.0547 3.58965 14.6077 3.40439C14.1606 3.21912 13.6814 3.12377 13.1975 3.12377C12.7136 3.12377 12.2344 3.21912 11.7874 3.40439C11.3403 3.58965 10.9342 3.8612 10.5921 4.2035L9.3146 5.48183C9.15744 5.63363 8.94693 5.71762 8.72844 5.71572C8.50994 5.71383 8.30093 5.62619 8.14642 5.47168C7.99191 5.31717 7.90427 5.10816 7.90238 4.88966C7.90048 4.67117 7.98447 4.46066 8.13627 4.3035L9.41377 3.02516C9.91063 2.52839 10.5005 2.13435 11.1496 1.86554C11.7988 1.59673 12.4945 1.45841 13.1971 1.4585"
                      fill="#2A3038"
                    />
                  </svg>
                  <Typography variant="t1-bold" className="text-gray-900">
                    '살까말까' 바로가기
                  </Typography>
                </Group>
              </Link>
            </div>
          </div>
        </FadeLayer>
      </div>
    </FadeLayer>
  );
}

export { Section4Scene };
