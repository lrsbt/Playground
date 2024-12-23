import React, { useState } from "react";
import { FullScreen } from "@app/components";

import { Curve } from "./Components/Curve";
import { Knob } from "./Components/Knob";
import { Slider } from "./Components/Slider";

import "./styles.css";
import info from "./info.md";
import { Flux } from "./Components/Flux";
import { Button } from "./Components/Button";
import { Level } from "./Components/Level";

const Playground = () => {
  const [wowRate, setWowRate] = useState(50);

  return (
    <FullScreen centerContent info={info}>
      <div className="effect noSelect">
        <Curve
          width={120}
          height={90}
          amplitude={20}
          frequency={30}
          speed={2}
          className="effect-osc"
        />
        <div className="effect-settings">
          <Slider />
          <div className="effect-rate-container">
            <Knob label="RATE" isConnected />
            <Knob label="RATE" isConnected />
          </div>
          <div className="effect-mix-container">
            <Button label="STEREO" />
            <Knob label="MIX" />
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
