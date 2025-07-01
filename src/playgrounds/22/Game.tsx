import React, { useEffect, useState } from "react";
import { Direction, GameState } from "./types";
import { Tile } from "./Tile";

const initialGameState: GameState = {
  grid: {
    rows: 10,
    cols: 10,
  },
  people: [
    { id: 1, x: 1, y: 1, type: "hero", moveDir: "down" },
    { id: 2, x: 4, y: 3, type: "npc", moveDir: "down" },
  ],
  walls: new Set(["3:1", "4:1", "2:2"]),
};

const getCellType = (
  x: number,
  y: number,
  gameState: GameState
): "hero" | "npc" | "wall" | "cell" => {
  const coord = `${y}:${x}`;

  if (gameState.walls.has(coord)) return "wall";

  const person = gameState.people.find((p) => p.x === x && p.y === y);
  return person ? person.type : "cell";
};

const chance = (n: number) => Math.random() < 1 / n;

const randomDirection = (current?: Direction): Direction => {
  const opposites: Record<Direction, Direction> = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  const allDirections: Direction[] = ["up", "down", "left", "right"];
  const filtered = current
    ? allDirections.filter((d) => d !== opposites[current])
    : allDirections;

  return filtered[Math.floor(Math.random() * filtered.length)];
};

const moveHero = (prev: GameState): GameState => {
  const { rows, cols } = prev.grid;

  const updatedPeople = prev.people.map((p) => {
    if (!p.moveDir || p.moveDir === "none") return p;

    let moveDir = p.moveDir;

    if (chance(2)) {
      moveDir = randomDirection(moveDir);
    }

    const [dx, dy] = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    }[moveDir];

    const nextX = p.x + dx;
    const nextY = p.y + dy;
    const nextCoord = `${nextY}:${nextX}`;

    const outOfBounds =
      nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows;
    const hitsWall = prev.walls.has(nextCoord);

    if (outOfBounds || hitsWall) {
      // pick a new random direction
      return { ...p, moveDir: randomDirection() };
    }

    return { ...p, x: nextX, y: nextY };
  });

  return { ...prev, people: updatedPeople };
};

const Game = () => {
  const { rows, cols } = initialGameState.grid;
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // inside your <Game> component
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => moveHero(prev));
    }, 100); // 500ms per tick

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="game">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex}>
          {[...Array(cols)].map((_, colIndex) => {
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
