import React from "react";

interface Props extends React.ComponentProps<"a"> {}

const Button = ({ children }: Props) => {
  return <a className="button">{children}</a>;
};

export { Button };
