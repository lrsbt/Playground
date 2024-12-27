import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTrail } from "@react-spring/three";

import { Model } from "./Model";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const [flip, setflip] = useState(0);

  const [rotations] = useTrail(
    5,
    () => ({
      to: { r: Math.PI * flip },
      config: { friction: 16 }
    }),
    [flip]
  );

  useEffect(() => {
    setTimeout(setflip, 500, 1);
  }, []);

  const flipIt = () => {
    setflip((f) => (f === 1 ? 0 : 1));
  };

  return (
    <FullScreen centerContent stretch info={info}>
      <Canvas camera={{ position: [0, 10, 3] }} onClick={flipIt}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 11]} intensity={1} />
        <directionalLight position={[1, -1, 0]} intensity={1.8} />
        <directionalLight position={[0, 1, 0]} intensity={1.8} />
        <directionalLight position={[-2, 0, 1]} intensity={1.8} />
        <Model rotation={rotations[0].r} offsetX={-2.5} />
        <Model rotation={rotations[1].r} offsetX={0} />
        <Model rotation={rotations[2].r} offsetX={2.5} />
      </Canvas>
    </FullScreen>
  );
};

export default Playground;
