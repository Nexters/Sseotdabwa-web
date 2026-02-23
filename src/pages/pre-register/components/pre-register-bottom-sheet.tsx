import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { useForm } from "react-hook-form";

import { ApiError } from "@/api/api-error";
import { useRegisterEmail } from "@/api/pre-launch/pre-launch";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/flex";
import { Icon } from "@/components/ui/icon";
import { useSnackbar } from "@/components/ui/snackbar";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface PreRegisterBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  container?: HTMLElement | null;
}

interface EmailFormValues {
  email: string;
}

export function PreRegisterBottomSheet({
  open,
  onOpenChange,
  onSubmit,
  container,
}: PreRegisterBottomSheetProps) {
  const { mutateAsync: registerEmail } = useRegisterEmail();
  const [keyboardInset, setKeyboardInset] = React.useState(0);
  const { open: openSnackbar } = useSnackbar();
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const dragStartY = React.useRef<number | null>(null);
  const dragCurrentY = React.useRef<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<EmailFormValues>({ defaultValues: { email: "" } });

  const email = watch("email");
  const isValid = email.includes("@") && email.includes(".");

  async function onValid({ email }: EmailFormValues) {
    await registerEmail(
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
                className="text-green-200"
              />
            ),
            duration: 3000,
          });
          reset();
        },
        onError: (err) => {
          const message =
            ApiError.isApiError(err) && err.errorCode === "PRELAUNCH_001"
              ? "이미 신청한 이메일입니다."
              : "오류가 발생했어요. 다시 시도해주세요.";
          setError("email", { message });
        },
      },
    );
  }

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

  const getRect = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
  };

  const [containerRect, setContainerRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(() => (container ? getRect(container) : null));

  React.useEffect(() => {
    if (!container) {
      setContainerRect(null);
      return;
    }

    const update = () => {
      setContainerRect(getRect(container));
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

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
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
                    앱 런칭 사전 예약하기
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

              <form onSubmit={handleSubmit(onValid)}>
                <Stack gap={16}>
                  <Stack gap={8}>
                    <input
                      type="email"
                      placeholder="이메일 작성하기"
                      className={cn([
                        "w-full rounded-[10px] border border-gray-300 bg-gray-0 px-[14px] text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-500",
                        errors.email?.message
                          ? "border-red-100 focus:border-red-500"
                          : "",
                      ])}
                      style={{ height: 46 }}
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <Typography
                        variant="b6-medium"
                        className="text-red-100 pl-[6px]"
                      >
                        {errors.email.message}
                      </Typography>
                    )}
                  </Stack>

                  <Button
                    type="submit"
                    variant="filled"
                    size="large"
                    fullWidth
                    disabled={!isValid || isSubmitting}
                  >
                    제출하기
                  </Button>
                </Stack>
              </form>
            </Stack>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
