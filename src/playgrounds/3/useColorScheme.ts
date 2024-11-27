import { colord, extend } from "colord";
import lchPlugin from "colord/plugins/lch";
import { Color, UseColorSchemeProps } from "./types";

extend([lchPlugin]);

export const useColorScheme = ({
  chroma = 8,
  hue = 286,
  spread = 0,
  offset = 0
}: UseColorSchemeProps) => {
  const LchMaxValues = { L: 100, C: 132, H: 360 }; // Actually C goes up to 700
  const s = [4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
  const names = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
    (i) => `${i}`
  );

  const addToStylesheet = ({ name, color }: Color) => {
    document.documentElement.style.setProperty(`--grey${name}`, color);
  };

  const generateGreys = () => {
    return [...Array(10)].map((_, i) => {
      const color = {
        name: names[i],
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
