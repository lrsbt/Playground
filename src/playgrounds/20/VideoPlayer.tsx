import React, { useEffect, useRef, useState } from "react";
import { Play } from "@app/components/Icons";

import { CHAPTERS } from "./data";
import { Chapter } from "./types";
import classNames from "classNames";

const VideoPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const totalTime = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [chapters, setChapters] = useState<Chapter[] | null>(null);

  const getTotalTime = (stopIndex = 1000) => {
    const add = (acc, a, i) => {
      if (i > stopIndex) return acc;
      return acc + a.length;
    };
    return CHAPTERS.reduce(add, 0);
  };

  const getChapterWidths = async () => {
    totalTime.current = getTotalTime();
    const chapterWidths = CHAPTERS.map((c, i) => ({
      ...c,
      width: (100 * c["length"]) / totalTime.current,
      elapsed: getTotalTime(i)
    }));
    setChapters(chapterWidths);
  };

  useEffect(() => {
    if (playerRef.current) getChapterWidths();
  }, [playerRef]);

  const advance = () => {
    setCurrentTime((c) => {
      const isFinished = c > totalTime.current;
      if (!isFinished) setTimeout(advance, 10);
      return (c += 1);
    });
  };

  const handleSetTime = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const myTarget = target
      .closest(".player-progress")
      ?.getBoundingClientRect();

    console.log({ target: e.target.dataset.index });

    if (myTarget) {
      const x =
        (totalTime.current * (e.pageX - myTarget.left)) / myTarget.width;
      setCurrentTime(x);
    }
  };

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) advance();
  }, [isPlaying]);

  return (
    <div className="player" ref={playerRef}>
      <div className="player-video"></div>
      <div className="player-controls">
        <div className="player-settings">
          <Play onClick={togglePlaying} />
        </div>
        <div className="player-progress" onClick={handleSetTime}>
          {chapters?.map(({ length, elapsed, width }, i) => {
            const isDone = currentTime > elapsed;
            const isCurrent =
              currentTime < elapsed && currentTime > chapters?.[i - 1]?.elapsed;
            const currentPercentage =
              isCurrent && 100 - (100 * (elapsed - currentTime)) / length;

            return (
              <div
                key={i}
                data-index={i}
                className={classNames("progress-chapter", {
                  "progress-chapter--done": isDone
                })}
                style={{ width: `${width}%` }}
              >
                {isCurrent && (
                  <div
                    className="progress-chapter-current"
                    style={{ width: `${currentPercentage}%` }}
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
