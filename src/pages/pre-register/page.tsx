import * as Popover from "@radix-ui/react-popover";

import { Typography } from "@/components/ui/typography";

function PreRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative mx-auto h-screen w-full max-w-[540px] overflow-hidden bg-gray-0">
        <img
          src="/tobong.png"
          alt="토봉 캐릭터 랜딩"
          className="absolute -bottom-[100px] -left-[100px] h-full w-auto max-w-none object-left-top"
        />

        <Popover.Root open>
          <Popover.Anchor className="fixed top-[90px] right-[100px] h-0 w-0" />
          <Popover.Portal>
            <Popover.Content
              side="top"
              align="center"
              sideOffset={0}
              avoidCollisions={false}
              className="z-20 rounded-[16px] px-[12px] py-[7px]"
              style={{
                background: "radial-gradient(#2A3038 0%, #77879E 100%)",
              }}
            >
              <Typography variant="s5-semibold" className="text-gray-0">
                어떤 걸 살지 고민될 땐?
              </Typography>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <Typography
          variant="t1-bold"
          className="absolute bottom-[48px] left-1/2 -translate-x-1/2 text-gray-0 animate-bounce [animation-duration:1.8s]"
        >
          궁금하면 스크롤!!
        </Typography>
      </div>
    </div>
  );
}

export default PreRegisterPage;
