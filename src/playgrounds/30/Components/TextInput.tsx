import classNames from "classNames";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
}

const TextInput = ({
  name,
  placeholder = "Enter",
  className,
  onChange
}: Props) => {
  const cssClasses = classNames("form-control form-input", className);

  return (
    <input
      type="text"
      aria-label={name}
      className={cssClasses}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export { TextInput };
