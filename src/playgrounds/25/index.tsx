import React, { useEffect, useState } from "react";
import { button, Leva, useControls } from "leva";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Item } from "./Components";
import { toMMSS } from "./utils";

const Playground = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const { bpm, bars, x8, isPlaying } = useControls({
    bpm: {
      value: 124,
      min: 40,
      max: 1000,
      step: 1,
    },
    bars: {
      value: 10,
      min: 1,
      max: 200,
      step: 1,
    },
    x8: false,
    isPlaying: false,
    resetTimer: button((get) => setCurrentTime(0)),
  });

  const advanceTime = () => {
    setCurrentTime((c) => {
      const newTime = (c += 100);
      // updatePlayerData(newTime);
      // console.log(newTime);
      return newTime;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setTimeout(advanceTime, 100);
      return () => clearTimeout(intervalId);
    }
  }, [isPlaying, currentTime]);

  const oneBarSec = (60 / bpm) * 4;

  return (
    <FullScreen className="arr-bg" info={info}>
      <div className="wrap">
        {[...Array(bars)].map((bar, i) => {
          const currentBar = i * 8; // 0, 8, 16, 24
          const seconds = oneBarSec * currentBar;
          const barTimer = currentTime / (oneBarSec * 8 * 1000);
          const activeBar = Math.floor(barTimer);
          return (
            <Item
              key={i}
              isActive={activeBar === i}
              isDone={i < activeBar}
              id={currentBar / (x8 ? 1 : 8) + 1}
              t={toMMSS(seconds)}
              percent={barTimer * 100 - activeBar * 100}
            />
          );
        })}
      </div>
    </FullScreen>
  );
};

export default Playground;
