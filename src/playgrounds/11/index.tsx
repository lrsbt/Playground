import React, { useState } from "react";
import { FullScreen } from "@app/components";

import { Curve } from "./Curve";
import { Knob } from "./Knob";
import { Slider } from "./Slider";

import "./styles.css";
import info from "./info.md";

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
            <Knob />
            <Knob label="MIX" />
          </div>
        </div>
        <div className="effect-amount"></div>
      </div>
    </FullScreen>
  );
};

export default Playground;
