import { useState } from "react";
import "./index.less";

interface Props {
  isDisabled: boolean;
  defaultImagePath: string;
  hoverImagePath: string;
  clickedImagePath: string;
  disabledImagePath: string;
  onClick: (e: any) => void;
  style?: React.CSSProperties | undefined;
}

const ImageButton = ({
  isDisabled,
  defaultImagePath,
  hoverImagePath,
  clickedImagePath,
  disabledImagePath,
  onClick,
  style,
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = () => {
    if (!isDisabled) {
      setIsClicked(true);
    }
  };

  const handleMouseUp = (e: any) => {
    if (!isDisabled) {
      setIsClicked(false);
      onClick(e);
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled) {
      setIsClicked(false);
      setIsHovered(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isDisabled) {
      setIsHovered(true);
    }
  };

  return (
    <button
      className={isDisabled ? "image-button-disabled" : "image-button"}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      disabled={isDisabled}
      onClick={handleMouseUp}
    >
      <img
        style={style}
        src={
          isDisabled
            ? disabledImagePath
            : isClicked
            ? clickedImagePath
            : isHovered
            ? hoverImagePath
            : defaultImagePath
        }
      />
    </button>
  );
};

export default ImageButton;
