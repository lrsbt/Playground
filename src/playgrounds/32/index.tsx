import React, { useRef } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Stats, OrbitControls } from "@react-three/drei";
import { Court } from "./Court";
import { Ball } from "./Ball";

const Playground = () => {
  return (
    <FullScreen centerContent info={info} stretch>
      <div className="canvasWrap">
        <Canvas
          camera={{ position: [0, 8, 10], fov: 70 }}
          gl={{ toneMappingExposure: 1.5 }}
          shadows
        >
          <color attach="background" args={["#ddd"]} />
          <Environment preset="studio" environmentIntensity={0.1} />
          <Court />
          <Ball />
          <OrbitControls onUpdate={(e) => console.log(e)} />
          {/* <Stats /> */}
        </Canvas>
      </div>
    </FullScreen>
  );
};

export default Playground;
