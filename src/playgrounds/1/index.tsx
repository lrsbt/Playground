import React, { useState } from "react";
import { useSpring, animated, useSpringRef } from "@react-spring/web";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const api = useSpringRef();
  const config = { friction: 20 };
  const style = useSpring({
    ref: api,
    width: 0,
    config
  });

  const handleClick = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    api.start({ width: x, config });
  };

  return (
    <FullScreen centerContent info={info}>
      <div className="main" onClick={handleClick}>
        <animated.div className="fill" style={style} />
        <animated.div className="content">
          {style.width.to((x) => x.toFixed(0))}
        </animated.div>
      </div>
    </FullScreen>
  );
};

export default Playground;
