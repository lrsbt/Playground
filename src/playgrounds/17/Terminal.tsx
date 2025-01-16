import classNames from "classNames";
import React, { useEffect, useState } from "react";

interface Props extends React.ComponentProps<"div"> {
  startDelay?: number;
  typeDelay?: number;
  lineDelay?: number;
  progressLength?: number;
  progressChar?: string;
  progressPercent?: number;
  cursor?: string;
  title?: string;
  children: React.ReactNode;
}

const Terminal = ({
  startDelay = 600,
  typeDelay = 50,
  lineDelay = 1500,
  // progressLength = 40,
  // progressChar = "█",
  // progressPercent = 100,
  // cursor = "▋",
  title,
  className,
  children
}: Props) => {
  const lines = React.Children.toArray(children);
  const [currentLine, setCurrentLine] = useState(0);
  const [output, setOutput] = useState<string[]>([""]);

  const _type = async (line, lineIndex) => {
    const chars = [...line.props.children];
    const delay = line?.props.delay || typeDelay;
    setCurrentLine(lineIndex);

    for (const char of chars) {
      await _wait(delay);
      setOutput((o) => {
        o[lineIndex] = o[lineIndex] ? (o[lineIndex] += char) : char;
        return [...o];
      });
    }
  };

  const _progress = async (line, lineIndex) => {
    const progressLength = 20;
    const progressChar = "█";
    const chars = progressChar.repeat(progressLength);
    const progressPercent = 100;
    setCurrentLine(lineIndex);

    for (let i = 1; i < chars.length + 1; i++) {
      await _wait(typeDelay);
      const percent = Math.round((i / chars.length) * 100);

      setOutput((o) => {
        o[lineIndex] = `${chars.slice(0, i)} ${percent}%`;
        return [...o];
      });

      if (percent > progressPercent) {
        break;
      }
    }
  };

  const _wait = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    start();
  };

  console.log(output);

  const start = async () => {
    await _wait(startDelay);

    for (const [lineIndex, line] of lines.entries()) {
      const type = line?.props.type;
      const delay = line?.props.delay || lineDelay;

      if (type == "input") {
        await _type(line, lineIndex);
        await _wait(delay);
      } else if (type == "progress") {
        await _progress(line, lineIndex);
        await _wait(delay);
      }

      // if (type == "input") {
      //   line.setAttribute(`${this.pfx}-cursor`, this.cursor);
      //   await this.type(line);
      //   await this._wait(delay);
      // } else if (type == "progress") {
      //   await this.progress(line);
      //   await this._wait(delay);
      // } else {
      //   this.container.appendChild(line);
      //   await this._wait(delay);
      // }
      // line.removeAttribute(`${this.pfx}-cursor`);
    }
  };

  return (
    <div className={classNames("terminal", className)}>
      <div className="terminal-header">{title}</div>
      <div className="terminal-content">
        {output.map((o, i) => (
          <div
            key={i}
            className={classNames("terminal-line", {
              "terminal-line--active": i === currentLine
            })}
          >
            {o}
          </div>
        ))}
      </div>
    </div>
  );
};

interface TerminalLineProps {
  children: React.ReactNode;
  type?: "input" | "progress";
  delay?: number;
  typeDelay?: number;
  prompt?: string;
}

const TerminalLine = ({ children }: TerminalLineProps) => {
  return children;
};

export { Terminal, TerminalLine };
