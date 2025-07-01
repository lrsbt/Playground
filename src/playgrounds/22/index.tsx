import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Game } from "./Game";

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <Game />
    </FullScreen>
  );
};

export default Playground;
