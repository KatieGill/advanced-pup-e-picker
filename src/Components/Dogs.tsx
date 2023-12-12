// Right now these dogs are constant, but in reality we should be getting these from our server

import { useContext } from "react";
import { SelectorContext } from "../Providers/SelectorsProvider";
import { DogContext } from "../Providers/DogsProvider";
import { Dog } from "../types";
import { DogCard } from "./DogCard";
import { Requests } from "../api";

export const favoritedDogs = (dogArr: Dog[]) => {
  return dogArr.filter((dog) => dog.isFavorite === true) as unknown as Dog[];
};
export const unfavoritedDogs = (dogArr: Dog[]) => {
  return dogArr.filter((dog) => dog.isFavorite === false) as unknown as Dog[];
};

export const Dogs = () => {
  const { isSelectorActive } = useContext(SelectorContext);
  const { allDogs, setAllDogs } = useContext(DogContext);

  const shouldShowFavoriteDogs = isSelectorActive[0];
  const shouldShowUnfavoritedDogs = isSelectorActive[1];

  const determineDogArray = () => {
    if (shouldShowFavoriteDogs) {
      return favoritedDogs(allDogs);
    } else if (shouldShowUnfavoritedDogs) {
      return unfavoritedDogs(allDogs);
    } else {
      return allDogs;
    }
  };
  const dogArray = determineDogArray();

  const deleteDog = (dogInput: Dog) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogInput.id));
    Requests.deleteDogRequest(dogInput).catch((err) => {
      if (err) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const updateDog = (dogInput: Dog, isFavoriteInput: boolean) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogInput.id ? { ...dog, isFavorite: isFavoriteInput } : dog
      )
    );
    Requests.patchFavoriteForDog(dogInput, isFavoriteInput).catch((err) => {
      if (err) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  return (
    <>
      {dogArray.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog);
            }}
            onHeartClick={() => {
              updateDog(dog, false);
            }}
            onEmptyHeartClick={() => {
              updateDog(dog, true);
            }}
            isLoading={false}
          />
        );
      })}
    </>
  );
};
