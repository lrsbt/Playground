import React from "react";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  variant: "primary" | "secondary";
}

const Button = ({ variant, className: classNameInput, children }: Props) => {
  const className = classNames("button", `button--${variant}`, classNameInput);

  return <div className={className}>{children}</div>;
};

export { Button };
