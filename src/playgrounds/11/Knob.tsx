import React, { useRef } from "react";
import classNames from "classNames";

interface Props {
  label?: string;
  isConnected?: boolean;
}

const Knob = ({ label, isConnected }: Props) => {
  const valueRef = useRef<HTMLDivElement | null>(null);

  const startY = useRef(160);
  const currentY = useRef(0);
  const lastRot = useRef(startY.current);

  const maxRot = useRef(320).current;
  const speed = useRef(1.5).current;

  const onPointerDown = (event: any) => {
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    startY.current = event.clientY;
  };

  const OnPointerMove = (event: any) => {
    const delta = startY.current - event.clientY;
    currentY.current = lastRot.current + delta * speed;

    if (currentY.current > maxRot) currentY.current = maxRot;
    if (currentY.current < -maxRot) currentY.current = -maxRot;
    if (valueRef.current) {
      valueRef.current.style = `background: conic-gradient(from -160deg, #ffae1f ${currentY.current}deg, #5a3e27 0deg)`;
    }
  };

  const OnPointerUp = (event: any) => {
    lastRot.current = currentY.current;
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <div className="knob-container">
      <div
        className={classNames("knob", { "knob-connected": isConnected })}
        onPointerDown={onPointerDown}
      >
        <div
          ref={valueRef}
          className="knob-value"
          style={{
            background: `conic-gradient(from -160deg, #ffae1f ${startY.current}deg, #5a3e27 0deg)`
          }}
        >
          <div className="knob-base" />
        </div>
      </div>
      <div className="knob-label">{label}</div>
    </div>
  );
};

export { Knob };
