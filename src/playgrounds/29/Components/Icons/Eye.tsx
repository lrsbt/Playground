import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Eye = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
      viewBox="0 0 19 19"
      {...props}
    >
      <g
        stroke="#000"
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.526"
      >
        <path d="M.763 9.154S3.814 3.05 9.153 3.05s8.392 6.103 8.392 6.103-3.051 6.102-8.391 6.102S.763 9.154.763 9.154" />
        <path d="M9.154 11.442a2.288 2.288 0 1 0 0-4.577 2.288 2.288 0 0 0 0 4.577" />
      </g>
    </svg>
  );
};
