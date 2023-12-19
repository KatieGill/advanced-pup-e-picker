import { z } from "zod";
import { Dog, dogSchema } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch data");
      } else {
        return response.json();
      }
    })
    .then((data) => z.array(dogSchema).parse(data));
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to create dog");
      } else {
        return response.json();
      }
    })
    .then((data) => dogSchema.parse(data));
};

const deleteDogRequest = (dog: Dog) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Unable to delete dog");
    }
  });
};

const patchFavoriteForDog = (dog: Dog, isFavorite: boolean) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    body: JSON.stringify({ isFavorite: isFavorite }),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to update favorite");
      } else {
        return response.json();
      }
    })
    .then((data) => dogSchema.parse(data));
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
