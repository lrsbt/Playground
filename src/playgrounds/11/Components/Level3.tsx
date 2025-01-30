import React, { useRef, useState } from "react";
import { Group } from "three";
import { useGLTF, Environment } from "@react-three/drei";
import { Canvas, MeshProps, Props, useFrame } from "@react-three/fiber";

const Model = (props) => {
  const { nodes, materials } = useGLTF("/glb/Knob/knob2.glb");
  const meshRef = useRef<Group>(null);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y -= 0.01;
  });

  return (
    <group {...props} dispose={null}>
      <group ref={meshRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cube_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.002"]}
        position={[0, -0.1, 0]}
        scale={1.4}
      >
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
      {/* <boxGeometry args={[1.5, 1.5, 1.5]} /> */}
      {/* <meshStandardMaterial color="red" /> */}
      {/* <shadowMaterial transparent opacity={1} /> */}
    </group>
  );
};

useGLTF.preload("/glb/Knob/knob2.glb");

const Level3 = ({ label }: Props) => {
  return (
    <div className="level-container">
      <div className="level3">
        <Canvas camera={{ position: [0, 1.8, 0], fov: 70 }} shadows>
          <Environment preset="apartment" />
          <ambientLight intensity={1} />
          {/* <pointLight
            position={[0, 10, -10]}
            intensity={1150}
            color="#DFD7C5"
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadowCameraFar={50}
            shadowBias={-0.05}
          /> */}

          <directionalLight
            position={[0, 10, -10]}
            intensity={10}
            color="#DFD7C5"
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
          />

          <Model />
        </Canvas>
      </div>
      {/* <div className="level-label">{label}</div> */}
    </div>
  );
};

useGLTF.preload("/glb/Knob/knob.glb");

export { Level3 };
