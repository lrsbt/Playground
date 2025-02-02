import classNames from "classNames";
import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Paused, Play } from "@app/components/Icons";

import { CHAPTERS } from "./data";
import { PlayerData } from "./types";

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

const VideoPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isInitialized, setIsinitialized] = useState(false);

  const playerData = useRef<PlayerData>({
    duration: 0,
    currentTime: 0,
    currentChapterIndex: 0,
    currentChapterPercent: 0,
    chapters: [],
    initialized: false
  });

  // Get elapsed time in total or for after each {index} chapter

  const getEndsAt = (index?: number) => {
    const add = (acc, { duration }, i) => {
      if (typeof index === "number" && i > index) return acc;
      return acc + duration;
    };
    return CHAPTERS.reduce(add, 0);
  };

  // Gets current chapter for a time in seconds

  const getCurrentChapterIndex = (time: number) => {
    const traverse = (acc, a, i) => {
      if (time > a.beginsAt && time < a.endsAt) return i;
      return acc;
    };
    return playerData.current.chapters.reduce(traverse, 0);
  };

  // Initialise total duration and chapters

  const initPlayerData = () => {
    playerData.current.duration = getEndsAt();
    const chapters = CHAPTERS.map((c, i) => ({
      ...c,
      beginsAt: getEndsAt(i - 1),
      endsAt: getEndsAt(i),
      percent: (100 * c.duration) / playerData.current.duration
    }));
    playerData.current.chapters = chapters;
    setIsinitialized(true);
  };

  const formatTime = (s) => {
    return s < 3600
      ? new Date(s * 1000).toISOString().substr(14, 5)
      : new Date(s * 1000).toISOString().substr(11, 8);
  };

  // Update the player on each tick

  const updatePlayerData = (time) => {
    // work out currentChapterIndex
    const currentChapterIndex = getCurrentChapterIndex(time);
    playerData.current.currentChapterIndex = currentChapterIndex;

    // work out current chapter progress in %
    const currentChapter = playerData.current.chapters[currentChapterIndex];
    playerData.current.currentChapterPercent =
      100 - (100 * (currentChapter.endsAt - time)) / currentChapter.duration;
  };

  // Faking time passing

  const advanceTime = () => {
    setCurrentTime((c) => {
      const newTime = (c += 1);
      updatePlayerData(newTime);
      return newTime;
    });
  };

  // Toggle Playing

  const toggleIsPlaying = () => {
    setIsPlaying((val) => !val);
  };

  useEffect(() => {
    initPlayerData();
  }, [playerData]);

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setTimeout(advanceTime, 10);
      return () => clearTimeout(intervalId);
    }
  }, [isPlaying, currentTime]);

  // console.log(playerData.current);

  return (
    <div className="player" ref={playerRef}>
      <div className="player-video"></div>
      <div className="player-controls">
        <div className="player-settings">
          <PlayButton isPaused={!isPlaying} onPress={toggleIsPlaying} />
          <div className="player-time">
            <span className="player-currentTime">
              {formatTime(currentTime)
                .split("")
                .map((char) => (
                  <span
                    className={classNames({
                      "player-currentTime-digit": !isNaN(Number(char))
                    })}
                  >
                    {char}
                  </span>
                ))}
            </span>

            <span className="player-timeSeperator">/</span>
            <span className="player-totalTime">
              {formatTime(playerData.current.duration)}
            </span>
          </div>
        </div>
        <div className="player-chapters" onClick={() => {}}>
          {isInitialized &&
            playerData.current.chapters.map(({ percent }, i) => {
              const isDone = i < playerData.current.currentChapterIndex;
              const isCurrent = i === playerData.current.currentChapterIndex;

              return (
                <div
                  key={i}
                  data-index={i}
                  style={{ width: `${percent}%` }}
                  className={classNames("chapter", {
                    "chapter--done": isDone,
                    "chapter--current": isCurrent
                  })}
                >
                  {isCurrent && (
                    <div
                      className="chapter-progress"
                      style={{
                        width: `${playerData.current.currentChapterPercent}%`
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export { VideoPlayer };
