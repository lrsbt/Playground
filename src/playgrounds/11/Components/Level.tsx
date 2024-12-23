import React, { useRef } from "react";
import classNames from "classNames";

interface Props {
  label?: string;
  isConnected?: boolean;
}

const Level = ({ label, isConnected }: Props) => {
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
      valueRef.current.style = `background: conic-gradient(from -160deg, #D4E7FF ${currentY.current}deg, #3C4456 0deg)`;
    }
  };

  const OnPointerUp = (event: any) => {
    lastRot.current = currentY.current;
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <div className="level-container">
      <div
        className={classNames("level", { "level-connected": isConnected })}
        onPointerDown={onPointerDown}
      >
        <div
          ref={valueRef}
          className="level-value"
          style={{
            background: `conic-gradient(from -160deg, #D4E7FF ${startY.current}deg, #3C4456 0deg)`
          }}
        >
          <div className="level-base" />
        </div>
      </div>
      <div className="level-label">{label}</div>
    </div>
  );
};

export { Level };
