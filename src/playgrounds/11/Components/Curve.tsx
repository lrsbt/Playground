// html5 canvas noise generation by subz
// https://codepen.io/subz/pen/qEWmmqP

import { useEffect, useRef } from "react";

interface Props extends React.ComponentProps<"canvas"> {
  width: number;
  height: number;
  amplitude: number;
  frequency: number;
  speed: number;
}

const Curve = ({
  width,
  height,
  amplitude,
  frequency,
  speed,
  className
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<any>(null);
  const offset = useRef(0);
  // const speed = useRef(3);

  useEffect(() => {
    if (canvasRef?.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.current = canvasRef.current.getContext("2d");
      triggerDraw();
    }
  }, [canvasRef.current]);

  const triggerDraw = () => {
    offset.current += speed;
    drawCurve(amplitude, frequency, offset.current);
    requestAnimationFrame(triggerDraw);
  };

  const drawCurve = (amplitude: number, frequency: number, offset: number) => {
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
    let y = 0;

    while (x < canvasRef.current.width + 5) {
      y =
        canvasRef.current.height / 2 +
        amplitude * Math.sin((x + offset) / frequency);
      context.current.lineTo(x, y);

      x += 5;
    }

    context.current.stroke();
  };

  return <canvas ref={canvasRef} className={className} />;
};

export { Curve };
