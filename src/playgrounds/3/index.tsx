import React from "react";
import { useControls } from "leva";

import { FullScreen } from "@app/components";

import { useColorScheme } from "./useColorScheme";
import { Roster } from "./Roster";
import { PopOver } from "./PopOver";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const [{ chroma, spread, offset, hue }, set] = useControls(() => ({
    chroma: {
      value: 18,
      min: 0,
      max: 250,
      step: 1
    },
    spread: {
      value: 0.75,
      min: 0,
      max: 100,
      step: 0.1
    },
    offset: {
      value: 0,
      min: 0,
      max: 100,
      step: 1
    },
    hue: {
      value: 286,
      min: 0,
      max: 371,
      step: 1
    }
  }));

  const colors = useColorScheme({
    chroma: chroma,
    spread: spread,
    offset: offset,
    hue: hue
  });

  return (
    <FullScreen centerContent info={info}>
      <Roster colors={colors} />
      <PopOver />
    </FullScreen>
  );
};

export default Playground;
