import React, { useState } from "react";

interface Props extends React.ComponentProps<"div"> {}

const Terminal = ({ children }: Props) => {
  const [currentLine, setCurrentLine] = useState(0);

  return (
    <div className="terminal terminal--dark">
      <div className="terminal-header" />
      <div className="terminal-content">
        {React.Children.map(children, (child, i) =>
          React.cloneElement(child, {
            isActive: currentLine === i,
            isDone: currentLine > i,
            onFinish: () => {
              setCurrentLine((index) => (index += 1));
            }
          })
        )}
      </div>
    </div>
  );
};

export { Terminal };
