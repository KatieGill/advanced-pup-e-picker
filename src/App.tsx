import { useContext } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { SelectorContext } from "./Providers/SelectorsProvider";
import { DogProvider } from "./Providers/DogsProvider";

export function App() {
  const { isSelectorActive } = useContext(SelectorContext);
  const shouldShowForm = isSelectorActive[2];
  return (
    <DogProvider>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          {shouldShowForm ? <CreateDogForm /> : <Dogs />}
        </Section>
      </div>
    </DogProvider>
  );
}
