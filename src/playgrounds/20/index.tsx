import React from "react";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const VideoPlayer = () => {
  return (
    <div className="player">
      <div className="player-controls">
        <div className="player-settings">Settings</div>
        <div className="player-progress">Progress</div>
      </div>
    </div>
  );
};

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
