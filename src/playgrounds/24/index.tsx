import React, { useState } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

import { Item } from "./Components";

import type { Item as ItemType } from "./types";

const Playground = () => {
  const [items, setItems] = useState<ItemType[]>([
    {
      id: 1,
      name: "Test",
      columns: [
        {
          id: 1,
          title: "Introo",
          color: "orange",
          bars: 4,
        },
        {
          id: 2,
          title: "Main",
          color: "orange",
          bars: 2,
        },
      ],
    },
  ]);

  return (
    <FullScreen className="arr-bg" info={info}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </FullScreen>
  );
};

export default Playground;
