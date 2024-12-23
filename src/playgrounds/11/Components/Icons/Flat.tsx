import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Flat = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="3"
      fill="none"
      viewBox="0 0 12 3"
      {...props}
    >
      <g strokeLinecap="round" strokeWidth="2">
        <path stroke="#000" d="M1 2h10" />
        <path stroke="#8C5622" d="M1 1h10" />
      </g>
    </svg>
  );
};
