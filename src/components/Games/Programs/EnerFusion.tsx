import { useEffect } from "react";

import image_00 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_00.png";
import image_01 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_01.png";
import image_02 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_02.png";
import image_03 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_03.png";
import image_04 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_04.png";
import image_05 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_05.png";
import image_06 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_06.png";
import image_07 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_07.png";
import image_08 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_08.png";
import image_09 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_09.png";
import image_10 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_10.png";
import image_11 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_11.png";
import image_12 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_12.png";
import image_13 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_13.png";
import image_14 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_14.png";
import image_15 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_15.png";
import image_16 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_16.png";
import image_17 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_17.png";
import image_18 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_18.png";
import image_19 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_19.png";
import image_20 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_20.png";
import image_21 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_21.png";
import image_22 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_22.png";
import image_23 from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_23.png";

interface Props {
  showAnimation: boolean;
}

const EnerFusion = ({ showAnimation }: Props) => {
  const animationName = "EnerFusionFrames";
  const images = [
    image_00,
    image_01,
    image_02,
    image_03,
    image_04,
    image_05,
    image_06,
    image_07,
    image_08,
    image_09,
    image_10,
    image_11,
    image_12,
    image_13,
    image_14,
    image_15,
    image_16,
    image_17,
    image_18,
    image_19,
    image_20,
    image_21,
    image_22,
    image_23,
  ];

  const generateAnimation = () => {
    if (document.getElementById(animationName)) {
      return;
    }

    const keyframes = [...images, images[0]]
      .map((img, index) => {
        const percentage = (index / images.length) * 100;
        return `${percentage}% { background-image: url(${img}); }`;
      })
      .join(" ");

    const style = document.createElement("style");
    style.id = animationName;
    style.innerHTML = `
    @keyframes ${animationName} {
        ${keyframes}
    }`;
    document.head.appendChild(style);
  };

  useEffect(() => {
    generateAnimation();
  }, []);

  return (
    <>
      {images.map((image, index) => (
        <link key={index} rel="preload" href={image} as="image" />
      ))}
      {
        <div
          className="main-bot-program-image"
          style={
            showAnimation
              ? { animation: `${animationName} 2s steps(24) infinite` }
              : { backgroundImage: `url('${images[0]}')` }
          }
        />
      }
    </>
  );
};

export default EnerFusion;
