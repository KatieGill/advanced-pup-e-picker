import { useState, useRef } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogsContext } from "../Providers/DogsProvider";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);
  const { postDog, isLoading } = useDogsContext();
  const dropDown = useRef<HTMLSelectElement>(null);

  const resetState = () => {
    setNameInput("");
    setDescriptionInput("");
    setImageInput(defaultSelectedImage);
    {
      /*Return select to default */
    }
    if (dropDown.current) dropDown.current.value = defaultSelectedImage;
  };

  return (
    <form
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postDog({
          name: nameInput,
          image: imageInput,
          description: descriptionInput,
          isFavorite: false,
        })
          .then(resetState)
          .catch(() => toast.error(`Unable to create ${nameInput}`));
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
