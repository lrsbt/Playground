import React, { useRef, useState } from "react";
import classNames from "classNames";
import { animated, useTrail } from "@react-spring/web";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const items = useRef(["a", "b", "c", "d", "e"]);
  const [selected, setSelected] = useState(0);

  const trails = useTrail(items.current.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      friction: 12
    }
  });

  return (
    <FullScreen centerContent info={info}>
      {items.current.map((item, i) => (
        <animated.div
          key={i}
          className={classNames("item", {
            "item--selected": i === selected
          })}
          style={trails[i]}
          onClick={() => setSelected(i)}
        >
          {item}
        </animated.div>
      ))}
    </FullScreen>
  );
};

export default Playground;
