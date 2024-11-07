import playButtonImage from "@assets/games/Buttons/Play/play.png";
import playButtonHoverImage from "@assets/games/Buttons/Play/play_hover.png";
import playButtonClickImage from "@assets/games/Buttons/Play/play_click.png";
import ImageButton from "@components/ImageButton";
import "./index.css";
interface Props {
  onClick: () => void;
  text?: string;
}

const PlayButton = ({ onClick, text }: Props) => {
  return text ? (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className="play-button">{text}</div>
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
