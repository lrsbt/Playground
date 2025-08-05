import React, { useState } from "react";
import type { Item } from "../../types";
import { Raster } from "../Raster";

const Item = ({
  t,
  id,
  percent,
  isActive,
  isDone,
}: {
  t: any;
  id: number;
  percent?: number;
  isActive?: boolean;
  isDone?: boolean;
}) => {
  return (
    <div className="column">
      <div className="column_time">
        <Raster id={id} t={t} />
      </div>
      <div className="column_bar">
        <div
          className="column_bar_progress"
          // style={{ width: isActive ? percent + "%" : isDone ? "100%" : 0 }}
          style={{ width: isDone ? "100%" : isActive ? percent + "%" : 0 }}
        />
      </div>
    </div>
  );
};

export { Item };
