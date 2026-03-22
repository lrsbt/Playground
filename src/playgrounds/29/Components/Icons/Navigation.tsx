import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Navigation = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="13"
      fill="none"
      viewBox="0 0 15 13"
      {...props}
    >
      <path
        fill="#111"
        d="M13.5 0a1.5 1.5 0 0 1 0 3h-12a1.5 1.5 0 1 1 0-3zm0 5a1.5 1.5 0 0 1 0 3h-12a1.5 1.5 0 1 1 0-3zm0 5a1.5 1.5 0 0 1 0 3h-12a1.5 1.5 0 0 1 0-3z"
      />
    </svg>
  );
};
