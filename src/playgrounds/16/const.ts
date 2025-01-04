import { Cell } from "./types";
import icon from "./Assets/icon.png";
import icon2 from "./Assets/icon2.png";

export const GRID = 5;
export const CELLSIZE = 50;
export const CELLSPACING = 25;

export const initialData: Cell[] = [
  {
    id: 1,
    skillName: "Blender",
    location: [1, 1],
    icon: icon
  },
  {
    id: 2,
    skillName: "Blender",
    location: [2, 1],
    icon: icon2
  },
  {
    id: 2,
    skillName: "Blender",
    location: [3, 1],
    icon: ""
  }
];
