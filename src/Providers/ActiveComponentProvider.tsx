import { ReactNode, createContext, useState } from "react";
import { ActiveComponent } from "../types";

type ActiveComponentProvider = {
  activeComponent: ActiveComponent;
  setActiveComponent: (input: ActiveComponent) => void;
};

export const ActiveComponentContext = createContext<ActiveComponentProvider>(
  {} as ActiveComponentProvider
);

export const ActiveComponentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("all");
  return (
    <ActiveComponentContext.Provider
      value={{ activeComponent, setActiveComponent }}
    >
      {children}
    </ActiveComponentContext.Provider>
  );
};
