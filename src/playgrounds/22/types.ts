export type Person = {
  id: number;
  type: "hero" | "npc";
  moveDir: "up" | "down" | "left" | "right" | "none";
  x: number;
  y: number;
};

export type GameState = {
  grid: { rows: number; cols: number };
  people: Person[];
  walls: Set<string>;
};

export type Direction = "up" | "down" | "left" | "right";
