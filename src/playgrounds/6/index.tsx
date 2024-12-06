import React, { useEffect, useRef } from "react";
import { Leva, useControls } from "leva";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { animated, useSpringValue } from "@react-spring/web";

const Playground = () => {
  const dots = useRef([...Array(18)]).current;
  const { size, sin_x, sin_x_multiplyer, sin_y, min_size } = useControls({
    size: {
      value: 18,
      min: 1,
      max: 100
    },
    sin_x: {
      value: 50,
      min: 0,
      max: 150,
      step: 0.1
    },
    sin_x_multiplyer: {
      value: 2,
      min: -8,
      max: 8,
      step: 0.1
    },
    sin_y: {
      value: 125,
      min: 0,
      max: 1500,
      step: 0.1
    },
    min_size: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.1
    }
  });

  const offset = useSpringValue(0, {
    config: {
      duration: 1500 * 10
    }
  });

  useEffect(() => {
    offset.start({ to: Math.PI * 10, loop: true });
  }, []);

  return (
    <FullScreen centerContent info={info}>
      <div className="leva">
        <Leva fill />
      </div>
      {dots.map((_, i) => (
        <animated.div
          className="dot"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            translateX: offset.to(
              (v) => Math.sin(v + i) * sin_x + i * sin_x_multiplyer
            ),
            translateY: offset.to((v) => Math.cos(v + i) * sin_y),
            scale: offset.to((v) => 1 - Math.sin(v + i) + min_size)
          }}
        />
      ))}
    </FullScreen>
  );
};

export default Playground;
