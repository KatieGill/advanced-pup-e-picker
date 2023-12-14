import { createContext, ReactNode, useState } from "react";

type IsLoadingProvider = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const IsLoadingContext = createContext<IsLoadingProvider>(
  {} as IsLoadingProvider
);

export const IsLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  );
};
