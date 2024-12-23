import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Busy = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      fill="none"
      viewBox="0 0 12 10"
      {...props}
    >
      <g strokeLinecap="round" strokeWidth="2">
        <path
          stroke="#000"
          d="M1 5.5h1.5A.5.5 0 0 0 3 5V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v6a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V6a.5.5 0 0 1 .5-.5H11"
        />
        <path
          stroke="#8C5622"
          d="M1 4.5h1.5A.5.5 0 0 0 3 4V1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v6a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 .5-.5H11"
        />
      </g>
    </svg>
  );
};
