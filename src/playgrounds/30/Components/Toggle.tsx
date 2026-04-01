import { useState } from "react";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  isEnabled: boolean;
}

const Toggle = ({ className, ...props }: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const cssClass = classNames("toggle", className, {
    "toggle--isActive": isEnabled
  });

  return (
    <div className={cssClass} onClick={() => setIsEnabled(!isEnabled)}>
      <div className="toggle__knob" />
    </div>
  );
};

export { Toggle };
