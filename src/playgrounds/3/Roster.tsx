import React from "react";
import { animated, useTrail } from "@react-spring/web";
import { Color } from "./types";

const Roster = ({ colors }: { colors: Color[] }) => {
  const mainTrails = useTrail(colors.length, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      tension: 300
    }
  });

  return (
    <div className="roster">
      {colors.map(({ color, name }, i) => {
        return (
          <animated.div
            key={name}
            className="roster-item"
            style={mainTrails[i]}
          >
            <animated.div key={color} className="roster-color" data-index={i} />
            <animated.div className="roster-title" style={mainTrails[i]}>
              {name}
            </animated.div>
          </animated.div>
        );
      })}
    </div>
  );
};

export { Roster };
