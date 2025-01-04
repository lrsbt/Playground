import React, { useRef, useState } from "react";
import useSound from "use-sound";
import { useSpringRef } from "@react-spring/web";
import { FullScreen } from "@app/components";

import { Grid } from "./Grid";
import { Cell } from "./types";
import { CELLSIZE, CELLSPACING, initialData, SOUNDS } from "./const";
import { useDraggableArea } from "./useDraggableArea";

import "./styles.css";
import info from "./info.md";
import { Toolbar } from "./Toolbar";

const Playground = () => {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const dragAreaSpringRef = useSpringRef();

  const [playSelectSound] = useSound(SOUNDS.selectTile, {
    playbackRate: Math.random() * 0.3 + 0.7
  });

  const [playSelectedSound] = useSound(SOUNDS.selectedTile, {
    playbackRate: Math.random() * 0.3 + 0.7
  });

  const [playRemoveSound] = useSound(SOUNDS.removeTile, {
    playbackRate: Math.random() * 0.3 + 0.7
  });

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );

  const deselect = () => {
    setSelectedCell(null);
  };

  const { areaStyle, onPointerDown, onPointerSelect, panTo } = useDraggableArea(
    dragAreaRef,
    dragAreaSpringRef,
    undefined
    // "dragarea",
    // deselect
  );

  const [cellData, setCellData] = useState<Cell[]>(initialData);

  const selectActualCell = (e) => {
    const myTarget = e.target.closest(".cell");
    const { offsetLeft, offsetTop } = myTarget;
    const col = offsetLeft / (CELLSIZE + CELLSPACING);
    const row = offsetTop / (CELLSIZE + CELLSPACING);
    setSelectedCell([col, row]);
    playSelectSound();
  };

  const handelSkillSelect = (e: MouseEvent) => {
    onPointerSelect(() => {
      panTo(e);
      selectActualCell(e);
    });
  };

  const handeSetCellData = (
    x: number,
    y: number,
    name: string,
    icon: string
  ) => {
    const existingCell: Cell = cellData.filter(
      ({ location }) => `${location}` === `${x},${y}`
    )?.[0];

    console.log(existingCell, name);

    if (existingCell?.skillName === name) {
      playRemoveSound();
      // remove
    }

    // playRemoveSound

    const myCellData = existingCell
      ? cellData.filter(({ location }) => `${location}` !== `${x},${y}`)
      : cellData;

    const newItem: Cell = {
      skillName: name,
      location: [x, y],
      icon: icon
    };

    const newCellData = [...myCellData, newItem];
    setCellData(newCellData);
    playSelectedSound();
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
        cellData={cellData}
      />
      <Toolbar
        handeSetCellData={handeSetCellData}
        selectedCell={selectedCell}
      />
    </FullScreen>
  );
};

export default Playground;
