import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

import { FullScreen } from "@app/components";
import { Switch } from "@app/components/Switch";
import { Terminal, TerminalLine } from "./Terminal";
import { Stars } from "./Stars";

import info from "./info.md";
import "./styles.css";

const Playground = () => {
  const [version, setVersion] = useState(0);
  const switchChange = (val: number) => setVersion(val);

  return (
    <FullScreen centerContent info={info} stretch>
      <Switch onChange={switchChange} />

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
            <TerminalLine
              type="progress"
              data-ty-progressChar="·"
            ></TerminalLine>
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
    </FullScreen>
  );
};

export default Playground;
