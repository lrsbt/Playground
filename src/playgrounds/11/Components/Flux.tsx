import classNames from "classNames";
import React, { useRef } from "react";
import { Flat } from "./Icons/Flat";
import { Busy } from "./Icons/Busy";

interface Props extends React.ComponentProps<"div"> {}

const Flux = ({ className }: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef(10);
  const currentX = useRef(0);
  const lastX = useRef(startX.current);

  const minX = useRef(-6).current;
  const maxX = useRef(48).current;
  const speed = useRef(1).current;

  const onPointerDown = (event: any) => {
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    startX.current = event.clientX;
  };

  const OnPointerMove = (event: any) => {
    const delta = event.clientX - startX.current;
    currentX.current = lastX.current + delta * speed;

    if (currentX.current > maxX) currentX.current = maxX;
    if (currentX.current < minX) currentX.current = minX;

    if (handleRef.current && trackRef.current) {
      handleRef.current.style = `left: ${currentX.current}px`;

      // x    = currentX
      // -----  --------
      // 100% = 54 ( length of track)
      //
      // x ? = 100 * currentX.current / 54
      // 54 + 6 because the minimum is -6
      // I made it 10 so

      const pc = (100 * currentX.current) / 54 + 10;
      trackRef.current.style = `background: linear-gradient(90deg, #BC7020 ${pc}%, #503726 0%);`;
    }
  };

  const OnPointerUp = (event: any) => {
    lastX.current = currentX.current;
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <div className="flux-wrapper">
      <Flat style={{ paddingTop: 3 }} />
      <div className={classNames("flux", className)}>
        <div className="flux-container">
          <div
            className="flux-track"
            ref={trackRef}
            style={{
              background: `linear-gradient(90deg, #BC7020 ${
                (100 * startX.current) / 54 + 10
              }%, #503726 0%)`
            }}
          />
          <div
            className="flux-handle"
            onPointerDown={onPointerDown}
            ref={handleRef}
            style={{ left: `${startX.current}px` }}
          />
        </div>
        <div className="flux-label">FLUX</div>
      </div>
      <Busy />
    </div>
  );
};

export { Flux };
