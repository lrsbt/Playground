export type Person = {
  id: number;
  type: "hero" | "npc";
  x: number;
  y: number;
};

export type GameState = {
  people: Person[];
  walls: Set<string>;
};
