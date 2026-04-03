import classNames from "classNames";

interface Props extends React.ComponentProps<"a"> {
  variant: "primary" | "outline";
}

const Button = ({
  variant = "primary",
  children,
  onClick,
  className,
  ...props
}: Props) => {
  const cssClass = classNames("button", className, `button--${variant}`);

  return (
    <a className={cssClass} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

export { Button };
