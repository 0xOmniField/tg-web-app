import "./ProgramFilterButton.css";
import selectingBackground from "@assets/games/backgrounds/tab_select.png";
import background from "@assets/games/backgrounds/tab.png";
import allSelectingBackground from "@assets/games/backgrounds/all_tab_select.png";
import allBackground from "@assets/games/backgrounds/all_tab.png";

interface Props {
  isSelected: boolean;
  text?: string | null;
  iconImagePath?: string | null;
  onClick: () => void;
}

const ProgramFilterButton = ({
  isSelected,
  text = null,
  iconImagePath = null,
  onClick,
}: Props) => {
  return (
    <div className="program-filter-bar-filter-container" onClick={onClick}>
      {text ? (
        <img
          src={allSelectingBackground}
          className="program-filter-bar-filter-selecting-background"
        />
      ) : (
        <img
          src={selectingBackground}
          className="program-filter-bar-filter-selecting-background"
        />
      )}

      {isSelected ? null : text ? (
        <img
          src={allBackground}
          className="program-filter-bar-filter-background"
        />
      ) : (
        <img
          src={background}
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
