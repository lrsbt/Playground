import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Terminal, TerminalLine } from "./Terminal";

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <Terminal>
        <TerminalLine type="input">npm install react</TerminalLine>
        <TerminalLine type="progress" data-ty-progressChar="·"></TerminalLine>
        <TerminalLine>Are you sure you want to uninstall 'react'?</TerminalLine>
        <TerminalLine type="input" typeDelay="1000" prompt="(y/n)">
          yyyyyy1234
        </TerminalLine>
        <TerminalLine type="input" typeDelay="1000" prompt="(y/n)">
          oh yes it's typing
        </TerminalLine>
      </Terminal>
    </FullScreen>
  );
};

export default Playground;
