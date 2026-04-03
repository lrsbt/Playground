import classNames from "classNames";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  isInvalid?: boolean;
}

const TextInput = ({
  name,
  placeholder = "Enter",
  className,
  onChange,
  isInvalid
}: Props) => {
  const cssClasses = classNames("form-input", className, {
    "form--isInvalid": isInvalid
  });

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
