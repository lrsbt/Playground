import React from "react";
import { Option } from "@app/components/Icons";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  selected: string;
  options: string[];
  shortName: string;
}

const Select = ({ selected, shortName, options, className }: Props) => {
  return (
    <div className={classNames("select fillAnimation", className)}>
      <span className="select-text text--lg">{selected}</span>
      <span className="select-text text--sm">{shortName}</span>
      <Option />
      <div className="select-options-container">
        <ul className="select-options">
          {options.map((o) => (
            <li
              className={classNames("select-option", {
                "select-option--selected": o === selected
              })}
            >
              <a onClick={() => {}}>{o}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Select };
