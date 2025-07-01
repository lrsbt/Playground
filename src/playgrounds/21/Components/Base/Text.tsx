import React from "react";

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: "h1" | "h2" | "p";
  size?: "md" | "xl" | "xxl";
  color?:
    | "white"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "black";
};

const BaseText = ({
  as: Component = "p",
  size,
  color,
  className,
  children,
  ...props
}: TextProps) => {
  const myClass = [
    className,
    size && `text-size--${size}`,
    color && `text-color--${color}`,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Component className={myClass} {...props}>
      {children}
    </Component>
  );
};

const H1 = ({ className, ...props }: Omit<TextProps, "as">) => (
  <BaseText as="h1" className={`text text--h1 ${className ?? ""}`} {...props} />
);

const H2 = ({ className, ...props }: Omit<TextProps, "as">) => (
  <BaseText as="h2" className={`text text--h2 ${className ?? ""}`} {...props} />
);

const P = ({ className, ...props }: Omit<TextProps, "as">) => (
  <BaseText as="p" className={`text text--p ${className ?? ""}`} {...props} />
);

export const Text = {
  H1,
  H2,
  P,
};
