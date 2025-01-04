import { Cell } from "./types";
import blenderIcon from "./Assets/Icons/blender.png";
import duolingoIcon from "./Assets/Icons/duolingo.png";
import liveIcon from "./Assets/Icons/live.png";
import wokIcon from "./Assets/Icons/wok.png";
import selectTileSound from "./Assets/Sounds/Audio/click_001.ogg";
import selectedTileSound from "./Assets/Sounds/Audio/switch_005.ogg";
import removeTileSound from "./Assets/Sounds/Audio/back_004.ogg";

export const GRID = 5;
export const CELLSIZE = 50;
export const CELLSPACING = 10;

export const SOUNDS = {
  selectTile: selectTileSound,
  selectedTile: selectedTileSound,
  removeTile: removeTileSound
};

export const initialData: Cell[] = [
  {
    skillName: "Blender",
    location: [1, 1],
    icon: duolingoIcon
  }
];

export const ICONS = {
  blender: blenderIcon,
  duolingo: duolingoIcon,
  live: liveIcon,
  wok: wokIcon
};
