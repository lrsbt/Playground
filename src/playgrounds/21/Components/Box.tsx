import React from "react";

interface Props extends React.ComponentProps<"div"> {}

const Box = ({ children, className }: Props) => {
  const myClass = ["box", className].filter(Boolean).join(" ");
  return <div className={myClass}>{children}</div>;
};

export { Box };
