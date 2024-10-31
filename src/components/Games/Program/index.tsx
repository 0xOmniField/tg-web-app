import "./index.less";
import ProgramResourceDisplay from "../ProgramResourceDisplay";
import { formatTime } from "@features/creatures/creatures";
import {
  getProgramIconPath,
  getResourceIconPath,
  ProgramModel,
} from "@features/creatures/models";
import { useState } from "react";
const images = import.meta.glob("@assets/games/Animations/Programs/*.png");

const getImageUrl = async (name: string) => {
  const path = `/src/assets/games/Animations/Programs/${name}.png`;
  if (images[path]) {
    const module = await images[path]();
    return module?.default;
  }
  return null;
};

interface Props {
  program: ProgramModel;
  onSelect: () => void;
}

const Program = ({ program, onSelect }: Props) => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  getImageUrl(program.name).then((url) => {
    if (url) setBgImage(url);
  });
  return (
    <div className="program-container" onClick={onSelect}>
      <div className="flex items-baseline justify-between">
        <p className="program-name-text">{program.name}</p>
        <p className="program-time-text">
          {formatTime(program.processingTime)}
        </p>
      </div>
      <div
        className="flex justify-center h-14 items-center mt-1"
        style={{ background: "#3CC9A3", height: 60 }}
      >
        <img src={bgImage} className="program-icon-image" />
      </div>

      <div className="program-resource-grid">
        {program.resources.map((resource, index) => (
          <ProgramResourceDisplay
            key={index}
            iconImagePath={getResourceIconPath(resource.type)}
            amount={resource.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default Program;
