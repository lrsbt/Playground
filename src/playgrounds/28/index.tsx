import React from "react";
import { useTransition, animated } from "@react-spring/web";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

import { Toast } from "./Components";
import { useToast } from "./Context/useToast";
import { ToastProvider } from ".//Context/ToastProvider";

const Playground = () => (
  <ToastProvider>
    <Toasts />
  </ToastProvider>
);

const Toasts = () => {
  const { toasts } = useToast();

  const transitions = useTransition(toasts, {
    keys: (toast) => toast.id,
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateX(10px)" },
    config: (item, index, phase) => {
      return {
        friction: 14,
        precision: phase === "enter" ? 0.01 : 0.1
      };
    }
  });

  return (
    <FullScreen centerContent info={info} className="arr-bg">
      {transitions((style, item) => (
        <animated.div style={style}>
          <Toast {...item} />
        </animated.div>
      ))}
    </FullScreen>
  );
};

export default Playground;
