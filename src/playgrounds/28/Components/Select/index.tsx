import classNames from "classNames";
import { ToastType } from "../../types";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<ToastType["type"]>>;
}

const COLORS = ["success", "warning", "info", "error"] as ToastType["type"][];

const Select = ({ value, setValue }: Props) => {
  return (
    <div className="selectWrap">
      {COLORS.map((c) => {
        const className = classNames("select", `select--${c}`, {
          "select--selected": c === value
        });
        const onClick = () => setValue(c);

        return <div key={c} className={className} onClick={onClick}></div>;
      })}
    </div>
  );
};

export { Select };
