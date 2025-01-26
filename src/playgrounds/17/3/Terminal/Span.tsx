import classNames from "classNames";
import React, { useEffect, useState } from "react";
import { wait } from "../utils/wait";

export interface GenericProps {
  typeDelay?: number;
  postDelay?: number;
}

interface Props extends GenericProps {
  children: string;
  className?: string;
  isActive?: boolean;
  onFinish?: () => void;
}

const Span = ({
  children,
  className,
  isActive,
  onFinish,
  typeDelay = 30,
  postDelay = 0
}: Props) => {
  const [text, setText] = useState("");

  const typeString = async (text: string) => {
    const runIt = async () => {
      for (const char of text) {
        setText((t) => `${t}${char}`);
        if (typeDelay) await wait(typeDelay);
      }
    };

    await runIt();
    await wait(postDelay);
    if (typeof onFinish === "function") onFinish();
  };

  useEffect(() => {
    if (isActive) typeString(children);
  }, [isActive]);

  return <span className={classNames("terminal-span", className)}>{text}</span>;
};

export { Span };
