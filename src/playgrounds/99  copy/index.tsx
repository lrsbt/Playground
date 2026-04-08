import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

const Playground = () => {
  return <FullScreen centerContent info={info}></FullScreen>;
};

export default Playground;
