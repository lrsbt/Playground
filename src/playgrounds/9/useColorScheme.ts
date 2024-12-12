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
  offset = 0
}) => {
  const LchMaxValues = { L: 100, C: 132, H: 360 };
  const s = [4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

  const generateGreys = () => {
    return [...Array(10)].map((_, i) => {
      const color = {
        name: colorNames[i],
        color: colord({
          l:
            LchMaxValues.L - (LchMaxValues.L / 10) * i + s[i] * spread + offset,
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
