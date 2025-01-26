import React, { useState } from "react";
import { Terminal, Line, Span } from "./Terminal";

const Animation = () => (
  <Terminal>
    <Line>
      <Span className="red">npm </Span>
      <Span className="blue">install </Span>
      <Span>react 🥺</Span>
    </Line>
    <Line noPrompt typeDelay={0} postDelay={0} className="bright">
      added 231 packages in 6s
    </Line>
    <Line noPrompt typeDelay={0} postDelay={1000}>
      ShipThis installed 😎
    </Line>
    <Line>
      <Span className="red">One </Span>
      <Span className="blue">Two </Span>
      <Span>Three</Span>
    </Line>
  </Terminal>
);

export { Animation };
