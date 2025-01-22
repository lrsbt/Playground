import React from "react";
import useMeasure from "react-use-measure";
import { Toast as ToastType } from "@app/utils/emitters/toastEmitter";
import { animated, useSpring } from "@react-spring/web";

const Toast = ({ toasts }: { toasts: ToastType[] }) => {
  const [ref, { height }] = useMeasure();

  const props = useSpring({
    height: height,
    config: {
      friction: 25,
      tension: 300
    }
  });

  return (
    <animated.div className="toast-container" style={props}>
      <div ref={ref}>
        {toasts.map(({ id, text }) => (
          <div key={id} className="toast">
            {id}: {text}
          </div>
        ))}
      </div>
    </animated.div>
  );
};

export { Toast };
