import { Dog } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`).then((response) => response.json());
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};
const deleteDogRequest = (dog: Dog) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

const patchFavoriteForDog = (dog: Dog, isFavorite: boolean) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
