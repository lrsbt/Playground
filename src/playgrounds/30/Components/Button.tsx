import classNames from "classNames";

interface Props extends React.ComponentProps<"a"> {}

const Button = ({ children, onClick, className }: Props) => {
  const cssClass = classNames("button", className);

  return (
    <a className={cssClass} onClick={onClick}>
      {children}
    </a>
  );
};

export { Button };
