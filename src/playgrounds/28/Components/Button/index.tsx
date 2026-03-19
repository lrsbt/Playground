import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  variant?: "primary" | "secondary";
}

const Button = ({ variant = "primary", children, ...props }: Props) => {
  return (
    <div className={classNames("button", `button--${variant}`)} {...props}>
      {children}
    </div>
  );
};

export { Button };
