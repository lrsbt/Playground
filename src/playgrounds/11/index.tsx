import React, { useRef, useState } from "react";
import { FullScreen } from "@app/components";

import { Curve } from "./Components/Curve";
import { Knob } from "./Components/Knob";
import { Slider } from "./Components/Slider";
import { Flux } from "./Components/Flux";
import { Button } from "./Components/Button";
import { Level } from "./Components/Level";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const frequency = useRef(10);
  const speed = useRef(2);
  const mix = useRef(0);

  return (
    <FullScreen centerContent info={info}>
      <div className="effect noSelect">
        <Curve
          width={120}
          height={90}
          amplitude={20}
          frequency={frequency}
          speed={speed}
          className="effect-osc"
        />
        <div className="effect-settings">
          <Slider />
          <div className="effect-rate-container">
            <Knob label="RATE" isConnected set={frequency} />
            <Knob label="SPEED" isConnected set={speed} />
          </div>
          <div className="effect-mix-container">
            <Button label="STEREO" />
            <Knob label="MIX" set={mix} />
          </div>
          <div className="effect-flux-container">
            <Flux />
          </div>
        </div>
        <div className="effect-amount">
          <Level label="WOBBLE" />
        </div>
      </div>
    </FullScreen>
  );
};

export default Playground;
