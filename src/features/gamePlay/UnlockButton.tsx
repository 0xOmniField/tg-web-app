import ImageButton from "@components/ImageButton";
import unlockButtonImage from "@assets/games/Buttons/Unlock/unlock.png";
import unlockButtonHoverImage from "@assets/games/Buttons/Unlock/unlock_hover.png";
import unlockButtonClickImage from "@assets/games/Buttons/Unlock/unlock_click.png";
import "./UnlockButton.css";

interface Props {
  isDisabled: boolean;
  onClick: (e: any) => void;
}

const UnlockButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="unlock-button">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={unlockButtonImage}
        hoverImagePath={unlockButtonHoverImage}
        clickedImagePath={unlockButtonClickImage}
        disabledImagePath={unlockButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UnlockButton;
