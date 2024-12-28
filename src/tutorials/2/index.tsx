import React, { useEffect, useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { animated, useSpring, useSpringValue } from "@react-spring/three";
import { Mesh } from "three";

import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Cube = (props: MeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1 : hovered ? 0.6 : 0.5,
    config: {
      friction: 12
    }
  });
  const color = scale.to({
    range: [0.5, 1],
    output: ["orange", "hotpink"]
  });

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.x += 0.01;
  });

  return (
    <animated.mesh
      ref={meshRef}
      onPointerOver={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={scale}
      {...props}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  );
};

const Playground = () => {
  return (
    <FullScreen centerContent stretch info={info}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} intensity={1000} />
        <Cube position={[-0.5, 0, 0]} />
        <Cube position={[0.5, 0, 0]} />
      </Canvas>
    </FullScreen>
  );
};

export default Playground;
