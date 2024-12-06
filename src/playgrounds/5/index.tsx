import React, { useEffect, useRef, useState } from "react";
import { colord, extend } from "colord";
import lchPlugin from "colord/plugins/lch";

extend([lchPlugin]);

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { animated, useSprings, useTrail } from "@react-spring/web";

/* 4x4 grid */
const GRID = 4;
const SHAPES = [
  [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0], // o
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1], // x
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1], // ||
  [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0], // |
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1], // x
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] // -
];

interface Location {
  x: number;
  y: number;
}

const Playground = () => {
  const timer = useRef(0);
  const isRunning = useRef(false);
  const [currentShape, setCurrentShape] = useState(0);
  const baseHues = useRef([0, 30, 60, 90, 120, 150, 180, 210]).current;

  const offsetStyles = useTrail(baseHues.length, {
    from: { translateY: -20 },
    to: { translateY: 0 },
    config: { tension: 300, friction: 16 }
  });

  const opacityStyles = useTrail(baseHues.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const [locationStyles, locationsAPI] = useSprings(
    baseHues.length,
    () => ({
      to: {
        translateX: 10,
        translateY: 0
      }
    }),
    []
  );

  const [floats, floatsAPI] = useTrail(
    baseHues.length,
    () => ({
      from: {
        x: 0,
        y: 0
      }
    }),
    []
  );

  const next = (e?: any) => {
    setCurrentShape((c) => (c + 1 >= SHAPES.length ? 0 : c + 1));
  };

  const getLocationsForShape = (shape: number[]): (Location | undefined)[] => {
    return shape
      .map((s: number, i: number) => {
        if (s) {
          const row = Math.floor(i / GRID);
          return {
            x: i - row * GRID,
            y: row
          };
        }
      })
      .filter((e) => e);
  };

  const animateToLocations = (locations: (Location | undefined)[]) => {
    locationsAPI.start((i) => {
      const loc = locations[i];
      if (loc)
        return {
          to: {
            translateX: loc.x * GRID * 2,
            translateY: loc.y * GRID * 2
          },
          config: {
            friction: 20
          }
        };
    });
    floatsAPI.start({
      x: Math.random() * 15,
      y: Math.random() * 15,
      config: {
        tension: 300
        // friction: 20
      }
    });
  };

  const animateToNextShape = () => {
    const shape = SHAPES[currentShape];
    const locations = getLocationsForShape(shape);
    animateToLocations(locations);
  };

  useEffect(() => {
    animateToNextShape();
  }, [currentShape]);

  const autoAdvance = () => {
    timer.current = setTimeout(() => {
      next();
      autoAdvance();
    }, 1000);
  };

  // Somehow this triggers twice, so i used a ref to stop it
  useEffect(() => {
    if (isRunning.current === false) autoAdvance();
    isRunning.current = true;
  }, []);

  return (
    <FullScreen centerContent info={info}>
      <a className="leds" onClick={next}>
        {baseHues.map((h, i) => {
          return (
            <animated.div
              key={h}
              className="led"
              style={{
                ...offsetStyles[i],
                ...opacityStyles[i],
                ...locationStyles[i],
                ...floats[i]
              }}
            >
              <div
                className="led-base"
                style={{
                  backgroundColor: colord({ h, s: 100, l: 82 }).toHex()
                }}
              ></div>
            </animated.div>
          );
        })}
      </a>
    </FullScreen>
  );
};

export default Playground;
