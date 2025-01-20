import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";

const HIDE_TIME = 3000;
const LOCATIONS = {
  visible: 0,
  hidden: 100
};

const Toast = ({ text }: { text: string | null }) => {
  const timer = useRef<number>(0);

  const [props, api] = useSpring(
    () => ({
      translateY: text ? LOCATIONS.visible : LOCATIONS.hidden,
      config: {
        tension: 300
      }
    }),
    [text]
  );

  useEffect(() => {
    const hide = () => {
      api.start({ translateY: LOCATIONS.hidden });
    };
    timer.current = setTimeout(hide, HIDE_TIME);
    return () => window.clearTimeout(timer.current);
  }, [text]);

  return (
    <animated.div className="toast" style={props}>
      {text}
    </animated.div>
  );
};

export { Toast };
