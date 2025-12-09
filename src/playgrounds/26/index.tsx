import React, { useEffect, useState } from "react";
import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { getRandomNumber } from "@app/utils";

import { frequencies } from "./data";

const Playground = () => {
  const getBandByFrequency = (freq: number) =>
    frequencies.findIndex((b) => freq >= b.start && freq <= b.end);

  const getBandNames = () => frequencies.map((b) => b.name);

  const getRandomQuizQuestion = () => {
    // Bandwise
    const randomBand =
      frequencies[Math.floor(Math.random() * frequencies.length)];
    const freq = Math.floor(getRandomNumber(randomBand.start, randomBand.end));

    const index = getBandByFrequency(freq);
    const name = frequencies[index]?.name || null;
    return { frequency: freq, correctIndex: index, correctName: name };
  };

  const [question, setQuestion] = useState(getRandomQuizQuestion());
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleChoice = (index: number) => {
    setSelected(index);
    const correctBand = frequencies[question.correctIndex];
    if (index === question.correctIndex) {
      setFeedback(`✅ Correct! ${correctBand.start}–${correctBand.end} Hz)`);
    } else {
      setFeedback(
        `❌ Wrong! Correct: ${correctBand.name} (${correctBand.start}–${correctBand.end} Hz)`
      );
    }

    // load next question after x
    setTimeout(
      () => {
        setQuestion(getRandomQuizQuestion());
        setSelected(null);
        setFeedback("");
      },
      index === question.correctIndex ? 1500 : 5000
    );
  };

  return (
    <FullScreen centerContent info={info}>
      <div className="quiz" style={{ textAlign: "center" }}>
        <h2 className="quiz_question">
          Which frequency band does {question.frequency} Hz belong to?
        </h2>
        <div className="quiz_answers">
          {getBandNames().map((name, i) => (
            <button
              key={i}
              onClick={() => handleChoice(i)}
              disabled={selected !== null}
              style={{
                padding: "10px 15px",
                border: "1px solid #333",
                borderRadius: "5px",
                backgroundColor:
                  selected === i
                    ? i === question.correctIndex
                      ? "#4caf50"
                      : "#f44336"
                    : frequencies?.[i].color,
                color: selected === i ? "#fff" : "#000",
                cursor: selected === null ? "pointer" : "default"
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="quiz_feedback">{feedback && <p>{feedback}</p>}</div>
      </div>
    </FullScreen>
  );
};

export default Playground;
