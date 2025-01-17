import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { FullScreen } from "@app/components";

import { Terminal, TerminalLine } from "./Terminal";
import { Switch } from "@app/components/Switch";
import { Stars } from "./Stars";

import info from "./info.md";
import "./styles.css";

const Playground = () => {
  return (
    <FullScreen centerContent info={info} stretch>
      <Switch />

      <div className="canvasWrap">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>

      <div className="contentWrap">
        <Terminal>
          <TerminalLine type="input">npm install react</TerminalLine>
          <TerminalLine type="progress" data-ty-progressChar="·"></TerminalLine>
          <TerminalLine>
            Are you sure you want to uninstall 'react'?
          </TerminalLine>
          <TerminalLine type="input" typeDelay="1000" prompt="(y/n)">
            yyyyyy1234
          </TerminalLine>
          <TerminalLine type="input" typeDelay="1000" prompt="(y/n)">
            oh yes it's typing
          </TerminalLine>
        </Terminal>
      </div>
    </FullScreen>
  );
};

export default Playground;
