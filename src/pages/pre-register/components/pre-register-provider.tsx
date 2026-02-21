import * as React from "react";

import { PreRegisterBottomSheet } from "./pre-register-bottom-sheet";

interface PreRegisterContextValue {
  open: () => void;
  close: () => void;
  setContainer: (el: HTMLElement | null) => void;
}

const PreRegisterContext = React.createContext<PreRegisterContextValue | null>(
  null,
);

function PreRegisterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  const value = React.useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      setContainer,
    }),
    [],
  );

  return (
    <PreRegisterContext.Provider value={value}>
      {children}
      <PreRegisterBottomSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        container={container}
        onSubmit={() => {
          setIsOpen(false);
        }}
      />
    </PreRegisterContext.Provider>
  );
}

function usePreRegister() {
  const ctx = React.useContext(PreRegisterContext);
  if (!ctx)
    throw new Error("usePreRegister must be used within PreRegisterProvider");
  return ctx;
}

export { PreRegisterProvider, usePreRegister };
