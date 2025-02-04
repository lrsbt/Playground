import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { Paused, Play } from "@app/components/Icons";

const PlayButton = ({
  isPaused,
  onPress
}: {
  isPaused: boolean;
  onPress: () => void;
}) => {
  const [styles] = useSpring(
    () => ({
      scale: isPaused ? 0 : 1,
      config: {
        tension: 300
      }
    }),
    [isPaused]
  );

  return (
    <div className="player-settings-playButton">
      <animated.div style={{ position: "absolute", ...styles }}>
        <Paused onClick={onPress} />
      </animated.div>
      <animated.div
        style={{
          position: "absolute",
          scale: styles.scale.to((v) => 1 - v)
        }}
      >
        <Play onClick={onPress} />
      </animated.div>
    </div>
  );
};

export { PlayButton };
