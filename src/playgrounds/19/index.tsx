import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { FullScreen } from "@app/components";
import { useWindowSize } from "@app/utils/hooks";

import "./styles.css";
import info from "./info.md";

const STRIP_HEIGHT = 80;
const STRIP_COLORS = ["#FFAC2C", "#FF71D7", "#9243D1"];
const TENSION = 75;

const Strip = ({ color, delay }: { color: string; delay: number }) => {
  const { width } = useWindowSize();
  const config = { delay, config: { tension: TENSION } };

  const [styles, api] = useSpring(() => ({
    from: { translateX: width },
    to: { translateX: 0 },
    ...config
  }));

  const animateOut = () => {
    api.start({ translateX: -width, ...config });
  };

  useEffect(() => {
    setTimeout(animateOut, 800);
  }, []);

  return (
    <animated.div
      className="strip"
      style={{ backgroundColor: color, ...styles }}
    />
  );
};

const Playground = () => {
  const { height } = useWindowSize();
  const strips = [...Array(Math.ceil(height / STRIP_HEIGHT))].map((_, i) => ({
    color: STRIP_COLORS[i % STRIP_COLORS.length],
    delay: Math.random() * 500
  }));

  return (
    <FullScreen info={info} stretch>
      <div className="window">
        <div className="container">
          {strips.map(({ color, delay }, i) => (
            <Strip key={i} color={color} delay={delay} />
          ))}
        </div>
      </div>
    </FullScreen>
  );
};

export default Playground;
