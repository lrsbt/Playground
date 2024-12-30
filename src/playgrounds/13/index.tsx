import classNames from "classNames";
import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

import { Locations } from "./const";
import { elHasClass } from "@app/utils";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const areaSpringRef = useSpringRef();
  const [activeIndex, setAciveIndex] = useState<number | null>(null);

  const areaStart = useRef([0, 0]);
  const areaCurrent = useRef([0, 0]);
  const areaLast = useRef([0, 0]);

  const areaStyle = useSpring({
    translateX: 0,
    translateY: 0,
    ref: areaSpringRef
  });

  const [locationStyle, locationApi] = useSpring(() => ({
    from: { scale: 2 },
    to: { scale: 1 }
  }));

  const selectLocation = (index: number) => {
    setAciveIndex(index);
    locationApi.start({
      from: { scale: 2 },
      to: { scale: 1 },
      config: { friction: 6 }
    });
  };

  const panTo = (event, index: number) => {
    selectLocation(index);

    const cam = [window.innerWidth / 2, window.innerHeight / 2];
    const targetRect = event.target.getBoundingClientRect();
    const areaDelta = [targetRect.x - cam[0] + 2, targetRect.y - cam[1] + 2];

    areaCurrent.current = [
      areaLast.current[0] - areaDelta[0],
      areaLast.current[1] - areaDelta[1]
    ];

    areaSpringRef.start({
      translateX: areaCurrent.current[0],
      translateY: areaCurrent.current[1],
      config: {
        tension: 150
      }
    });

    areaLast.current = areaCurrent.current;
  };

  const onPointerDown = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (elHasClass(event, "node")) return;
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    areaStart.current = [event.clientX, event.clientY];
  };

  const OnPointerMove = (event: MouseEvent) => {
    const areaDelta = [
      areaStart.current[0] - event.clientX,
      areaStart.current[1] - event.clientY
    ];

    areaCurrent.current = [
      areaLast.current[0] - areaDelta[0],
      areaLast.current[1] - areaDelta[1]
    ];

    if (areaRef.current) {
      areaRef.current.style.cssText = `
        transform: translate(
          ${areaCurrent.current[0]}px,
          ${areaCurrent.current[1]}px
        )
      `;
    }
  };

  const OnPointerUp = (event: MouseEvent) => {
    areaLast.current = areaCurrent.current;
    areaSpringRef.set({
      translateX: areaLast.current[0],
      translateY: areaLast.current[1]
    });
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <FullScreen centerContent info={info}>
      <div
        className="center"
        style={{
          position: "absolute",
          left: window.innerWidth / 2,
          top: window.innerHeight / 2
        }}
      />

      <animated.div
        ref={areaRef}
        className="area"
        style={areaStyle}
        onPointerDown={onPointerDown}
      >
        {Locations.map(({ name, location: { x, y } }, i) => (
          <animated.div
            key={name}
            style={{
              top: x,
              left: y,
              ...(i === activeIndex && locationStyle)
            }}
            onClick={(e) => panTo(e, i)}
            className={classNames(`node ${name}`, {
              "node--selected": i === activeIndex
            })}
          />
        ))}
      </animated.div>
    </FullScreen>
  );
};

export default Playground;
