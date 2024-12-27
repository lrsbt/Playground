import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

const Cube = (props) => {
  const meshRef = useRef(null);

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
};

const Playground = () => {
  return (
    <FullScreen centerContent info={info}>
      <Canvas>
        <Cube />
      </Canvas>
    </FullScreen>
  );
};

export default Playground;
