import { Dog } from "../types";
import { ReactNode, createContext, useState, useEffect } from "react";
import { Requests } from "../api";

type TDogsProvider = {
  allDogs: Dog[];
  setAllDogs: (input: Dog[]) => void;
};

export const DogContext = createContext<TDogsProvider>({} as TDogsProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  return (
    <DogContext.Provider value={{ allDogs, setAllDogs }}>
      {children}
    </DogContext.Provider>
  );
};
