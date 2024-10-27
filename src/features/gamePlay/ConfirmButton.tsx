import ImageButton from "@components/ImageButton";
import confirmButtonImage from "@assets/games/Buttons/Confirm/confirm.png";
import confirmButtonHoverImage from "@assets/games/Buttons/Confirm/confirm_hover.png";
import confirmButtonClickImage from "@assets/games/Buttons/Confirm/confirm_click.png";
import "./ConfirmButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const ConfirmButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="confirm-button">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={confirmButtonImage}
        hoverImagePath={confirmButtonHoverImage}
        clickedImagePath={confirmButtonClickImage}
        disabledImagePath={confirmButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ConfirmButton;
