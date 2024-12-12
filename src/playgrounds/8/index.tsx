import React from "react";

import { FullScreen } from "@app/components";
import { Boxes } from "./screens/Boxes";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <Boxes />
    </FullScreen>
  );
};

export default Playground;
