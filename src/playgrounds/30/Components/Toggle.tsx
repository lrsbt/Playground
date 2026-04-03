import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  isEnabled: boolean;
  onChange: (e: any) => void;
}

const Toggle = ({ className, isEnabled, onChange }: Props) => {
  const cssClass = classNames("toggle", className, {
    "toggle--isActive": isEnabled
  });

  return (
    <div className={cssClass} onClick={onChange}>
      <div className="toggle__knob" />
    </div>
  );
};

export { Toggle };
