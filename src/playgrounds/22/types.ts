type PersonType = "hero" | "npc" | "enemy";

export type Person = {
  id: number;
  x: number;
  y: number;
  type: PersonType;
  moveDir: Direction | "none";
  hp: number;
  att: number;
  def: number;
};

export type GameState = {
  grid: { rows: number; cols: number };
  people: Person[];
  walls: Set<string>;
};

export type Direction = "up" | "down" | "left" | "right";
