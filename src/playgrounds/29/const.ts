import image1 from "./Assets/Images/01.jpg";
import image2 from "./Assets/Images/02.jpg";
import image3 from "./Assets/Images/03.jpg";
import image4 from "./Assets/Images/04.jpg";
import { Item } from "./types";

export const DATA: Item[] = [
  {
    id: 1,
    color: "#724421",
    title: ["Design is a journey of", "Discovery"],
    info: ["written by", "William Hernandez, April 06, 2017"],
    link: "Part 1",
    socials: {
      likes: 223,
      views: 349,
      comments: 40
    },
    image: image1
  },
  {
    id: 2,
    color: "#f4b800",
    title: ["I believe more in the", "scissors than I do in the", "pencil"],
    info: ["written by", "John Smith, April 06, 2017"],
    link: "Part 1",
    socials: {
      likes: 12,
      views: 1232,
      comments: 2
    },
    image: image2
  },
  {
    id: 3,
    color: "#f03f37",
    title: ["I don't design clothes", "I design", "dreams"],
    info: ["written by", "Vikram Andrarasha, April 06, 2017"],
    link: "Part 3",
    socials: {
      likes: 3,
      views: 349,
      comments: 40
    },
    image: image4
  },
  {
    id: 4,
    color: "#82aaa9",
    title: ["Design is a journey of", "Discovery"],
    info: ["written by", "William Hernandez, April 06, 2017"],
    link: "Part 4",
    socials: {
      likes: 4,
      views: 349,
      comments: 40
    },
    image: image3
  }
];
