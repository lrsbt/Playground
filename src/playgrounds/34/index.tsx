import { Suspense } from "react";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Canvas, useThree } from "@react-three/fiber";

import { pairArray } from "./pairArray";

const offset = 5;

const Boxes = () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8];
  const pairs = useRef(pairArray(input));
  const bodyRefs = useRef<(RapierRigidBody | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = () => advance();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const advance = () => {
    bodyRefs.current.forEach((body) => {
      body?.applyImpulse({ x: (Math.random() - 0.5) * 20, y: 5, z: 0 }, true);
    });
  };

  return pairs.current.map(([x, y], i) => (
    <RigidBody
      key={i}
      type="dynamic"
      position={[x, y - offset, 0]}
      ref={(body) => {
        bodyRefs.current[i] = body;
      }}
      enabledTranslations={[true, true, false]}
      enabledRotations={[false, false, true]}
    >
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </RigidBody>
  ));
};

const Floor = () => {
  return (
    <group position={[0, -offset, 0]}>
      <RigidBody position={[0, 0, 0]} type="fixed">
        <mesh receiveShadow>
          <boxGeometry args={[21, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
      <RigidBody position={[0, 10, 0]} type="fixed">
        <mesh receiveShadow>
          <boxGeometry args={[21, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
      <RigidBody position={[-10, 5, 0]} type="fixed">
        <mesh receiveShadow>
          <boxGeometry args={[1, 11, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
      <RigidBody position={[10, 5, 0]} type="fixed">
        <mesh receiveShadow>
          <boxGeometry args={[1, 11, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
    </group>
  );
};

// const CameraSetup = () => {
//   const camera = useThree((s) => s.camera);

//   useEffect(() => {
//     camera.position.set(0, 0, 30);
//     camera.lookAt(0, 0, 0);
//   }, []);

//   return null;
// };

const Playground = () => {
  const { gravityX, x } = useControls({
    x: 0,
    gravityX: {
      value: 0,
      min: -5,
      max: 10,
      step: 0.1,
    },
  });

  return (
    <FullScreen centerContent info={info} className="arr-bg">
      <div className="container">
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>

        <Canvas
          orthographic
          camera={{ position: [0, 0, -1], zoom: 14 }}
          style={{ height: 170, width: "100%" }}
        >
          <Suspense fallback={null}>
            <Physics gravity={[gravityX, -9.81, 0]}>
              <color attach="background" args={["#e9e4de"]} />
              <Boxes />
              <Floor />
              {/* <OrbitControls /> */}
            </Physics>
          </Suspense>
        </Canvas>
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>
        <p>
          Learn about the history, usage and variations of Lorem Ipsum, the
          industry's standard dummy text for over 2000 years. Generate your own
          Lorem Ipsum with a dictionary of over 200 Latin words and a random
          sentence structure.
        </p>
      </div>
    </FullScreen>
  );
};

export default Playground;
