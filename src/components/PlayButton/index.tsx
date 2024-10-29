import playButtonImage from "@assets/games/Buttons/Play/play.png";
import playButtonHoverImage from "@assets/games/Buttons/Play/play_hover.png";
import playButtonClickImage from "@assets/games/Buttons/Play/play_click.png";
import ImageButton from "@components/ImageButton";

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