import soundClick1 from "../16/Assets/Sounds/Audio/click_002.ogg";
import soundClick2 from "../16/Assets/Sounds/Audio/click_003.ogg";
import { Member } from "./types";

export const SOUNDS = {
  click1: soundClick1,
  click2: soundClick2,
};

export const MEMBERS: Member[] = [
  {
    id: 1,
    name: "Juma Umondi",
    email: "juma@aligngui.com",
    permission: "view",
    image: "https://picsum.photos/id/902/100",
  },
  {
    id: 2,
    name: "Arthur Taylor",
    email: "arthur@aligngui.com",
    permission: "view",
    image: "https://picsum.photos/id/549/100",
  },
  {
    id: 3,
    name: "Laura Perez",
    email: "laura@aligngui.com",
    permission: "view",
    image: "https://picsum.photos/id/20/100",
  },
];
