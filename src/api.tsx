import { Dog, dogSchema } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`)
    .then((response) => response.json())
    .then((data) => dogSchema.parse(data));
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => dogSchema.parse(data));
};

const deleteDogRequest = (dog: Dog) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => dogSchema.parse(data));
};

const patchFavoriteForDog = (dog: Dog, isFavorite: boolean) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => dogSchema.parse(data));
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
