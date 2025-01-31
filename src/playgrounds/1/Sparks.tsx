import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";

const SPARKS_AMOUNT = 10;
const SPARK_SIZE = 4; // px. Sync in css
const SPARK_RANGE_Y = 150;
const SPARK_RANGE_X = 50;
const BAR_HEIGHT = 50;

const Spark = ({ offsetX }: { offsetX: number }) => {
  const lastOffsetX = useRef(0);
  const offsetDifference = Math.abs(lastOffsetX.current - offsetX);

  const [styles, api] = useSpring(() => ({
    translateY: 0,
    translateX: offsetX,
    opacity: 1,
    scale: 1
  }));

  const spark = () => {
    // BiPolar direction between -150 and 150 ( Spark-Range )
    const newOffsetY = Math.random() * SPARK_RANGE_Y - SPARK_RANGE_Y / 2;

    // Only spark outwards ( Y-Axis )
    // Don't spark within the bar
    const translateY_from = newOffsetY > 0 ? BAR_HEIGHT / 2 : -BAR_HEIGHT / 2;
    const translateY_to = newOffsetY > 0 ? newOffsetY + 25 : newOffsetY - 25;

    // X-Axis
    const translateX_to =
      offsetX + Math.random() * SPARK_RANGE_X - SPARK_RANGE_X / 2;

    lastOffsetX.current = offsetX;
    if (offsetDifference <= 100) return;

    api.start({
      from: {
        translateX: offsetX,
        translateY: translateY_from,
        opacity: 1,
        scale: Math.random() * 1 + 0.5
      },
      to: {
        translateX: translateX_to,
        translateY: translateY_to,
        opacity: 0,
        scale: 0.5
      },
      delay: 100,
      config: {
        tension: Math.random() * 150 + 25
      }
    });
  };

  useEffect(() => {
    spark();
  }, [offsetX]);

  return <animated.div className="spark" style={styles} />;
};

interface SparksProps {
  offsetX: number;
}

const Sparks = ({ offsetX }: SparksProps) => {
  const sparks = [...Array(SPARKS_AMOUNT)];

  const offsetStyles = useSpring({
    translateY: BAR_HEIGHT / 2 - SPARK_SIZE
  });

  return (
    <animated.div className="spark-container" style={offsetStyles}>
      {sparks.map((_, i) => (
        <Spark key={i} offsetX={offsetX} />
      ))}
    </animated.div>
  );
};

export { Sparks };
