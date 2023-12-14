import { useContext } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { ActiveComponentContext } from "./Providers/ActiveComponentProvider";
import { DogsContext } from "./Providers/DogsProvider";
import { useEffect } from "react";
import { Requests } from "./api";
import { dogSchema } from "./types";

export function App() {
  const { activeComponent } = useContext(ActiveComponentContext);
  const { setAllDogs } = useContext(DogsContext);

  useEffect(() => {
    const refetchDogData = () => {
      return Requests.getAllDogs()
        .then((data) => dogSchema.parse(data))
        .then(setAllDogs);
    };
    refetchDogData().catch(() => {
      throw new Error("unable to fetch data");
    });
  }, [setAllDogs]);

  const shouldShowForm = activeComponent === "create-dog-form";

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {shouldShowForm ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
