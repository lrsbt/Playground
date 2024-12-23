import classNames from "classNames";
import React, { useRef } from "react";

interface Props extends React.ComponentProps<"div"> {}

const Slider = ({ className }: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef(10);
  const currentX = useRef(0);
  const lastX = useRef(startX.current);

  const minX = useRef(-10).current;
  const maxX = useRef(82).current;
  const speed = useRef(1).current;

  const onPointerDown = (event: any) => {
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    startX.current = event.clientX;
  };

  const OnPointerMove = (event: any) => {
    const delta = event.clientX - startX.current;
    currentX.current = lastX.current + delta * speed;
    console.log(currentX.current);

    if (currentX.current > maxX) currentX.current = maxX;
    if (currentX.current < minX) currentX.current = minX;

    if (trackRef.current) {
      trackRef.current.style = `left: ${currentX.current}px`;
    }
  };

  const OnPointerUp = (event: any) => {
    lastX.current = currentX.current;
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <div className={classNames("slider", className)}>
      <div className="slider-container">
        <div className="slider-track" />
        <div
          className="slider-handle"
          onPointerDown={onPointerDown}
          ref={trackRef}
          style={{ left: `${startX.current}px` }}
        />
      </div>
    </div>
  );
};

export { Slider };
