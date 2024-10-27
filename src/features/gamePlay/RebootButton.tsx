import ImageButton from "@components/ImageButton";
import rebootButtonImage from "@assets/games/Buttons/Reboot/reboot.png";
import rebootButtonHoverImage from "@assets/games/Buttons/Reboot/reboot_hover.png";
import rebootButtonClickImage from "@assets/games/Buttons/Reboot/reboot_click.png";
import "./RebootButton.css";

interface Props {
  onClick: () => void;
}

const RebootButton = ({ onClick }: Props) => {
  return (
    <div className="reboot-button">
      <ImageButton
        isDisabled={false}
        defaultImagePath={rebootButtonImage}
        hoverImagePath={rebootButtonHoverImage}
        clickedImagePath={rebootButtonClickImage}
        disabledImagePath={rebootButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default RebootButton;
