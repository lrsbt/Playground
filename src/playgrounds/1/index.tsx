import React, { useEffect, useState } from "react";
import { useSpring, animated, useSpringRef } from "@react-spring/web";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const apiFill = useSpringRef();
  const apiWob = useSpringRef();
  const config = { friction: 20 };
  const fillStyle = useSpring({
    ref: apiFill,
    width: 0,
    config
  });

  const wobbleStyle = useSpring({
    ref: apiWob,
    from: { translateY: -2, scale: 1 },
    to: { translateY: 0, scale: 1 },
    config: {
      friction: 8
    }
  });

  const handleClick = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const difference =
      (offsetX - fillStyle.width.animation.fromValues?.[0]) / 50;
    apiFill.start({ width: offsetX, config });
    apiWob.start({
      from: { translateY: -difference, scale: 1 + difference / 100 },
      to: { translateY: 0, scale: 1 },
      config: {
        friction: 8
      }
    });
  };

  useEffect(() => {
    apiFill.start({ width: Math.random() * 100 });
  }, []);

  return (
    <FullScreen centerContent info={info}>
      <animated.div className="main" onClick={handleClick} style={wobbleStyle}>
        <animated.div className="fill" style={fillStyle} />
        <animated.div className="content">
          {fillStyle.width.to((x) => x.toFixed(0))}
        </animated.div>
      </animated.div>
    </FullScreen>
  );
};

export default Playground;
