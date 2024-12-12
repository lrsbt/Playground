import React from "react";

import { FullScreen } from "@app/components";
import { Boxes } from "./screens/Boxes";
import { Layout } from "./screens/Layout";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <Boxes />
      {/* <Layout /> */}
    </FullScreen>
  );
};

export default Playground;
