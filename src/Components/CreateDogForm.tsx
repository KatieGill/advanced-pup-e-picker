import { useContext, useState, useRef } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

import { Dog } from "../types";
import toast from "react-hot-toast";
import { DogContext } from "../Providers/DogsProvider";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAllDogs } = useContext(DogContext);
  const dropDown = useRef<HTMLSelectElement>(null);

  const refetchDogData = () => {
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

  const reset = () => {
    setNameInput("");
    setDescriptionInput("");
    setImageInput(defaultSelectedImage);
    if (dropDown.current) dropDown.current.value = defaultSelectedImage;
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postDog({
          name: nameInput,
          image: imageInput,
          description: descriptionInput,
          isFavorite: false,
        });
        reset();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        name="name"
        value={nameInput}
        disabled={isLoading}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        value={descriptionInput}
        disabled={isLoading}
        cols={80}
        rows={10}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        name="picture"
        defaultValue={defaultSelectedImage}
        disabled={isLoading}
        ref={dropDown}
        onChange={(e) => {
          setImageInput(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" disabled={isLoading} />
    </form>
  );
};
