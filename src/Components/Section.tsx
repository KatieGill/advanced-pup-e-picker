import { ReactNode, useContext, useEffect } from "react";
import { SelectorContext } from "../Providers/SelectorsProvider";
import { TSelectorToggle } from "../types";
import { DogContext } from "../Providers/DogsProvider";
import { Requests } from "../api";
import { favoritedDogs, unfavoritedDogs } from "./Dogs";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { isSelectorActive, setIsSelectorActive } = useContext(SelectorContext);
  const { allDogs, setAllDogs } = useContext(DogContext);

  const toggleActiveClassName = (index: number) =>
    isSelectorActive[index] ? "active" : "";

  const setActiveSelector = (index: number) => {
    const newState = isSelectorActive.map((activeState, activeStateIndex) => {
      const newActiveState = activeState === true ? false : true;
      return activeStateIndex === index ? newActiveState : false;
    }) as unknown as TSelectorToggle;
    setIsSelectorActive(newState);
  };

  const refetchDogData = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    refetchDogData().catch(console.log);
  }, []);

  const favoritedCount = favoritedDogs(allDogs).length;
  const unfavoritedCount = unfavoritedDogs(allDogs).length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${toggleActiveClassName(0)}`}
            onClick={() => {
              setActiveSelector(0);
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${toggleActiveClassName(1)}`}
            onClick={() => {
              setActiveSelector(1);
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${toggleActiveClassName(2)}`}
            onClick={() => {
              setActiveSelector(2);
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
