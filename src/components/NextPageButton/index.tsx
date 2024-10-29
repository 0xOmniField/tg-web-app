import ImageButton from "../ImageButton";
import downButtonImage from "@assets/games/Buttons/NextPage/down.png";
import downButtonHoverImage from "@assets/games/Buttons/NextPage/down_hover.png";
import downButtonClickImage from "@assets/games/Buttons/NextPage/down_click.png";
import "./index.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
  style?: React.CSSProperties | undefined;
}

const NextPageButton = ({ isDisabled, onClick, style }: Props) => {
  return (
    <div className="next-page-button-scale" style={style}>
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={downButtonImage}
        hoverImagePath={downButtonHoverImage}
        clickedImagePath={downButtonClickImage}
        disabledImagePath={downButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default NextPageButton;
