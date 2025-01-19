import classNames from "classNames";
import React, { useEffect, useRef, useState } from "react";

interface Props extends React.ComponentProps<"div"> {
  startDelay?: number;
  typeDelay?: number;
  lineDelay?: number;
  title?: string;
  children: React.ReactNode;
}

const Terminal = ({
  startDelay = 600,
  typeDelay = 30,
  lineDelay = 1500,
  title,
  className,
  children
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const lines = React.Children.toArray(children);
  const [currentLine, setCurrentLine] = useState(0);
  const [output, setOutput] = useState<string[]>([""]);

  const _write = (lineIndex: number, text: string, replace?: boolean) => {
    setOutput((o) => {
      if (replace) {
        o[lineIndex] = `<div class="terminal-line">${text}</div>`;
        return [...o];
      } else {
        o[lineIndex] = o[lineIndex] ? (o[lineIndex] += text) : text;
        return [...o];
      }
    });
  };

  const _type = async (line, lineIndex) => {
    const chars = [...line.props.children];
    const delay = line?.props.delay || typeDelay;
    setCurrentLine(lineIndex);

    for (const char of chars) {
      await _wait(delay);
      _write(lineIndex, char);
    }
  };

  const _typeWithChildren = async (line, lineIndex) => {
    const children = line.props.children;

    for (let i = 0; i < children.length; i++) {
      _write(lineIndex, `<span class="${children[i]?.props?.className}">`);
      await _type(children[i], lineIndex);
      _write(lineIndex, `</span>`);
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
      const text = `${chars.slice(0, i)} ${percent}%`;
      _write(lineIndex, text, true);

      if (percent > progressPercent) {
        break;
      }
    }
  };

  const _wait = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const start = async () => {
    await _wait(startDelay);

    for (const [lineIndex, line] of lines.entries()) {
      const { props } = line;
      const type = props?.type;
      const delay = props?.delay || lineDelay;
      const hasChildren = typeof props?.children === "object";

      _write(lineIndex, `<div class="terminal-line">`);

      if (type == "input") {
        if (hasChildren) {
          await _typeWithChildren(line, lineIndex);
        } else {
          await _type(line, lineIndex);
        }
        await _wait(delay);
      } else if (type == "progress") {
        await _progress(line, lineIndex);
        await _wait(delay);
      } else {
        // this.container.appendChild(line);
        await _wait(delay);
      }

      _write(lineIndex, "</div>");
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML =
        output.join("") + `<span class="cursor">_</span>`;
    }
  }, [output]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    start();
  };

  return (
    <div className={classNames("terminal", className)}>
      <div className="terminal-header">{title}</div>
      <div className="terminal-content" ref={contentRef}></div>
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
