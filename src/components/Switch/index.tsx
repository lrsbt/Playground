import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import classNames from "classNames";

interface Location {
  width: number;
  offsetX: number;
}

const Switch = () => {
  const refs = useRef<any[]>([]);
  const options = useRef(["Version1", "Vers22"]).current;
  const [locations, setLocations] = useState<Location[] | null>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (refs.current.length === options.length) {
      const locs = refs.current.map(
        ({ offsetWidth: width, offsetLeft: offsetX }) => ({ width, offsetX })
      );
      setLocations(locs);
    }
  }, [refs.current]);

  const [style] = useSpring(
    () => ({
      translateX: locations?.[selectedIndex]?.offsetX,
      width: locations?.[selectedIndex]?.width,
      config: {
        tension: 300,
        friction: 20
      }
    }),
    [selectedIndex, locations]
  );

  return (
    <div className="switch">
      <div className="switch-content">
        <animated.div className="switch-active" style={style} />
        {options.map((option, i) => (
          <a
            key={option}
            ref={(el) => (refs.current[i] = el)}
            onClick={() => setSelectedIndex(i)}
            className={classNames("switch-option", {
              "switch-option--active": i === selectedIndex
            })}
          >
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

export { Switch };
