import React from "react";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  elevation: number;
}

const Box = ({ elevation, className: classNameInput, children }: Props) => {
  const className = classNames(
    "box",
    `box--elevation-${elevation}`,
    classNameInput
  );

  return <div className={className}>{children}</div>;
};

export { Box };
