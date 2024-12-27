// https://blog.promaton.com/camera-animations-with-r3f-and-react-spring-6fd378296c46
// https://codesandbox.io/p/sandbox/amazing-danny-ksf4kq?file=%2Fsrc%2FApp.js%3A58%2C20

import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from "@react-three/drei";
import { useSpring, a, config } from "@react-spring/three";
import { Model } from "./Model";
import { Vector3 } from "three";

import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";
import { useControls } from "leva";

const t = new Vector3();

type cameraPosition = [number, number, number];

const CameraWrapper = ({
  cameraPosition,
  target
}: {
  cameraPosition: cameraPosition;
  target: cameraPosition;
}) => {
  const { camera } = useThree();
  camera.position.set(...cameraPosition);
  camera.lookAt(t.set(...target));
  return null;
};

const ControlsWrapper = ({ target }: { target: cameraPosition }) => {
  const { controls } = useThree();
  if (controls) {
    controls.target.set(...target);
  }
  return null;
};

function AnimateEyeToTarget({
  position,
  target
}: {
  position: cameraPosition;
  target: cameraPosition;
}) {
  const { camera, controls } = useThree();

  const defaultPosition = {
    position: [0, 0, 0],
    target: [0, 0, 0]
  };

  const s = useSpring({
    from: defaultPosition,
    config: config.wobbly,
    onStart: () => {
      if (!controls) return;
      controls.enabled = false;
    },
    onRest: () => {
      if (!controls) return;
      controls.enabled = false;
    }
  });

  s.position.start({ from: camera.position.toArray(), to: position });
  s.target.start({
    from: controls ? controls.target.toArray() : [0, 0, 0],
    to: target
  });

  const AnimateControls = a(ControlsWrapper);
  const AnimatedNavigation = a(CameraWrapper);

  return (
    <>
      <AnimatedNavigation cameraPosition={s.position} target={s.target} />
      <AnimateControls target={s.target} />
    </>
  );
}
const Playground = () => {
  const { x, y, z, tx, ty, tz } = useControls({
    x: {
      value: 2,
      min: 0,
      max: 10
    },
    y: {
      value: 2,
      min: 0,
      max: 10
    },
    z: {
      value: 2,
      min: 0,
      max: 10
    },
    tx: {
      value: 2,
      min: 0,
      max: 10
    },
    ty: {
      value: 2,
      min: 0,
      max: 10
    },
    tz: {
      value: 2,
      min: 0,
      max: 10
    }
  });

  return (
    <FullScreen centerContent stretch info={info}>
      <Canvas>
        <Environment preset="sunset" />
        <Model />
        <OrbitControls autoRotate makeDefault />
        <AnimateEyeToTarget position={[x, y, z]} target={[tx, ty, tz]} />
      </Canvas>
    </FullScreen>
  );
};

export default Playground;
