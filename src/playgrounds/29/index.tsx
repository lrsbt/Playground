import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Main } from "./Screens/Showcase";
import { Background } from "./Components";

const Playground = () => {
  return (
    <FullScreen centerContent info={info} className="arr-bg">
      <Background />
      <Main />
    </FullScreen>
  );
};

export default Playground;
