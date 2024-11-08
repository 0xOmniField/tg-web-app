import progressBarBackground from "@assets/games/MainMenu/circle_bg.png";
import "./MainMenuProgressBar.css";
import { formatTime } from "@features/creatures/creatures";

interface Props {
  programName: string;
  remainTime: number;
  progress: number;
  iconPath: string;
  isCreating: boolean;
  showAnimation: boolean;
  onClick?: (e: any) => void;
}

const MainMenuProgressBar = ({
  programName,
  remainTime,
  progress,
  iconPath,
  isCreating,
  showAnimation,
  onClick,
}: Props) => {
  return (
    <div className="main-progress-bar-container" onClick={onClick}>
      <img
        src={progressBarBackground}
        className="main-progress-bar-background"
      />
      {iconPath && (
        <img
          src={iconPath}
          className={
            showAnimation
              ? "main-progress-bot-creating-animation-image"
              : isCreating
              ? "main-progress-bot-creating-image"
              : "main-progress-bot-image"
          }
        />
      )}
      <p className="main-progress-bar-program-name-text">{programName}</p>
      <p className="main-progress-bar-program-processing-time-text">
        {formatTime(remainTime)}
      </p>
      <div className="main-progress-container">
        <div
          className="main-progress-sector"
          style={{ height: `${progress}%` }}
        >
          <div className="main-progress-sector-top" />
          <div className="main-progress-sector-repeat" />
        </div>
      </div>
    </div>
  );
};

export default MainMenuProgressBar;
