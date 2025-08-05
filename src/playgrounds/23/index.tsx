import React, { useEffect, useRef } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }
}

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

const Playground = () => {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#F00";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <FullScreen centerContent info={info}>
      <div className="game-container">
        <Canvas draw={draw} />
      </div>
    </FullScreen>
  );
};

export default Playground;
