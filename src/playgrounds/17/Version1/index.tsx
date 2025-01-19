import React from "react";
import { Canvas } from "@react-three/fiber";

import { Terminal, TerminalLine } from "./Terminal";
import { Stars } from "./Stars";
import "./styles.css";

const Version1 = () => (
  <>
    <div className="canvasWrap">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>

    <div className="contentWrap">
      <Terminal>
        <TerminalLine type="input">
          <span className="red">npm </span>
          <span>install </span>
          <span>react</span>
        </TerminalLine>
        <TerminalLine type="progress" data-ty-progressChar="·"></TerminalLine>
        <TerminalLine type="input">
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
  </>
);

export { Version1 };
