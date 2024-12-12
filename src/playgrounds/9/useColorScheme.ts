import React from "react";
import lchPlugin from "colord/plugins/lch";
import { colord, extend } from "colord";
import { colorNames } from "./constants";
import { addToStylesheet } from "./util";

extend([lchPlugin]);

export const useColorScheme = ({
  chroma = 8,
  hue = 286,
  spread = 0,
  leftPush = 0,
  offset = 0
}) => {
  const LchMaxValues = { L: 100, C: 132, H: 360 };

  const generateGreys = () => {
    return [...Array(10)].map((_, i) => {
      const lleftPush =
        (0.5 - Math.sin(i / ((10 / Math.PI) * 2))) * leftPush * 10; // WhiteBoost
      const sspread = 5 - i * spread + lleftPush; // General Sideboost

      const color = {
        name: colorNames[i],
        color: colord({
          l: LchMaxValues.L - (LchMaxValues.L / 10) * i + sspread + offset,
          c: chroma,
          h: hue
        }).toHex()
      };
      addToStylesheet(color);
      return color;
    });
  };

  return generateGreys();
};
