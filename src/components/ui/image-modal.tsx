import * as React from "react";

import { CloseButton } from "@/components/ui/close-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageModalState {
  src: string;
  alt?: string;
}

interface ImageModalContextType {
  open: (src: string, alt?: string) => void;
  close: () => void;
}

const ImageModalContext = React.createContext<ImageModalContextType | null>(
  null,
);

function useOpenImageModal() {
  const context = React.useContext(ImageModalContext);
  if (!context) {
    throw new Error(
      "useOpenImageModal must be used within an ImageModalProvider",
    );
  }
  return context;
}

interface ImageModalProviderProps {
  children: React.ReactNode;
}

function ImageModalProvider({ children }: ImageModalProviderProps) {
  const [data, setData] = React.useState<ImageModalState | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback((src: string, alt?: string) => {
    setData({ src, alt });
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenChange = React.useCallback((nextOpen: boolean) => {
    setIsOpen(nextOpen);
    if (!nextOpen) {
      setData(null);
    }
  }, []);

  const value = React.useMemo(() => ({ open, close }), [open, close]);

  return (
    <ImageModalContext.Provider value={value}>
      {children}

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogPortal>
          <DialogOverlay className="bg-black/95" />
          <DialogContent className="bg-transparent p-0 shadow-none">
            <DialogTitle className="sr-only">확대 이미지 보기</DialogTitle>

            <div className="absolute right-[60px] top-[60px] z-10 transition-[top,right] duration-200 ease-out max-[700px]:right-[10px] max-[700px]:top-[10px]">
              <DialogClose asChild>
                <CloseButton />
              </DialogClose>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center max-[700px]:px-[10px]">
              {data && (
                <img
                  src={data.src}
                  alt={data.alt ?? "Feed content enlarged"}
                  className="pointer-events-auto block h-[680px] w-auto max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </ImageModalContext.Provider>
  );
}

export { ImageModalProvider, useOpenImageModal };
