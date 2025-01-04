import React, { useRef, useState } from "react";
import { useSpringRef } from "@react-spring/web";
import { FullScreen } from "@app/components";

import { Grid } from "./Grid";
import { Cell } from "./types";
import { CELLSIZE, CELLSPACING, initialData } from "./const";
import { useDraggableArea } from "./useDraggableArea";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const dragAreaSpringRef = useSpringRef();
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );

  const { areaStyle, onPointerDown, onPointerSelect, panTo } = useDraggableArea(
    dragAreaRef,
    dragAreaSpringRef
  );

  const [cellData, setCellData] = useState<Cell[]>(initialData);

  const selectActualCell = (e) => {
    const myTarget = e.target.closest(".cell");
    const { offsetLeft, offsetTop } = myTarget;
    const col = offsetLeft / (CELLSIZE + CELLSPACING);
    const row = offsetTop / (CELLSIZE + CELLSPACING);
    setSelectedCell([col, row]);
  };

  const handelSkillSelect = (e: MouseEvent) => {
    onPointerSelect(() => {
      panTo(e);
      selectActualCell(e);
    });
  };

  // const cellDataByRow = cellData.map()

  return (
    <FullScreen centerContent stretch info={info}>
      <div className="dragarea" onPointerDown={onPointerDown}></div>
      <Grid
        style={areaStyle}
        ref={dragAreaRef}
        onPointerDown={onPointerDown}
        onSelect={handelSkillSelect}
        selected={selectedCell}
        cellData={cellData}
      />
    </FullScreen>
  );
};

export default Playground;
