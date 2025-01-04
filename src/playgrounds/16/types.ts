export type Location = {
  x: number;
  y: number;
};

export interface Cell {
  id: number;
  skillName: string;
  location: [number, number];
  icon: string;
}
