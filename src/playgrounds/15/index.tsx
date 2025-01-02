import React, { useRef, useState } from "react";
import { useSpringRef } from "@react-spring/web";
import { FullScreen } from "@app/components";

import { Grid } from "./Grid";
import { useDraggableArea } from "./useDraggableArea";

import "./styles.css";
import info from "./info.md";
import { CELLSIZE, CELLSPACING } from "./const";

const initialData = [
  {
    id: 1,
    skillName: "Blender",
    location: [4, 6],
    icon: ""
  }
];

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

  const [cellData, setCellData] = useState(initialData);

  const selectActualCell = (e) => {
    const { offsetLeft, offsetTop } = e.target;
    const col = offsetLeft / (CELLSIZE + CELLSPACING);
    const row = offsetTop / (CELLSIZE + CELLSPACING);
    setSelectedCell([col, row]);
  };

  const handelSkillSelect = (e) => {
    onPointerSelect(() => {
      panTo(e);
      selectActualCell(e);
    });
  };

  return (
    <FullScreen centerContent stretch info={info}>
      <div className="dragarea" onPointerDown={onPointerDown}></div>
      <Grid
        style={areaStyle}
        ref={dragAreaRef}
        onPointerDown={onPointerDown}
        onSelect={handelSkillSelect}
        selected={selectedCell}
      />
    </FullScreen>
  );
};

export default Playground;
