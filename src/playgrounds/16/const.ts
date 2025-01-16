import { Cell } from "./types";

import blenderIcon from "./Assets/Icons/blender.png";
import duolingoIcon from "./Assets/Icons/duolingo.png";
import figmaIcon from "./Assets/Icons/figma.png";
import lightspeedspanishIcon from "./Assets/Icons/lightspeedspanish.png";
import liveIcon from "./Assets/Icons/live.png";
import soundcloudIcon from "./Assets/Icons/soundcloud.png";
import spanishdictIcon from "./Assets/Icons/spanishdict.png";
import wokIcon from "./Assets/Icons/wok.png";

import selectTileSound from "./Assets/Sounds/Audio/click_001.ogg";
import selectedTileSound from "./Assets/Sounds/Audio/switch_003.ogg";
import removeTileSound from "./Assets/Sounds/Audio/switch_005.ogg";

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
    skillName: "duolingo",
    location: [1, 1],
    icon: duolingoIcon
  }
];

export const ICONS = {
  blender: blenderIcon,
  duolingo: duolingoIcon,
  live: liveIcon,
  wok: wokIcon,
  figma: figmaIcon,
  lightspeedspanish: lightspeedspanishIcon,
  soundcloud: soundcloudIcon,
  spanishdict: spanishdictIcon
};
