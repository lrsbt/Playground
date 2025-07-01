import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface Props {
  children?: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Lazily create div only once
  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = containerRef.current!;

    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, containerRef.current);
};

export { Portal };
