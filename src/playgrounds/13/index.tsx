import React, { useEffect, useRef, useState } from "react";
import { FullScreen } from "@app/components";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

import "./styles.css";
import info from "./info.md";
import classNames from "classNames";

const Locations = [
  {
    name: "node--one",
    location: { x: 200, y: 450 }
  },
  {
    name: "node--two",
    location: { x: 400, y: 250 }
  },
  {
    name: "node--three",
    location: { x: 50, y: 50 }
  }
];

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const Playground = () => {
  const areaRef = useSpringRef();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rect, setRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const style = useSpring({
    translateX: 0,
    translateY: 0,
    ref: areaRef
  });

  const panTo = (e, index) => {
    setSelectedIndex(index);
    const pos = e.target.getBoundingClientRect();
    setRect(pos);

    const d = {
      x: window.innerWidth / 2 - pos.x + delta.x,
      y: window.innerHeight / 2 - pos.y + delta.y
    };

    areaRef.start({
      translateX: d.x,
      translateY: d.y
    });

    setDelta({ x: d.x, y: d.y });
  };

  return (
    <FullScreen centerContent info={info}>
      <div className="center" style={{ left: center.x, top: center.y }} />

      <animated.div className="area" style={style}>
        {Locations.map(({ name, location: { x, y } }, i) => (
          <div
            key={name}
            style={{ top: x, left: y }}
            onClick={(e) => panTo(e, i)}
            className={classNames(`node ${name}`, {
              "node--selected": i === selectedIndex
            })}
          />
        ))}
        {/* {rect && (
          <div
            className="rect"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height
            }}
          />
        )} */}
      </animated.div>
    </FullScreen>
  );
};

export default Playground;
