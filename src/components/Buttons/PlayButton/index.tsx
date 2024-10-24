import ImageButton from "../../../features/ImageButton";
import playButtonImage from "@assets/Buttons/Play/play.png";
import playButtonHoverImage from "@assets/Buttons/Play/play_hover.png";
import playButtonClickImage from "@assets/Buttons/Play/play_click.png";

interface Props {
  onClick: () => void;
  text?: string;
}

const PlayButton = ({ onClick, text }: Props) => {
  return text ? (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div
        style={{
          textWrap: "nowrap",
          padding: "10px 23px",
          clipPath:
            "polygon(5% 0%, 100% 0%, 100% 10%, 100% 90%, 95% 100%, 10% 100%, 0% 100%, 0% 10%)",
        }}
      >
        {text}
      </div>
    </div>
  ) : (
    <ImageButton
      isDisabled={false}
      defaultImagePath={playButtonImage}
      hoverImagePath={playButtonHoverImage}
      clickedImagePath={playButtonClickImage}
      disabledImagePath={playButtonImage}
      onClick={onClick}
    />
  );
};

export default PlayButton;
