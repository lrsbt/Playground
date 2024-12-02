import React from "react";
import { Leva, useControls } from "leva";
import { Colord, colord, extend } from "colord";
import lchPlugin from "colord/plugins/lch";
import mixPlugin from "colord/plugins/mix";

extend([lchPlugin, mixPlugin]);

import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

export interface Color {
  color: string;
  name: string;
}

// Color Idea: https://medium.com/cortes-studio/a-systematic-approach-to-harmonious-neutral-color-palettes-in-product-design-9b4aa19e2156
// Primary in LCH: https://lch.oklch.com/#42.46,81.61,296.5,100
// Black: LCH has issues with l = 0, so I used HSV which can do it

const addToStylesheet = (name: Color["color"], color: Color["name"]): void => {
  document.documentElement.style.setProperty(`--${name}`, color);
};

const useColors = (baseColor: Colord, mixColor: Colord, prefix: string) => {
  const percent = [100, 80, 60, 40, 20, 5];

  const colors = [...Array(6)].map((_, i) => {
    const color = {
      name: `${percent[i]}%`,
      color: baseColor.mix(mixColor, percent[i] / 100)
    };
    addToStylesheet(`colors-grey-${prefix}-${percent[i]}`, color.color.toHex());
    return color;
  });

  return colors;
};

const Playground = () => {
  const { primary, offsetBlack } = useControls({
    primary: {
      value: "#5c51e0"
    },
    offsetBlack: {
      value: 18,
      min: 0,
      max: 100,
      step: 0.1
    }
  });

  const primaryColor = colord(primary);
  const primaryColorBlack = colord({
    h: primaryColor.toHsv().h,
    s: primaryColor.toHsv().s,
    v: offsetBlack
  });

  const whites = useColors(colord("#FFFFFF"), primaryColorBlack, "onWhite");
  const blacks = useColors(primaryColorBlack, colord("#FFFFFF"), "onBlack");

  // Iterate over an array later?
  addToStylesheet("colors-primary", primaryColor.toHex());
  addToStylesheet("colors-black", primaryColorBlack.toHex());

  return (
    <>
      <div className="leva">
        <Leva fill />
      </div>

      <FullScreen centerContent info={info}>
        <div className="fullWidth">
          <div className="color-wrap">
            <div className="color">
              <div className="color-name">Primary</div>
              <div
                className="color-box"
                style={{ background: primaryColor.toHex() }}
              >
                {primaryColor.toHex()}
              </div>
            </div>
            <div className="color">
              <div className="color-name">Black</div>
              <div
                className="color-box"
                style={{ background: primaryColorBlack.toHex() }}
              >
                {primaryColorBlack.toHex()}
              </div>
            </div>
          </div>
          <div className="chart-wrap">
            <div className="chart chart--onWhite">
              {whites.map(({ color, name }) => (
                <div className="chart-bar">
                  <div className="chart-color" />
                  <div className="chart-name">{name}</div>
                  <div className="chart-hex">{color.toHex()}</div>
                </div>
              ))}
            </div>
            <div className="chart chart--onBlack">
              {blacks.map(({ color, name }) => (
                <div className="chart-bar">
                  <div className="chart-color" />
                  <div className="chart-name">{name}</div>
                  <div className="chart-hex">{color.toHex()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FullScreen>
    </>
  );
};

export default Playground;
