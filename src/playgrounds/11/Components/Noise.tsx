// html5 canvas noise generation by subz
// https://codepen.io/subz/pen/qEWmmqP

import { useEffect, useRef } from "react";

interface Props extends React.ComponentProps<"canvas"> {
  width: number;
  height: number;
}

const Noise = ({ width, height, opacity, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // context.fillRect(0, 0, w, h);
        addNoise(context);
      }
    }
  }, [canvasRef.current]);

  const addNoise = (context) => {
    const w = context.canvas.width,
      h = context.canvas.height,
      iData = context.createImageData(w, h),
      buffer32 = new Uint32Array(iData.data.buffer),
      len = buffer32.length;
    let i = 0;

    for (; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

    context.putImageData(iData, 0, 0);
  };

  return <canvas ref={canvasRef} className={className} />;
};

export { Noise };
