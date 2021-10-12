import React, { memo } from "react";
import Background from "../assets/Background.jpg";
import Megu from "../assets/Megu.png";
import { chakra } from "@chakra-ui/react";
import Snowfall from "./Snowfall";
import { useMousePosition, useWindowSize } from "../utils/hooks";

const parallaxStrength = 0.01;
const parallaxEasing = "transform .6s cubic-bezier(0.33, 1, 0.68, 1)";

const ParallaxBackground = ({ noChar }: { noChar?: boolean }) => {
  const size = useWindowSize();
  const position = useMousePosition();

  let parallax: [number, number];

  if (size && position) {
    parallax = [(position[0] / size[0] - 0.5) * parallaxStrength, (position[1] / size[1] - 0.5) * parallaxStrength];
  } else {
    parallax = [0, 0];
  }

  return (
    <>
      <chakra.img
        position="absolute"
        w="full"
        h="full"
        src={Background}
        objectFit="cover"
        transition={parallaxEasing}
        style={{
          transform: `scale(${1 + parallaxStrength}) translate(${parallax[0] * 100}%, ${parallax[1] * 100}%)`,
        }}
      />

      <Snowfall
        position="absolute"
        w="full"
        h="full"
        snowflakeCount={(size ? (size[0] + size[1]) / 2 : 0) * 0.15}
        wind={[-1, 1]}
        transition={parallaxEasing}
        style={{
          transform: `scale(${1 + parallaxStrength * 5}) translate(${parallax[0] * 300}%, ${parallax[1] * 300}%)`,
        }}
      />

      {/*<chakra.img
        position="absolute"
        left="50%"
        h="full"
        src={Megu}
        objectFit="cover"
        transition={parallaxEasing}
        style={{
          opacity: noChar ? 0 : undefined,
          transform: `translateX(-50%) scale(1.18) scale(${1 + parallaxStrength}) translate(${parallax[0] * 100}%, ${
            parallax[1] * 100
          }%)`,
        }}
      />*/}
    </>
  );
};

export default memo(ParallaxBackground);
