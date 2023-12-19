import { Dog } from "./types";
const dog = {
  name: "fluffy",
  image: "/assets/cowardly.png",
  description: "so cute",
  isFavorite: false,
};

const getAllDogs = () => {
  return fetch(`http://localhost:3000/dogs`);
};

const postDog = async (dog: Omit<Dog, "id">) => {
  return fetch(`http://localhost:3000/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

const deleteDogRequest = (dogId: number) => {
  return fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "DELETE",
  });
};

const patchFavoriteForDog = (dogId: number, isFavorite: boolean) => {
  return fetch(`http://localhost:3000/dogs/${dogId}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
};

const result = await patchFavoriteForDog(55, false);

console.log(result.ok);
console.log(result.status);
console.log(result.statusText);
console.log(await result.json());
