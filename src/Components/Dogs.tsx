import { useContext } from "react";
import { ActiveComponentContext } from "../Providers/ActiveComponentProvider";
import { DogsContext } from "../Providers/DogsProvider";
import { Dog } from "../types";
import { DogCard } from "./DogCard";
import { IsLoadingContext } from "../Providers/IsLoadingProvider";

export const Dogs = () => {
  const { allDogs, deleteDog, updateDog, favoritedDogs, unfavoritedDogs } =
    useContext(DogsContext);
  const { activeComponent } = useContext(ActiveComponentContext);
  const { isLoading } = useContext(IsLoadingContext);

  const determineDogArray = (): Dog[] => {
    switch (activeComponent) {
      case "all":
        return allDogs;
      case "favorited":
        return favoritedDogs;
      case "unfavorited":
        return unfavoritedDogs;
      case "create-dog-form":
        return [];
    }
  };
  const dogArray = determineDogArray();

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
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
