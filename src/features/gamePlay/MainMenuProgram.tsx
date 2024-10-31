import "./MainMenuProgram.css";
import { ProgramComponent, ProgramModel } from "@features/creatures/models";

import {
  selectIsSelectingUIState,
  selectIsLoading,
} from "@features/automata/propertiesSlice";
import { setSelectingProgramIndex } from "@features/creatures/creatures";
import { useAppDispatch, useAppSelector } from "@app/hooks";

interface Props {
  isCurrent: boolean;
  isStop: boolean;
  order: number;
  program: ProgramModel | null;
  showingAnimation: boolean;
}

const MainMenuProgram = ({
  isCurrent,
  isStop,
  order,
  program,
  showingAnimation,
}: Props) => {
  const dispatch = useAppDispatch();
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isLoading = useAppSelector(selectIsLoading);

  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const radius = 30;
  const yPosition = 50 - Math.sin((angle * Math.PI) / 180) * radius;
  const xPosition = 50 + Math.cos((angle * Math.PI) / 180) * radius;
  const onClick = () => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setSelectingProgramIndex({ selectingIndex: order }));
    }
  };

  return (
    <div
      className="main-bot-program-container"
      onClick={onClick}
      style={{
        top: `${yPosition}%`,
        left: `${xPosition}%`,
      }}
    >
      <div
        key={program?.index}
        className={
          showingAnimation
            ? "main-bot-program-animation-container"
            : "main-bot-program-normal-container"
        }
      >
        {/* {getProgramComponent(program, isCurrent && !isStop)} */}
        <ProgramComponent program={program} showAnimation={false} />
      </div>
    </div>
  );
};

export default MainMenuProgram;
