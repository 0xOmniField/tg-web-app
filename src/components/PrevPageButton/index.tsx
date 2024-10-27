import ImageButton from "../ImageButton";
import upButtonImage from "@assets/games/Buttons/PrevPage/up.png";
import upButtonHoverImage from "@assets/games/Buttons/PrevPage/up_hover.png";
import upButtonClickImage from "@assets/games/Buttons/PrevPage/up_click.png";
import "./index.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
  style?: React.CSSProperties | undefined;
}

const PrevPageButton = ({ isDisabled, onClick, style }: Props) => {
  return (
    <div className="prev-page-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={upButtonImage}
        hoverImagePath={upButtonHoverImage}
        clickedImagePath={upButtonClickImage}
        disabledImagePath={upButtonClickImage}
        onClick={onClick}
        style={style}
      />
    </div>
  );
};

export default PrevPageButton;
