import React, { useEffect, useRef } from "react";
import { FullScreen } from "@app/components";
import { useAnimationFrame } from "@app/hooks";

import "./styles.css";
import info from "./info.md";

interface CurveProps extends React.ComponentProps<"canvas"> {
  width: number;
  height: number;
  amplitude: number;
  frequency: number;
  speed: number;
}

const Playground = () => {
  const valueInputRef = useRef<HTMLInputElement>(null);
  const sliderHandleRef = useRef<HTMLDivElement>(null);
  const value = useRef(0);
  const offsetValue = useRef(0);

  const updateValue = () => {
    if (valueInputRef.current)
      valueInputRef.current.value = `${value.current.toFixed(1)}`;
  };

  const Curve = ({
    width,
    height,
    amplitude,
    frequency,
    speed,
    className
  }: CurveProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = useRef<any>(null);
    const offset = useRef(0);
    const resolution = useRef(3);

    const initCanvas = () => {
      if (!canvasRef?.current) return;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.current = canvasRef.current.getContext("2d");
    };

    const triggerDraw = (dt: number) => {
      offset.current += speed;
      drawCurve(amplitude, frequency, offset.current);
      updateValue();
    };

    const drawCurve = (
      amplitude: number,
      frequency: number,
      offset: number
    ) => {
      if (!canvasRef.current) return;
      if (!context.current) return;

      context.current.clearRect(
        0,
        0,
        canvasRef.current?.width,
        canvasRef.current?.height
      );

      context.current.beginPath();
      context.current.strokeStyle = "#FFAE32";
      context.current.lineWidth = 2;

      let x = 0;

      while (x < canvasRef.current.width) {
        value.current =
          canvasRef.current.height / 2 +
          amplitude * Math.cos((x + offset) * frequency) +
          offsetValue.current;

        context.current.lineTo(x, value.current);

        x += resolution.current;
      }

      context.current.stroke();
    };

    useAnimationFrame(triggerDraw);

    useEffect(() => {
      initCanvas();
    }, [canvasRef.current]);

    return <canvas ref={canvasRef} className={className} />;
  };

  const Slider = () => {
    const startY = useRef(50);
    const currentY = useRef(0);
    const lastRot = useRef(startY.current);

    const minVal = useRef(0).current;
    const maxVal = useRef(100).current;
    const speed = useRef(1).current;

    const onPointerDown = (event: any) => {
      document.addEventListener("pointermove", OnPointerMove);
      document.addEventListener("pointerup", OnPointerUp);

      startY.current = event.clientY;
    };

    const OnPointerMove = (event: any) => {
      const delta = startY.current - event.clientY;
      currentY.current = lastRot.current - delta * speed;

      if (currentY.current < minVal) currentY.current = minVal;
      if (currentY.current > maxVal) currentY.current = maxVal;
      if (sliderHandleRef.current) {
        sliderHandleRef.current.style.cssText = `transform: translateY(${currentY.current}px)`;
      }
      offsetValue.current = currentY.current - 50;
    };

    const OnPointerUp = (event: any) => {
      lastRot.current = currentY.current;
      document.removeEventListener("pointermove", OnPointerMove);
      document.removeEventListener("pointerup", OnPointerUp);
    };

    useEffect(() => {
      if (sliderHandleRef.current)
        sliderHandleRef.current.style.cssText = `transform: translateY(${startY.current}px)`;
    }, []);

    return (
      <div className="curve-slider slider">
        <div className="slider-track">
          <div
            className="slider-handle"
            onPointerDown={onPointerDown}
            ref={sliderHandleRef}
          />
        </div>
      </div>
    );
  };

  return (
    <FullScreen centerContent info={info}>
      <div className="curve">
        <Curve
          width={125}
          height={125}
          className="curve-canvas"
          amplitude={40}
          speed={10}
          frequency={0.01}
        />
        <Slider />
        <input type="text" ref={valueInputRef} className="curve-value" />
      </div>
    </FullScreen>
  );
};

export default Playground;
