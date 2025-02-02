import React from "react";
import { FullScreen } from "@app/components";
import { VideoPlayer } from "./VideoPlayer";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <div className="container">
        <VideoPlayer />
      </div>
    </FullScreen>
  );
};

export default Playground;
