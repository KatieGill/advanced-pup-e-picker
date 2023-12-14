import { Dog } from "./types";

export const favoritedDogs = (dogArr: Dog[]) => {
  return dogArr.filter((dog) => dog.isFavorite === true) as unknown as Dog[];
};
export const unfavoritedDogs = (dogArr: Dog[]) => {
  return dogArr.filter((dog) => dog.isFavorite === false) as unknown as Dog[];
};

