import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

interface Props extends React.ComponentProps<"div"> {}

type Capture = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

const CanvasButton = ({ children }: Props) => {
  const measureRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<Uint8Array[]>([]);
  const captureSizeRef = useRef({ width: 0, height: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = measureRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const xCss = e.clientX - rect.left;
    const yCss = e.clientY - rect.top;

    const { width: captureWidth, height: captureHeight } =
      captureSizeRef.current;

    if (!captureWidth || !captureHeight) return;

    const x = Math.floor((xCss / rect.width) * captureWidth);
    const y = Math.floor((yCss / rect.height) * captureHeight);

    if (
      x < 0 ||
      y < 0 ||
      x >= captureWidth ||
      y >= captureHeight ||
      !maskRef.current[x]
    ) {
      return;
    }

    console.log(
      "css:",
      xCss,
      yCss,
      "capture:",
      x,
      y,
      "value:",
      maskRef.current[x][y],
    );
  };

  const handleCapture = async (): Promise<Capture | undefined> => {
    if (!measureRef.current) return;

    const canvas = await html2canvas(measureRef.current, {
      allowTaint: true,
      backgroundColor: null,
      scale: window.devicePixelRatio || 1,
    });

    const context = canvas.getContext("2d");
    if (!context) return;

    return {
      canvas,
      context,
    };
  };

  const buildMatrix = (capture: Capture) => {
    const ctx = capture.context;
    const { width, height } = capture.canvas;
    const { data } = ctx.getImageData(0, 0, width, height);

    captureSizeRef.current = { width, height };

    maskRef.current = Array.from(
      { length: width },
      () => new Uint8Array(height),
    );

    // Array of data, rgba (4)
    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const alpha = data[i + 3];
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);

      maskRef.current[x][y] = alpha === 0 ? 0 : 1;
    }
  };

  useEffect(() => {
    const init = async () => {
      const capture = await handleCapture();
      if (!capture) return;
      buildMatrix(capture);
    };

    init();
  }, []);

  return (
    <div
      ref={measureRef}
      className="button-container"
      onMouseMove={handleMouseMove}
    >
      <div className="button">
        <div className="button-content">{children}</div>
        <div className="button-background" />
      </div>
    </div>
  );
};

export { CanvasButton };
