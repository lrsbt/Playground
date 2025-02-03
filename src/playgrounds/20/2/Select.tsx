import React from "react";
import { Option } from "@app/components/Icons";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  selected: string;
  options: string[];
  shortName: string;
  onSelect: (v: string) => void;
}

const Select = ({
  selected,
  shortName,
  options,
  className,
  onSelect
}: Props) => {
  return (
    <div className={classNames("select fillAnimation", className)}>
      <span className="select-text display--lg">{selected}</span>
      <span className="select-text display--sm">{shortName}</span>
      <Option />
      <div className="select-options-container">
        <ul className="select-options">
          {options.map((o) => (
            <li
              key={o}
              className={classNames("select-option", {
                "select-option--selected": o === selected
              })}
            >
              <a onClick={() => onSelect(o)}>{o}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Select };
