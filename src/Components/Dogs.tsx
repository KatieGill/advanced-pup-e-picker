import { ActiveComponent, Dog } from "../types";
import { DogCard } from "./DogCard";
import { useDogsContext } from "../Providers/DogsProvider";

export const Dogs = ({
  activeComponent,
}: {
  activeComponent: ActiveComponent;
}) => {
  const {
    allDogs,
    deleteDog,
    updateDogIsFavorite,
    favoritedDogs,
    unfavoritedDogs,
    isLoading,
  } = useDogsContext();

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
              updateDogIsFavorite(dog, false);
            }}
            onEmptyHeartClick={() => {
              updateDogIsFavorite(dog, true);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
