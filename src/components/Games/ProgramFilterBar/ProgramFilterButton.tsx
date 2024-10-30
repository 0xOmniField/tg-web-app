import "./ProgramFilterButton.css";
import middleSelectingBackground from "@assets/games/backgrounds/middle_tab_select.png";
import middleBackground from "@assets/games/backgrounds/middle_tab.png";
import leftSelectingBackground from "@assets/games/backgrounds/left_tab_select.png";
import leftBackground from "@assets/games/backgrounds/left_tab.png";
import rightSelectingBackground from "@assets/games/backgrounds/right_tab_select.png";
import rightBackground from "@assets/games/backgrounds/right_tab.png";

interface Props {
  isSelected: boolean;
  text?: string | null;
  iconImagePath?: string | null;
  onClick: () => void;
  position: "left" | "right" | "middle";
}
const bgMap = {
  middle: middleBackground,
  left: leftBackground,
  right: rightBackground,
  middleSelecting: middleSelectingBackground,
  leftSelecting: leftSelectingBackground,
  rightSelecting: rightSelectingBackground,
};
const ProgramFilterButton = ({
  isSelected,
  text = null,
  iconImagePath = null,
  position,
  onClick,
}: Props) => {
  return (
    <div className="program-filter-bar-filter-container" onClick={onClick}>
      {isSelected ? (
        <img
          src={bgMap[`${position}Selecting`]}
          className="program-filter-bar-filter-selecting-background"
        />
      ) : (
        <img
          src={bgMap[`${position}`]}
          className="program-filter-bar-filter-background"
        />
      )}
      {text && <p className="program-filter-bar-filter-text">{text}</p>}
      {iconImagePath && (
        <img src={iconImagePath} className="program-filter-bar-filter-icon" />
      )}
    </div>
  );
};

export default ProgramFilterButton;
