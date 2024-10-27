import "./index.less";
import ProgramResourceDisplay from "../ProgramResourceDisplay";
import { formatTime } from "@features/creatures/creatures";
import {
  getProgramIconPath,
  getResourceIconPath,
  ProgramModel,
} from "@features/creatures/models";

interface Props {
  program: ProgramModel;
  onSelect: () => void;
}

const Program = ({ program, onSelect }: Props) => {
  return (
    <div className="program-container" onClick={onSelect}>
      <div className="flex items-baseline justify-between">
        <p className="program-name-text">{program.name}</p>
        <p className="program-time-text">
          {formatTime(program.processingTime)}
        </p>
      </div>
      <div className="flex justify-center h-14 items-center">
        <img
          src={getProgramIconPath(program.type)}
          className="program-icon-image"
        />
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
