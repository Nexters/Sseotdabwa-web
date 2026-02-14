import * as React from "react";

import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import { Flex } from "./flex";

interface OpenQRModalOptions {
  qrImageSrc?: string;
  onClose?: () => void;
}

interface QRModalContextType {
  open: (options: OpenQRModalOptions) => void;
  close: () => void;
}

interface QRModalState extends OpenQRModalOptions {}

const DEFAULT_QR_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none"><rect width="180" height="180" fill="#DDDEE4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="#565D6D">QR 이미지</text></svg>`,
  );
const QR_MODAL_TITLE = "스토어에서 앱을 다운로드 해보세요!";
const QR_MODAL_BUTTON_LABEL = "링크 연결";
const QR_MODAL_LINK_URL = "https://sseotdabwa.com";

const QRModalContext = React.createContext<QRModalContextType | null>(null);

function useOpenQRModal() {
  const context = React.useContext(QRModalContext);
  if (!context) {
    throw new Error("useOpenQRModal must be used within a QRModalProvider");
  }
  return context;
}

interface QRModalProviderProps {
  children: React.ReactNode;
}

function QRModalProvider({ children }: QRModalProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState<QRModalState | null>(null);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = React.useCallback((options?: OpenQRModalOptions) => {
    setData(options ?? {});
    setIsOpen(true);
  }, []);

  const onOpenChange = React.useCallback((nextOpen: boolean) => {
    setIsOpen(nextOpen);
    if (!nextOpen) {
      data?.onClose?.();
      setData(null);
    }
  }, [data]);

  const handleAction = React.useCallback(() => {
    window.open(QR_MODAL_LINK_URL, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }, []);

  const contextValue = React.useMemo(() => ({ open, close }), [open, close]);

  return (
    <QRModalContext.Provider value={contextValue}>
      {children}

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay className="bg-gray-black/70" />
          <DialogContent className="bg-transparent p-0 shadow-none">
            <DialogTitle className="sr-only">QR 모달</DialogTitle>

            {data && (
              <div className="absolute inset-0 flex items-center justify-center px-5">
                <Flex
                  direction="col"
                  gap={32}
                  className="relative w-full max-w-[400px] rounded-[18px] bg-gray-0 px-5 pb-5 pt-[54px]"
                >
                  <div className="absolute right-[18px] top-[18px]">
                    <DialogClose asChild>
                      <CloseButton
                        size={36}
                        className="bg-gray-200 text-gray-900 hover:bg-gray-300"
                        iconClassName="text-gray-900"
                      />
                    </DialogClose>
                  </div>

                  <Flex direction="col" align="center" gap={16}>
                    <Typography
                      variant="h3-bold"
                      className="w-full text-gray-900 text-center"
                    >
                      {QR_MODAL_TITLE}
                    </Typography>

                    <img
                      src={data.qrImageSrc ?? DEFAULT_QR_IMAGE}
                      alt="QR 코드"
                      className="size-[200px] object-contain"
                    />
                  </Flex>

                  <Button
                    variant="filled"
                    size="large"
                    fullWidth
                    onClick={handleAction}
                  >
                    {QR_MODAL_BUTTON_LABEL}
                  </Button>
                </Flex>
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </QRModalContext.Provider>
  );
}

export { QRModalProvider, useOpenQRModal };
export type { OpenQRModalOptions };
