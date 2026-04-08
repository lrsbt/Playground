import { useHelper } from "@react-three/drei";
import { DoubleSide, SpotLightHelper } from "three";
import { useRef } from "react";
import { COURT } from "./const";
import { RoundedBox } from "@react-three/drei";

import type { SpotLight } from "three";

const WALL_THICKNESS = 1;
const WALL_OVERHANG = 0.4;

const Wrapper = () => {
  return (
    <>
      {/* Left */}
      <mesh
        position={[-COURT.width / 2 - WALL_THICKNESS / 2, COURT.height / 2, 0]}
      >
        <boxGeometry
          args={[
            WALL_THICKNESS,
            COURT.height,
            COURT.length + WALL_OVERHANG * 2,
          ]}
        />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh
        position={[COURT.width / 2 + WALL_THICKNESS / 2, COURT.height / 2, 0]}
      >
        <boxGeometry
          args={[
            WALL_THICKNESS,
            COURT.height,
            COURT.length + WALL_OVERHANG * 2,
          ]}
        />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Entrance Bottom */}
      <mesh position={[0, 0, COURT.length / 2 + WALL_OVERHANG / 2]}>
        <boxGeometry args={[COURT.width, 0.001, WALL_OVERHANG]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Entrance Top */}
      {/* <mesh
        rotation={[3.2, 0, 0]}
        position={[0, COURT.height, COURT.length / 2 + WALL_OVERHANG / 2]}
      >
        <boxGeometry args={[COURT.width, 0.001, WALL_OVERHANG]} />
        <meshStandardMaterial
          color="orange"
          side={DoubleSide}
          transparent
          opacity={0.2}
        />
      </mesh> */}
    </>
  );
};

const Court = () => {
  const light = useRef<SpotLight | null>(null);

  useHelper(light, SpotLightHelper, "cyan");

  return (
    <>
      <spotLight
        ref={light}
        position={[0, COURT.height, 0]}
        angle={1.6}
        intensity={150}
        color="orange"
      />
      <spotLight
        position={[0, COURT.height + 1, 0]}
        angle={1.2}
        intensity={100}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        castShadow
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[COURT.width, COURT.length]} />
        <meshStandardMaterial
          color="orange"
          side={DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, COURT.height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[COURT.width, COURT.length + WALL_OVERHANG * 2]} />
        <meshStandardMaterial
          color="orange"
          side={DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, COURT.height / 2, -COURT.length / 2]} receiveShadow>
        <planeGeometry args={[COURT.width, COURT.height]} />
        <meshStandardMaterial color="orange" side={DoubleSide} />
      </mesh>

      {/* Front wall / glass wall */}
      <mesh
        position={[0, COURT.height / 2, COURT.length / 2]}
        rotation={[0, Math.PI, 0]}
        receiveShadow
      >
        <planeGeometry args={[COURT.width, COURT.height]} />
        <meshStandardMaterial
          color="#dfe8ee"
          side={DoubleSide}
          transparent
          opacity={0.1}
          roughness={0.08}
          metalness={0}
        />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[-COURT.width / 2, COURT.height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[COURT.length, COURT.height]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh
        position={[COURT.width / 2, COURT.height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[COURT.length, COURT.height]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>
      <Wrapper />
    </>
  );
};

export { Court };
