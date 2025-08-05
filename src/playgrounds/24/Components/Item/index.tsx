import React, { useState } from "react";
import type { Item } from "../../types";
import { Raster } from "../Raster";

const Item = ({ id, name, columns }: Item) => {
  const getStartIndex = (index?: number) => {
    const add = (acc: number, { bars }: { bars: number }, i: number) => {
      if (typeof index === "number" && i >= index) return acc;
      return acc + bars;
    };
    return columns.reduce(add, 0);
  };

  return (
    <div className="item">
      <div className="item__name">{name}</div>

      <div className="item__data">
        {columns.map((c, i) => {
          const startNumber = getStartIndex(i);
          console.log(startNumber);
          return (
            <div className="column" key={c.id}>
              <div className="column_name">{c.title}</div>
              <div className="column_time">
                {[...Array(c.bars)].map((_, i) => (
                  <Raster key={i}>{(startNumber + i) * 8 + 1}</Raster>
                ))}
              </div>
              <div className="column_bars">
                {[...Array(c.bars)].map((_, i) => (
                  <div>1</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Item };
