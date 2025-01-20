import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

const HIDE_TIME = 3000;
const LOCATIONS = {
  visible: 0,
  hidden: 100
};

const Toast = ({ text }: { text: string }) => {
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
    setTimeout(hide, HIDE_TIME);
  }, [text]);

  return (
    <animated.div className="toast" style={props}>
      {text}
    </animated.div>
  );
};

export { Toast };
