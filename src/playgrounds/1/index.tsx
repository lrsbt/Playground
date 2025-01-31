import React, { useEffect, useState } from "react";
import { useSpring, animated, useSpringRef } from "@react-spring/web";
import { FullScreen } from "@app/components";
import { Sparks } from "./Sparks";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const apiFill = useSpringRef();
  const apiWob = useSpringRef();
  const config = { friction: 20 };
  const [value, setValue] = useState(0); // Used as a trigger for the sparks

  const fillStyle = useSpring({ ref: apiFill, width: 0, config });

  const wobbleStyle = useSpring({
    ref: apiWob,
    from: { translateY: -2, scale: 1 },
    to: { translateY: 0, scale: 1 },
    config: {
      friction: 8
    }
  });

  const animateTo = (offsetX: number) => {
    const movedBy = Math.abs(offsetX - value) / 25;
    apiFill.start({ width: offsetX, config });
    apiWob.start({
      from: {
        translateY: -movedBy,
        scale: 1 + movedBy / 100,
        translateX: -movedBy
      },
      to: { translateY: Math.random(), scale: 1, translateX: Math.random() },
      config: {
        friction: 8,
        tension: 350
      }
    });
    setValue(offsetX);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    // Bug innerwidth is 196px not 200px;
    const offsetX = e.clientX - rect.left;
    animateTo(offsetX);
  };

  useEffect(() => {
    animateTo(Math.random() * 200);
  }, []);

  return (
    <FullScreen centerContent info={info}>
      <animated.div className="main" onClick={handleClick} style={wobbleStyle}>
        <animated.div className="fill" style={fillStyle} />
        <animated.div className="content">
          {fillStyle.width.to((x) => x.toFixed(0))}
        </animated.div>
        <Sparks offsetX={value} />
      </animated.div>
    </FullScreen>
  );
};

export default Playground;
