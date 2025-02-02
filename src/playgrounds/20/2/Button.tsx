import React from "react";

interface Props extends React.ComponentProps<"div"> {
  text: string;
  shortText: string;
  onClick: () => void;
}

const Button = ({ text, shortText, onClick }: Props) => {
  return (
    <a className="button fillAnimation" onClick={onClick}>
      <span className="select-text text--lg">{text}</span>
      <span className="select-text text--sm">{shortText}</span>
    </a>
  );
};

export { Button };
