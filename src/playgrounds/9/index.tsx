import React from "react";
import { Leva, useControls } from "leva";
import { useSpring } from "@react-spring/web";

import { FullScreen } from "@app/components";

import { addToStylesheet } from "./util";
import { colorNames } from "./constants";
import { presets, levaSetup } from "./presets";
import { useColorScheme } from "./useColorScheme";
import { ExampleBox } from "./components/ExampleBox";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const [values, set] = useControls(levaSetup);

  const [_, api] = useSpring(() => ({
    onChange: (v) => set(v.value),
    ...values
  }));

  useColorScheme(values);

  addToStylesheet({ name: "white", color: `#ffffff` });
  addToStylesheet({ name: "black", color: `#000000` });
  addToStylesheet({ name: "background", color: `var(--${values.background})` });
  addToStylesheet({ name: "border", color: `var(--${values.border})` });
  addToStylesheet({ name: "p", color: `var(--${values.p})` });
  addToStylesheet({ name: "btnBg", color: `var(--${values.btnBg})` });
  addToStylesheet({ name: "btnText", color: `var(--${values.btnText})` });
  addToStylesheet({ name: "btnHovBg", color: `var(--${values.btnHovBg})` });
  addToStylesheet({ name: "btnHovTxt", color: `var(--${values.btnHovTxt})` });

  const prev = (color: string, by: number) => {
    const index = colorNames.indexOf(color);
    if (index - by < 0) {
      return values.addWhite ? "white" : colorNames[0];
    } else {
      return colorNames[index - by];
    }
  };

  const styles = [...Array(4)]
    .map((_, elevation) => {
      return `
        .box--elevation-${elevation} {
          background-color: var(--${prev(values.background, elevation)});
          border-color: var(--${prev(values.border, elevation)});
        }
        .box--elevation-${elevation} p {
          color: var(--${prev(values.p, elevation)});
        }
        .box--elevation-${elevation} .button--primary {
          background-color: var(--${prev(values.btnBg, elevation)});
        }
        .box--elevation-${elevation} .button {
          color: var(--${prev(values.btnText, elevation)});
        }
        .box--elevation-${elevation} .button--primary:hover {
          background-color: var(--${prev(values.btnHovBg, elevation)});
          color: var(--${prev(values.btnHovTxt, elevation)});
        }
        .box--elevation-${elevation} .button--secondary:hover {
          color: var(--${prev(values.btnHovTxt, elevation)});
        }
      `;
    })
    .join("");

  const exportSetting = () => {
    console.log(values);
  };

  return (
    <FullScreen centerContent info={info}>
      <style>{styles}</style>
      <div className="leva">
        <Leva fill />
      </div>
      <div className="presets">
        {presets.map((_, i) => (
          <a key={i} onClick={() => api.start(presets[i].values)}>
            {presets[i].name}
          </a>
        ))}
        <a onClick={exportSetting}>Export Setting</a>
      </div>
      <div className="colors">
        {colorNames.map((c) => (
          <div
            key={c}
            className="color"
            style={{ background: `var(--${c})` }}
          />
        ))}
      </div>
      {[...Array(4)].map((_, i) => (
        <ExampleBox key={i} elevation={i} />
      ))}
    </FullScreen>
  );
};

export default Playground;
