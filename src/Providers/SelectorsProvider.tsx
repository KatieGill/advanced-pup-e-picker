import { ReactNode, createContext, useState } from "react";
import { TSelectorToggle } from "../types";

type TSelectorsProvider = {
  isSelectorActive: TSelectorToggle;
  setIsSelectorActive: (input: TSelectorToggle) => void;
};

export const SelectorContext = createContext<TSelectorsProvider>(
  {} as TSelectorsProvider
);

export const SelectorProvider = ({ children }: { children: ReactNode }) => {
  const [isSelectorActive, setIsSelectorActive] = useState<TSelectorToggle>([
    false,
    false,
    false,
  ]);
  return (
    <SelectorContext.Provider value={{ isSelectorActive, setIsSelectorActive }}>
      {children}
    </SelectorContext.Provider>
  );
};
