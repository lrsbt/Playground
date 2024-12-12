import React from "react";
import lchPlugin from "colord/plugins/lch";
import { colord, extend } from "colord";
import { Leva, useControls } from "leva";
import { useSpring } from "@react-spring/web";

import { ChevronRight } from "@app/components/Icons";

import { presets } from "../presets";
import { Box } from "../components/Box";
import { Button } from "../components/Button";

extend([lchPlugin]);

export const useColorScheme = ({
  chroma = 8,
  hue = 286,
  spread = 0,
  offset = 0
}) => {
  const LchMaxValues = { L: 100, C: 132, H: 360 }; // Actually C goes up to 700
  const s = [4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
  const names = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
    (i) => `${i}`
  );

  const addToStylesheet = ({
    name,
    color
  }: {
    name: string;
    color: string;
  }) => {
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

const Boxes = () => {
  const [{ chroma, spread, offset, hue }, set] = useControls(() => ({
    chroma: {
      value: presets[0].values.chroma,
      min: 0,
      max: 50,
      step: 1
    },
    spread: {
      value: presets[0].values.spread,
      min: -8,
      max: 8,
      step: 0.1
    },
    offset: {
      value: presets[0].values.offset,
      min: -50,
      max: 50,
      step: 1
    },
    hue: {
      value: presets[0].values.hue,
      min: 0,
      max: 371,
      step: 1
    }
  }));

  const [_, api] = useSpring(() => ({
    onChange: (v) => {
      const { chroma, spread, offset, hue } = v.value;
      set({ chroma, spread, offset, hue });
    },
    chroma,
    spread,
    offset,
    hue
  }));

  useColorScheme({ chroma, spread, offset, hue });

  return (
    <>
      <div className="leva">
        <Leva fill />
      </div>
      <div className="presets">
        {presets.map((_, i) => (
          <a onClick={() => api.start(presets[i].values)}>{presets[i].name}</a>
        ))}
      </div>
      {[...Array(4)].map((_, i) => {
        return (
          <div key={i} className="container container--md">
            <Box elevation={i}>
              <h1>Customer Requests</h1>
              <p>
                Track and manage customer requests alongside your team's work
              </p>
              <footer>
                <Button variant="primary">Open views</Button>
                <Button variant="secondary">
                  Learn more{" "}
                  <ChevronRight width={15} height={15} stroke="currentColor" />
                </Button>
              </footer>
            </Box>
          </div>
        );
      })}
    </>
  );
};

export { Boxes };
