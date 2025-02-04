import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { easings } from "@react-spring/web";

const SPARKS_AMOUNT = 10;
const SPARK_SIZE = 4; // px. Sync in css
const SPARK_RANGE_Y = 100;
const SPARK_RANGE_X = 50;
const BAR_HEIGHT = 6;

const Spark = ({ trigger }: { trigger: number }) => {
  const [styles, api] = useSpring(() => ({
    translateY: 0,
    translateX: 0,
    scale: 1
  }));

  const [opacity, apiOpacity] = useSpring(() => ({
    opacity: 1
  }));

  const spark = () => {
    // BiPolar direction between -150 and 150 ( Spark-Range )
    const newOffsetY = Math.random() * SPARK_RANGE_Y - SPARK_RANGE_Y / 2;

    // Only spark outwards ( Y-Axis )
    // Don't spark within the bar
    const translateY_from = newOffsetY > 0 ? BAR_HEIGHT / 2 : -BAR_HEIGHT / 2;
    const translateY_to = newOffsetY > 0 ? newOffsetY + 25 : newOffsetY - 25;

    // X-Axis
    const translateX_to = Math.random() * SPARK_RANGE_X - SPARK_RANGE_X / 2;

    api.start({
      from: {
        translateX: 0,
        translateY: translateY_from,
        scale: Math.random() * 1.2 + 1
      },
      to: {
        translateX: translateX_to,
        translateY: translateY_to,
        scale: 0.25
      },
      config: {
        tension: 25
      }
    });

    apiOpacity.start({
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      },
      delay: 1500,
      easing: easings.easeInQuint,
      config: {
        duration: 1500
      }
    });
  };

  useEffect(() => {
    spark();
  }, [trigger]);

  if (trigger === 0) return null;

  return <animated.div className="spark" style={{ ...styles, ...opacity }} />;
};

interface SparksProps {
  trigger: number;
}

const Sparks = ({ trigger }: SparksProps) => {
  const sparks = [...Array(SPARKS_AMOUNT)];

  const offsetStyles = useSpring({
    translateY: BAR_HEIGHT / 2 - SPARK_SIZE
  });

  return (
    <animated.div className="spark-container" style={offsetStyles}>
      {sparks.map((_, i) => (
        <Spark key={i} trigger={trigger} />
      ))}
    </animated.div>
  );
};

export { Sparks };
