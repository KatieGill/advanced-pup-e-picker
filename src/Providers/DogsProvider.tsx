import toast from "react-hot-toast";
import { Dog } from "../types";
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { Requests } from "../api";

type DogsProvider = {
  allDogs: Dog[];
  setAllDogs: (input: Dog[]) => void;
  isLoading: boolean;
  postDog: (input: Omit<Dog, "id">) => Promise<void>;
  deleteDog: (dogInput: Dog) => void;
  updateDogIsFavorite: (dogInput: Dog, isFavoriteInput: boolean) => void;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
};

const DogsContext = createContext<DogsProvider | undefined>(undefined);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchDogData = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    refetchDogData().catch((error: Error) => {
      console.log(error.message);
    });
  }, []);

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(refetchDogData)
      .then(() => {
        toast.success(`Created ${dog.name}`);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dogInput: Dog) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogInput.id));
    return Requests.deleteDogRequest(dogInput).catch(() => {
      setAllDogs(allDogs);
      toast.error(`Unable to delete ${dogInput.name}`);
    });
  };

  const updateDogIsFavorite = (dogInput: Dog, isFavoriteInput: boolean) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogInput.id ? { ...dog, isFavorite: isFavoriteInput } : dog
      )
    );
    return Requests.patchFavoriteForDog(dogInput, isFavoriteInput).catch(() => {
      setAllDogs(allDogs);
      toast.error(
        `Unable to ${isFavoriteInput ? "favorite" : "unfavorite"} ${
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
        isLoading,
        postDog,
        deleteDog,
        updateDogIsFavorite,
        favoritedDogs,
        unfavoritedDogs,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogsContext = () => {
  const context = useContext(DogsContext);
  if (!context)
    throw new Error(
      "You should never use this outside of the context of a DogsProvider"
    );
  return context;
};
