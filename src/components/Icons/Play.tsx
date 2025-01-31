import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Play = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="21"
      fill="#000"
      viewBox="0 0 18 21"
      {...props}
    >
      <path d="M0 3.321C0 1.4 2.08.196 3.746 1.154l12.485 7.179c1.672.961 1.672 3.373 0 4.334L3.746 19.846C2.08 20.804 0 19.6 0 17.679z" />
    </svg>
  );
};
