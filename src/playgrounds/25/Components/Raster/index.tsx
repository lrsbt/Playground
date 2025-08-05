import React, { useState } from "react";

const Raster = ({ id, t }: { id: number; t: number }) => (
  <div>
    <svg
      width="60"
      height="6"
      viewBox="0 0 60 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.2"
        width="60"
        height="1"
        transform="matrix(-1 0 0 1 60 0)"
        fill="#D9D9D9"
      />
      <rect opacity="0.2" y="1" width="1" height="5" fill="#D9D9D9" />
    </svg>
    <div className="info">
      <span className="info__id">{id}</span>
      <span className="info__t">{t}</span>
    </div>
  </div>
);

export { Raster };
