import React, { useRef, useState } from "react";
import { Canvas, MeshProps, Props, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

const Model = (props) => {
  const { nodes, materials } = useGLTF("/glb/Knob/knob.glb");
  const meshRef = useRef<Group>(null);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y -= 0.01;
  });

  return (
    <group {...props} dispose={null} ref={meshRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_1.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_2.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
};

const Level2 = ({ label }: Props) => {
  return (
    <div className="level-container">
      <div className="level2">
        <Canvas camera={{ position: [0, 1.35, 0] }}>
          <ambientLight intensity={1} />
          <pointLight position={[0, 3, -10]} intensity={2500} color="#DFD7C5" />
          <Model />
        </Canvas>
      </div>
      <div className="level-label">{label}</div>
    </div>
  );
};

useGLTF.preload("/glb/Knob/knob.glb");

export { Level2 };
