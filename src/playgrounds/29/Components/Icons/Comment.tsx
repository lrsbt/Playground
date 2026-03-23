import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Comment = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
      viewBox="0 0 19 19"
      {...props}
    >
      <path
        stroke="#000"
        d="M2.289 11.442a1.526 1.526 0 0 0 1.525 1.526h9.154l3.051 3.051V3.814a1.525 1.525 0 0 0-1.525-1.526H3.814A1.526 1.526 0 0 0 2.29 3.814z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.526"
      />
    </svg>
  );
};
