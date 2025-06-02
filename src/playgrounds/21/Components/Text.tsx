import React from "react";

type Variant = "h1" | "h2" | "h3" | "p";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  children?: React.ReactNode;
}

const Text = ({ variant = "p", children, className, ...rest }: TextProps) => {
  const Component = variant;
  const myClass = ["text", `text--${variant}`, className]
    .filter(Boolean)
    .join(" "); // Clean classes
  return (
    <Component className={myClass} {...rest}>
      {children}
    </Component>
  );
};

export { Text };
