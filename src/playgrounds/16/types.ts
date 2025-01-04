export type Location = {
  x: number;
  y: number;
};

export interface Cell {
  skillName: string;
  location: [number, number];
  icon: string;
}
