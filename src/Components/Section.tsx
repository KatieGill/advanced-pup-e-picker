import { ReactNode } from "react";
import { ActiveComponent } from "../types";
import { useDogsContext } from "../Providers/DogsProvider";

export const Section = ({
  label,
  activeComponent,
  setActiveComponent,
  children,
}: {
  label: string;
  activeComponent: ActiveComponent;
  setActiveComponent: (activeComponent: ActiveComponent) => void;
  children: ReactNode;
}) => {
  const { favoritedDogs, unfavoritedDogs } = useDogsContext();

  const toggleActiveComponent = (component: ActiveComponent) => {
    if (component === activeComponent) {
      setActiveComponent("all");
    } else {
      setActiveComponent(component);
    }
  };

  const generateClassName = (
    activeComponent: ActiveComponent,
    currentComponent: ActiveComponent
  ) => {
    return activeComponent === currentComponent ? "active" : "";
  };

  const favoritedClassName = generateClassName(activeComponent, "favorited");
  const unfavoritedClassName = generateClassName(
    activeComponent,
    "unfavorited"
  );
  const createDogFormClassName = generateClassName(
    activeComponent,
    "create-dog-form"
  );

  const favoritedCount = favoritedDogs.length;
  const unfavoritedCount = unfavoritedDogs.length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${favoritedClassName}`}
            onClick={() => {
              toggleActiveComponent("favorited");
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          <div
            className={`selector ${unfavoritedClassName}`}
            onClick={() => {
              toggleActiveComponent("unfavorited");
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${createDogFormClassName}`}
            onClick={() => {
              toggleActiveComponent("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
