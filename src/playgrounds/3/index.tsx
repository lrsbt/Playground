import React from "react";
import { FullScreen } from "@app/components";

import { useColorScheme } from "./useColorScheme";
import { Roster } from "./Roster";
import { PopOver } from "./PopOver";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const colors = useColorScheme({
    chroma: 18,
    spread: 0.75,
    offset: 0
  });

  return (
    <FullScreen centerContent info={info}>
      <Roster colors={colors} />
      <PopOver />
    </FullScreen>
  );
};

export default Playground;
