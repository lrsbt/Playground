import classNames from "classNames";

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T> extends React.ComponentProps<"select"> {
  options: Option<T>[];
  placeholder?: string;
  isInvalid?: boolean;
}

const Dropdown = <T extends string | number>({
  name,
  options,
  value,
  onChange,
  placeholder = "Select",
  className,
  isInvalid
}: Props<T>) => {
  const cssClasses = classNames("form-select", className, {
    "form--isInvalid": isInvalid
  });

  return (
    <select
      aria-label={name}
      className={cssClasses}
      onChange={onChange}
      value={value}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map(({ label, value }: Option<T>) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export { Dropdown };
