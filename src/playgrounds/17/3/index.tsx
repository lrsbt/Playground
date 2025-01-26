import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

import { FullScreen } from "@app/components";
import { Switch } from "@app/components/Switch";

import { Stars } from "./Stars";
import { Animation } from "./Animation";

import info from "./info.md";
import "./styles.css";

const Playground = () => {
  const [mode, setMode] = useState<"dark" | "bright">("dark");
  const switchChange = (val: number) => setMode(val === 0 ? "dark" : "bright");

  return (
    <FullScreen centerContent info={info} stretch>
      <Switch options={["Dark", "Bright"]} onChange={switchChange} />

      <div className="canvasWrap">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>

      <div className="contentWrap">
        <Animation />
      </div>
    </FullScreen>
  );
};

export default Playground;
