import "./index.less";
import { useState } from "react";
import { useAppSelector } from "@app/hooks";
import { selectGlobalTimer } from "@features/automata/propertiesSlice";

import MainMenu from "./MainMenu";
import Command from "./Command";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

const GamePlay: React.FC = () => {
  const globalTimer = useAppSelector(selectGlobalTimer);
  const [localTimer, setLocalTimer] = useState(globalTimer);

  return (
    <div className="main">
      <div className="header" />
      <div className="content">
        <LeftMenu localTimer={localTimer} />
        <MainMenu localTimer={localTimer} />
        <RightMenu />

        <Command />
      </div>
    </div>
  );
};

export default GamePlay;
