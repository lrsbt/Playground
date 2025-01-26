import classNames from "classNames";
import React, { useState } from "react";

import { GenericProps, Span } from "./Span";
import { wait } from "../utils/wait";
import { LineChildren } from "./LineChildren";

interface Props extends GenericProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isDone?: boolean;
  onFinish?: () => void;
  postDelay?: number;
  noPrompt?: boolean;
}

// If we have 1 child, render Text
// if we have > 1 child render list one by one via LineChildren

const Line = ({
  children,
  className,
  isActive,
  isDone,
  onFinish,
  postDelay = 1000,
  noPrompt,
  ...props
}: Props) => {
  const justText = typeof children === "string";
  const hasChildren = typeof children === "object";

  const gotoNextLine = async () => {
    await wait(postDelay);
    if (typeof onFinish === "function") onFinish();
  };

  if (children == null) return null;
  if (!isActive && !isDone) return null;

  return (
    <div
      className={classNames("terminal-line", className, {
        "terminal-line--active": isActive,
        "terminal-line--done": isDone,
        "terminal-line--noPrompt": noPrompt,
        ...props
      })}
    >
      {hasChildren && (
        <LineChildren
          items={children}
          renderItem={(item, isActive, onFinish) => (
            <Span isActive={isActive} onFinish={onFinish} {...item.props}>
              {item.props.children}
            </Span>
          )}
          onDone={gotoNextLine}
        />
      )}
      {justText && (
        <Span isActive onFinish={gotoNextLine} {...props}>
          {children}
        </Span>
      )}
    </div>
  );
};

export { Line };
