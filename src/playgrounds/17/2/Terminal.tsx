import classNames from "classNames";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";

interface Props extends React.ComponentProps<"div"> {
  startDelay?: number;
  typeDelay?: number;
  lineDelay?: number;
  title?: string;
  children: React.ReactNode;
}

const Terminal = ({ title, className, children }: Props) => {
  const [currentLine, setCurrentLine] = useState(0);

  return (
    <div className={classNames("terminal", className)}>
      <div className="terminal-header">{title}</div>
      <div className="terminal-content">
        {React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {
            isActive: currentLine === i,
            isDone: currentLine > i,
            onFinish: () => {
              setCurrentLine((l) => (l += 1));
            }
          });
        })}
      </div>
    </div>
  );
};

interface TerminalLineProps {
  children: React.ReactNode;
  type?: "input" | "progress";
  delay?: number;
  prompt?: string;
  //
  isActive?: boolean;
  isDone?: boolean;
  onFinish?: () => void;
  preDelay?: number;
  postDelay?: number;
  typeDelay?: number;
}

const TerminalLine = ({
  isActive,
  isDone,
  children,
  preDelay = 0,
  postDelay = 2000,
  typeDelay = 25,
  onFinish = () => {}
}: TerminalLineProps) => {
  const [text, setText] = useState("");

  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const run = async () => {
    await wait(preDelay);

    if (typeof children === "string") {
      await typeString(children, typeDelay);
    } else if (typeof children === "object") {
      await typeChildren(children);
    }

    await wait(postDelay);
    onFinish();
  };

  // Writes out a "string" of text

  const typeString = async (text: string, typeDelay: number) => {
    const runIt = async () => {
      for (const char of text) {
        setText((t) => `${t}${char}`);
        await wait(typeDelay);
      }
    };

    await runIt();
  };

  // Handles <span>myText</span>

  const typeChildren = async (children: any) => {
    const runIt = async () => {
      for (let i = 0; i < children.length; i++) {
        const { type, props } = children[i];
        setText((t) => `${t}<${type} class="${props.className}">`);
        await typeString(props.children, props.typeDelay || typeDelay);
        setText((t) => `${t}</${type}>`);
      }
    };

    await runIt();
  };

  useEffect(() => {
    if (isActive) run();
  }, [isActive]);

  return (
    <div
      className={classNames("terminal-line", {
        "terminal-line--active": isActive && text,
        "terminal-line--done": isDone
      })}
    >
      {ReactHtmlParser(text)}
    </div>
  );
};

export { Terminal, TerminalLine };
