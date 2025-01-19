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
  onFinish?: () => void;
  preDelay?: number;
  typeDelay?: number;
}

const TerminalLine = ({
  isActive,
  children,
  onFinish = () => {},
  preDelay = 600,
  typeDelay = 30
}: TerminalLineProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (isActive) run();
  }, [isActive]);

  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const run = async () => {
    if (typeof children === "string") {
      await typeString(children, preDelay, typeDelay, onFinish);
    } else if (typeof children === "object") {
      await typeChildren(children);
    } else {
      onFinish();
    }
  };

  // Writes out a "string" of text

  const typeString = async (
    text: string,
    preDelay: number,
    typeDelay: number,
    callback: () => void
  ) => {
    const runIt = async () => {
      for (const char of text) {
        setText((t) => `${t}${char}`);
        await wait(typeDelay);
      }
    };

    await wait(preDelay);
    await runIt();
    callback();
  };

  // Handles <span>myText</span>

  const typeChildren = async (children: any) => {
    const runIt = async () => {
      for (let i = 0; i < children.length; i++) {
        const { type, props } = children[i];
        setText((t) => `${t}<${type} class="${props.className}">`);
        await typeString(props.children, 0, typeDelay, () => {});
        setText((t) => `${t}</${type}>`);
      }
    };

    await wait(preDelay);
    await runIt();
    onFinish();
  };

  return <div className="terminal-line">{ReactHtmlParser(text)}</div>;
};

export { Terminal, TerminalLine };
