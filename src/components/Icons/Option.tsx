import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Option = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="6"
      fill="#FEFEFE"
      viewBox="0 0 9 6"
      {...props}
    >
      <path
        d="m4.412 2.173 2.723 2.723a.975.975 0 0 0 1.38-1.38L5.446.45l-.69.69.69-.69a1.463 1.463 0 0 0-2.069 0L.31 3.517a.975.975 0 0 0 1.38 1.379z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
