import React, { useRef, useState } from "react";
import classNames from "classNames";
import { Stereo } from "./Icons/Stereo";

interface Props {
  label?: string;
  isConnected?: boolean;
}

const Button = ({ label, isConnected }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="button-container">
      <div
        className={classNames("button", { "button-connected": isConnected })}
      >
        <div className="button-value">
          <div
            onClick={toggleActive}
            className={classNames("button-base", {
              "button-base--active": isActive
            })}
          >
            <Stereo />
          </div>
        </div>
      </div>
      <div className="button-label">{label}</div>
    </div>
  );
};

export { Button };
