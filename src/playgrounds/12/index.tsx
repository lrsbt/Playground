import React, { useEffect, useRef } from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const Playground = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const d =
    "M3 98.0556L21.5 81.7556C39.9 65.0556 77 33.0556 114 16.3556C150.7 0.0555601 188 0.0555592 225 24.5556C261.5 49.0556 298 98.0556 335 114.356C372.2 131.056 409 114.056 446 106.256C483 98.0556 520 98.0556 557 138.856C593.8 180.056 631 261.056 668 245.056C704.5 229.056 741 114.056 778 81.7556C815.3 49.0556 852 98.0556 889 114.356C926.1 131.056 963 114.056 1000 163.356C1036.8 212.056 1074 327.056 1111 383.856C1147.6 441.056 1185 441.056 1221 367.556C1258.4 294.056 1295 147.056 1332 73.5556C1369.2 0.0555573 1406 0.0555611 1443 40.8556";

  const offset = useSpringValue(0, {
    // onChange: (v) => {
    //   const x1 = pathRef.current?.getPointAtLength(v).x || 0;
    //   const y1 = pathRef.current?.getPointAtLength(v).y || 0;
    //   const x2 =
    //     pathRef.current?.getPointAtLength(v - Math.sin(v / 100) * 10 - 20).x ||
    //     0;
    //   const y2 =
    //     pathRef.current?.getPointAtLength(v - Math.sin(v / 100) * 10 - 20).y ||
    //     0;

    //   const angle = Math.atan2(y2 - y1, x2 - x1);
    //   console.log((angle * 180) / Math.PI);
    // },
    config: {
      duration: 15000
    }
  });

  useEffect(() => {
    offset.start({ to: pathRef.current?.getTotalLength(), loop: true });
  }, []);

  return (
    <FullScreen centerContent info={info}>
      <div className="wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1440"
          height="420"
          fill="none"
          viewBox="0 0 1440 420"
          stroke="red"
          strokeWidth="2"
          className="path"
        >
          <path d={d} ref={pathRef} />
        </svg>
        <animated.div
          className="led-base"
          style={{
            translateY: offset.to(
              (v) => pathRef.current?.getPointAtLength(v).y || 0
            ),
            translateX: offset.to(
              (v) => pathRef.current?.getPointAtLength(v).x || 0
            )
          }}
        />
        <animated.div
          className="led-base"
          style={{
            translateY: offset.to(
              (v) =>
                pathRef.current?.getPointAtLength(
                  v - Math.sin(v / 100) * 10 - 20
                ).y || 0
            ),
            translateX: offset.to(
              (v) =>
                pathRef.current?.getPointAtLength(
                  v - Math.sin(v / 100) * 10 - 20
                ).x || 0
            )
          }}
        />
      </div>
    </FullScreen>
  );
};

export default Playground;
