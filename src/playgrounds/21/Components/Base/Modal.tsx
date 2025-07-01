import React from "react";
import { Portal } from ".";
import { X } from "@app/components/Icons";
import { useDelayedUnmout } from "@app/utils/hooks";
import { animated, useSpring } from "@react-spring/web";

interface Props extends React.ComponentProps<any> {}

const Modal = ({ children, onClose, isShowing, ...props }: Props) => {
  const delayedUnmount = useDelayedUnmout(isShowing);
  const [animatedValues] = useSpring(
    () => ({
      opacity: isShowing ? 1 : 0,
      reverse: !isShowing,
      config: {
        tension: 250,
      },
    }),
    [isShowing]
  );

  const handleClick = (e: React.MouseEvent) => {
    const target = e?.target as HTMLDivElement;
    if (target?.className === "modal") onClose();
  };

  if (!delayedUnmount) return null;

  return (
    <Portal>
      <animated.div
        className="modal"
        role="dialog"
        style={animatedValues}
        onClick={handleClick}
        {...props}
      >
        <div className="modal-content">
          <a className="modal-close" onClick={onClose}>
            <X />
          </a>
          {children}
        </div>
      </animated.div>
    </Portal>
  );
};

export { Modal };
