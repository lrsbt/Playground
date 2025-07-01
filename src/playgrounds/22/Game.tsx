import React, { useState } from "react";
import { GameState } from "./types";

const initialGameState: GameState = {
  people: [
    { id: 1, x: 1, y: 1, type: "hero" },
    { id: 2, x: 4, y: 3, type: "npc" },
  ],
  walls: new Set(["3:1", "4:1", "2:2"]),
};

const initGrid = (rows: number, cols: number) => {
  return [...Array(rows)].map(() => [...Array(cols)].map(() => null));
};

const getCellType = (
  x: number,
  y: number,
  gameState: GameState
): "hero" | "npc" | "wall" | "cell" => {
  const coord = `${y}:${x}`;

  if (gameState.walls.has(coord)) return "wall";

  const person = gameState.people.find((p) => p.x === x && p.y === y);
  if (person) return person.type;

  return "cell";
};

const Tile = ({
  type,
  children,
}: {
  type: "hero" | "npc" | "wall" | "cell";
  children: React.ReactNode;
}) => <span className={`tile tile--${type}`}>{children}</span>;

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [grid, setGrid] = useState(initGrid(10, 10));

  return (
    <div className="game">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => {
            const key = `${rowIndex}:${colIndex}`;
            const cellType = getCellType(colIndex, rowIndex, gameState);
            return (
              <Tile key={key} type={cellType}>
                ⬜
              </Tile>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export { Game };
