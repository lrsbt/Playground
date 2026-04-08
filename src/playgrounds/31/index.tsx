import React, { useEffect, useRef } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { CanvasButton } from "./CanvasButton";

const Playground = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const needsDrawRef = useRef(false);

  const tileSize = 10;
  const dirtyFactor = 1; // How quick does it get dirty

  const sizeRef = useRef({
    width: 0,
    height: 0,
    rows: 0,
    cols: 0,
  });

  const matrixRef = useRef<number[][]>([]);

  const setupCanvas = async () => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return;

    const rect = button.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);

    const cols = Math.ceil(width / tileSize);
    const rows = Math.ceil(height / tileSize);

    sizeRef.current = { width, height, rows, cols };

    matrixRef.current = [...Array(rows)].map((_) => {
      return [...Array(cols)].map((_) => 0);
    });

    ctxRef.current = canvas?.getContext("2d");
    if (!ctxRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctxRef.current.scale(dpr, dpr);
    draw();
  };

  const init = async () => {
    await setupCanvas();
  };

  const loop = () => {
    if (needsDrawRef.current) {
      draw();
      needsDrawRef.current = false;
    }
    requestAnimationFrame(loop);
  };

  const draw = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { width, height, rows, cols } = sizeRef.current;
    const matrix = matrixRef.current;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const value = matrix[row][col];
        const shade = 255 - value * 5;

        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
        ctx.fillRect(row * tileSize, col * tileSize, tileSize, tileSize);
      }
    }
  };

  const getTileForPosition = (x: number, y: number) => {
    return {
      x: Math.floor(x / tileSize),
      y: Math.floor(y / tileSize),
    };
  };

  useEffect(() => {
    init();
    loop();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getTileForPosition(e.offsetX, e.offsetY);
      const matrix = matrixRef.current;
      matrix[x][y] = matrix[x][y] < 10 ? matrix[x][y] + dirtyFactor : 10;
      needsDrawRef.current = true;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canvasRef.current]);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    console.log(rect.width, rect.height);
  }, []);

  return (
    <FullScreen centerContent info={info} className="arr-bg">
      <div>
        <div className="button" ref={buttonRef}>
          <canvas ref={canvasRef} className="button__canvas" />
          <span className="button__label">Test</span>
        </div>
        <CanvasButton>Press Me</CanvasButton>
      </div>
    </FullScreen>
  );
};

export default Playground;
