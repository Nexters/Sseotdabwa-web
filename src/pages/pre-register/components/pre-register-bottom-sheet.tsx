import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Stack } from "@/components/ui/flex";
import { useSnackbar } from "@/components/ui/snackbar";
import { Icon } from "@/components/ui/icon";
import { useRegisterEmail } from "@/api/pre-launch/pre-launch";

interface PreRegisterBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  container?: HTMLElement | null;
}

export function PreRegisterBottomSheet({
  open,
  onOpenChange,
  onSubmit,
  container,
}: PreRegisterBottomSheetProps) {
  const { mutateAsync: registerEmail } = useRegisterEmail();
  const [email, setEmail] = React.useState("");
  const [keyboardInset, setKeyboardInset] = React.useState(0);
  const { open: openSnackbar } = useSnackbar();
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const dragStartY = React.useRef<number | null>(null);
  const dragCurrentY = React.useRef<number>(0);

  const isValid = email.includes("@") && email.includes(".");

  async function handleSubmit() {
    if (!isValid) return;

    registerEmail(
      { data: { email } },
      {
        onSuccess: () => {
          onSubmit();
          openSnackbar({
            message: "제출되었어요! 앱 런칭 후 안내드릴게요 :)",
            icon: (
              <Icon
                icon="circle-checked-solid"
                size={18}
                className="text-green-500"
              />
            ),
            duration: 3000,
          });
          clear();
        },
      },
    );
  }

  const clear = () => {
    setEmail("");
  };

  React.useEffect(() => {
    if (!open) {
      setKeyboardInset(0);
      return;
    }

    const visualViewport = window.visualViewport;

    if (!visualViewport) {
      return;
    }

    const updateKeyboardInset = () => {
      const activeElement = document.activeElement as HTMLElement | null;
      const isTextInputFocused =
        !!activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable);

      if (!isTextInputFocused) {
        setKeyboardInset(0);
        return;
      }

      const viewportBottom = visualViewport.height + visualViewport.offsetTop;
      const obscuredHeight = Math.max(0, window.innerHeight - viewportBottom);

      setKeyboardInset(obscuredHeight);
    };

    updateKeyboardInset();
    visualViewport.addEventListener("resize", updateKeyboardInset);
    visualViewport.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("focusin", updateKeyboardInset);
    window.addEventListener("focusout", updateKeyboardInset);

    return () => {
      visualViewport.removeEventListener("resize", updateKeyboardInset);
      visualViewport.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("focusin", updateKeyboardInset);
      window.removeEventListener("focusout", updateKeyboardInset);
    };
  }, [open]);

  function handleTouchStart(e: React.TouchEvent) {
    dragStartY.current = e.touches[0].clientY;
    dragCurrentY.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta < 0) return;
    dragCurrentY.current = delta;
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  }

  function handleTouchEnd() {
    if (sheetRef.current) {
      sheetRef.current.style.transition = "";
      sheetRef.current.style.transform = "";
    }
    if (dragCurrentY.current > 80) {
      onOpenChange(false);
    }
    dragStartY.current = null;
    dragCurrentY.current = 0;
  }

  const [containerRect, setContainerRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (!container) {
      setContainerRect(null);
      return;
    }

    const update = () => {
      const rect = container.getBoundingClientRect();
      setContainerRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };
    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);
    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [container]);

  const isContained = container != null;

  const overlayStyle: React.CSSProperties =
    isContained && containerRect
      ? {
          position: "fixed",
          top: containerRect.top,
          left: containerRect.left,
          width: containerRect.width,
          height: containerRect.height,
        }
      : {
          position: "fixed",
          top: "calc(env(safe-area-inset-top) * -1)",
          left: 0,
          right: 0,
          bottom: "calc(env(safe-area-inset-bottom) * -1)",
        };

  const contentStyle: React.CSSProperties =
    isContained && containerRect
      ? {
          position: "fixed",
          left: containerRect.left + 14,
          width: containerRect.width - 28,
          bottom: keyboardInset + 10,
        }
      : {
          position: "fixed",
          left: 0,
          right: 0,
          marginLeft: 14,
          marginRight: 14,
          bottom: `calc(${keyboardInset + 10}px + env(safe-area-inset-bottom))`,
        };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal container={container ?? undefined}>
        <DialogPrimitive.Overlay
          className="z-50 bg-black/40 data-[state=open]:animate-[dialog-overlay-in_200ms_ease-out] data-[state=closed]:animate-[dialog-overlay-out_150ms_ease-in]"
          style={overlayStyle}
        />
        <DialogPrimitive.Content
          ref={sheetRef}
          className="z-50 rounded-[26px] bg-white outline-none transition-[bottom] duration-150 ease-out
            data-[state=open]:animate-[sheet-in_300ms_ease-out]
            data-[state=closed]:animate-[sheet-out_200ms_ease-in]"
          style={contentStyle}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 드래그 핸들 */}
          <div
            className="flex justify-center"
            style={{ paddingTop: 10, paddingBottom: 20 }}
          >
            <div className="h-[4px] w-[36px] rounded-full bg-gray-300" />
          </div>

          {/* 콘텐츠 */}
          <div style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 16 }}>
            <Stack gap={24}>
              <Stack gap={8}>
                <DialogPrimitive.Title asChild>
                  <Typography
                    variant="s1-semibold"
                    className="block text-gray-900"
                  >
                    앱 런칭 사전예약하기
                  </Typography>
                </DialogPrimitive.Title>

                <DialogPrimitive.Description asChild>
                  <Typography
                    variant="b4-medium"
                    className="block text-gray-700"
                  >
                    안내드릴 이메일을 작성해주세요!
                  </Typography>
                </DialogPrimitive.Description>
              </Stack>

              <Stack gap={16}>
                <input
                  type="email"
                  placeholder="이메일 작성하기"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[10px] border border-gray-300 bg-gray-0 px-[14px] text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-600"
                  style={{ height: 46 }}
                />

                <Button
                  variant="filled"
                  size="large"
                  fullWidth
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  제출하기
                </Button>
              </Stack>
            </Stack>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
