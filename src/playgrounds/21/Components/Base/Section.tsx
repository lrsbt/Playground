import React from "react";

interface Props extends React.ComponentProps<"div"> {}

const Section = ({ children, className }: Props) => {
  const myClass = ["section", className].filter(Boolean).join(" ");
  return <div className={myClass}>{children}</div>;
};

export { Section };
