import React, { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "./data";
import { Play } from "@app/components/Icons";

const VideoPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [chapterWidths, setChapterWidths] = useState<number[] | null>(null);

  const getTotalTime = async () => {
    const add = (acc, a) => acc + a.length;
    return CHAPTERS.reduce(add, 0);
  };

  const getChapterWidths = async () => {
    const playerWidth = playerRef.current?.clientWidth;
    if (!playerWidth) return;
    const progressWidthTotal = playerWidth - 20; // subtract padding
    const totalTime = await getTotalTime();
    const chapterWidths = CHAPTERS.map((c) => {
      return (progressWidthTotal * c["length"]) / totalTime;
    });
    setChapterWidths(chapterWidths);
  };

  useEffect(() => {
    getChapterWidths();
  }, [playerRef]);

  return (
    <div className="player" ref={playerRef}>
      <div className="player-video"></div>
      <div className="player-controls">
        <div className="player-settings">
          <Play />
        </div>
        <div className="player-progress">
          {chapterWidths?.map((width, i) => (
            <div key={i} className="progress-chapter" style={{ width }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { VideoPlayer };
