import toast from "react-hot-toast";
import { Dog, dogSchema } from "../types";
import { ReactNode, createContext, useContext, useState } from "react";
import { Requests } from "../api";
import { IsLoadingContext } from "./IsLoadingProvider";

type DogsProvider = {
  allDogs: Dog[];
  setAllDogs: (input: Dog[]) => void;
  postDog: (input: Omit<Dog, "id">) => void;
  deleteDog: (dogInput: Dog) => void;
  updateDog: (dogInput: Dog, isFavoriteInput: boolean) => void;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
};

export const DogsContext = createContext<DogsProvider>({} as DogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const { setIsLoading } = useContext(IsLoadingContext);

  const refetchDogData = (): Promise<Dog[] | void> => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(refetchDogData)
      .then(() => {
        toast.success(`Created ${dog.name}`);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dogInput: Dog) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogInput.id));
    Requests.deleteDogRequest(dogInput).catch(() => {
      setAllDogs(allDogs);
      toast.error(`Unable to delete ${dogInput.name}`);
    });
  };

  const updateDog = (dogInput: Dog, isFavoriteInput: boolean) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogInput.id ? { ...dog, isFavorite: isFavoriteInput } : dog
      )
    );
    Requests.patchFavoriteForDog(dogInput, isFavoriteInput).catch(() => {
      setAllDogs(allDogs);
      toast.error(
        `Unable to ${isFavoriteInput === true ? "favorite" : "unfavorite"} ${
          dogInput.name
        }`
      );
    });
  };

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite === true);
  const unfavoritedDogs = allDogs.filter((dog) => dog.isFavorite === false);

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        setAllDogs,
        postDog,
        deleteDog,
        updateDog,
        favoritedDogs,
        unfavoritedDogs,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
