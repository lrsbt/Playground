import classNames from "classNames";
import React from "react";

interface Props extends React.ComponentProps<"div"> {
  text: string;
  shortText: string;
  onClick: () => void;
}

const Button = ({ text, shortText, onClick, className }: Props) => {
  return (
    <a
      onClick={onClick}
      className={classNames("button fillAnimation", className)}
    >
      <span className="select-text display--lg">{text}</span>
      <span className="select-text display--sm">{shortText}</span>
    </a>
  );
};

export { Button };
