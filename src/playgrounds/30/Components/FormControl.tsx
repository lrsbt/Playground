import { Children, cloneElement } from "react";
import { Attention } from "../../../components/Icons/Attention";

interface Props {
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}

const FormControl = ({ touched, error, children }: Props) => {
  const isInvalid = !!error && touched;

  return (
    <div className="_flex-1">
      {Children.map(children, (child) => cloneElement(child, { isInvalid }))}
      {isInvalid && (
        <div className="form__error">
          <Attention
            width={15}
            height={15}
            style={{ marginTop: -4, marginRight: 3 }}
            stroke="#d24242"
            strokeWidth="3"
          />
          {error}
        </div>
      )}
    </div>
  );
};

export { FormControl };
