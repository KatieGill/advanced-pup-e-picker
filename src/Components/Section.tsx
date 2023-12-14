import { ReactNode, useContext } from "react";
import { ActiveComponentContext } from "../Providers/ActiveComponentProvider";
import { ActiveComponent } from "../types";
import { DogsContext } from "../Providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { activeComponent, setActiveComponent } = useContext(
    ActiveComponentContext
  );
  const { favoritedDogs, unfavoritedDogs } = useContext(DogsContext);

  const determineActiveComponent = (component: ActiveComponent) => {
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
              determineActiveComponent("favorited");
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          <div
            className={`selector ${unfavoritedClassName}`}
            onClick={() => {
              determineActiveComponent("unfavorited");
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${createDogFormClassName}`}
            onClick={() => {
              determineActiveComponent("create-dog-form");
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
