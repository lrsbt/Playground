import React, { useEffect, useState } from "react";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

import { X } from "@app/components/Icons";
import { useDelayedUnmout } from "@app/utils";
import { hideToast } from "@app/utils/emitters/toastEmitter";
import { Toast as ToastType } from "@app/utils/emitters/toastEmitter";

const ToastBox = ({ id, text, done }: ToastType) => {
  const api = useSpringRef();

  const style = useSpring({
    ref: api,
    translateY: 50,
    translateX: 0
  });

  const delayedUnmount = useDelayedUnmout(!done, 150);

  const triggerHide = () => {
    hideToast(id);
  };

  useEffect(() => {
    api.start({
      to: { translateY: 0 },
      config: { friction: 20, tension: 300 }
    });
  }, []);

  useEffect(() => {
    if (done) {
      api.start({
        to: { translateX: 300 },
        config: {
          tension: 300
        }
      });
    }
  }, [done]);

  if (!delayedUnmount) return null;

  return (
    <animated.div className="toast" style={style}>
      {text}
      <a className="toast-hide" onClick={triggerHide}>
        <X />
      </a>
    </animated.div>
  );
};

const Toast = ({ toasts }: { toasts: ToastType[] }) => (
  <animated.div className="toast-container">
    {toasts.map((t) => (
      <ToastBox {...t} key={t.id} />
    ))}
  </animated.div>
);

export { Toast };
