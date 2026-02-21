import * as React from "react";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  icon?: React.ReactNode;
}

function Snackbar({ message, icon, className, ...props }: SnackbarProps) {
  return (
    <div
      data-slot="snackbar"
      className={cn(
        "inline-flex items-center gap-2 rounded-[10px] bg-gray-900 px-[14px] py-[12px]",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <Typography variant="b5-medium" className="text-gray-50">
        {message}
      </Typography>
    </div>
  );
}

interface SnackbarItem {
  id: string;
  message: string;
  icon?: React.ReactNode;
  duration?: number;
}

interface SnackbarContextType {
  open: (options: Omit<SnackbarItem, "id">) => void;
  close: () => void;
  setContainer: (el: HTMLElement | null) => void;
}

const SnackbarContext = React.createContext<SnackbarContextType | null>(null);

function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

interface SnackbarProviderProps {
  children: React.ReactNode;
}

function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [queue, setQueue] = React.useState<SnackbarItem[]>([]);
  const [current, setCurrent] = React.useState<SnackbarItem | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [containerRect, setContainerRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const timeoutRef = React.useRef<number | null>(null);

  const open = React.useCallback((options: Omit<SnackbarItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const item: SnackbarItem = { ...options, id };
    setQueue((prev) => [...prev, item]);
  }, []);

  const close = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  React.useEffect(() => {
    if (!container) {
      setContainerRect(null);
      return;
    }

    const update = () => {
      const rect = container.getBoundingClientRect();
      setContainerRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
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

  React.useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [current, queue]);

  React.useEffect(() => {
    if (current && isVisible) {
      const duration = current.duration ?? 5000;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [current, isVisible]);

  const handleTransitionEnd = React.useCallback(() => {
    if (!isVisible && current) {
      setCurrent(null);
    }
  }, [isVisible, current]);

  const contextValue = React.useMemo(
    () => ({ open, close, setContainer }),
    [open, close],
  );

  const wrapperStyle: React.CSSProperties =
    container && containerRect
      ? {
          position: "fixed",
          top: containerRect.top,
          left: containerRect.left,
          width: containerRect.width,
          height: containerRect.height,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 32,
          pointerEvents: "none",
          zIndex: 50,
        }
      : {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          paddingBottom: 32,
          pointerEvents: "none",
          zIndex: 50,
        };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <div style={wrapperStyle}>
        {current && (
          <Snackbar
            message={current.message}
            icon={current.icon}
            className={cn(
              "pointer-events-auto transition-all duration-300 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
            onTransitionEnd={handleTransitionEnd}
          />
        )}
      </div>
    </SnackbarContext.Provider>
  );
}

export { Snackbar, SnackbarProvider, useSnackbar };
