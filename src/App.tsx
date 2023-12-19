import { useState } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { ActiveComponent } from "./types";

export function App() {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("all");

  const shouldShowForm = activeComponent === "create-dog-form";

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section
        label={"Dogs: "}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      >
        {shouldShowForm ? (
          <CreateDogForm />
        ) : (
          <Dogs activeComponent={activeComponent} />
        )}
      </Section>
    </div>
  );
}
