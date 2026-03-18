import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Input } from "./Input";

const Playground = () => {
  return (
    <FullScreen centerContent info={info} className="dark">
      <Input />
    </FullScreen>
  );
};

export default Playground;
