import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Instagram = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        stroke="#BFC3C6"
        d="M11.85 4.15h.007M4.5 1h7A3.5 3.5 0 0 1 15 4.5v7a3.5 3.5 0 0 1-3.5 3.5h-7A3.5 3.5 0 0 1 1 11.5v-7A3.5 3.5 0 0 1 4.5 1m6.3 6.559a2.8 2.8 0 1 1-5.539.821 2.8 2.8 0 0 1 5.539-.82"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
