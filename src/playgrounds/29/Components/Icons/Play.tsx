import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Play = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      fill="none"
      viewBox="0 0 12 14"
      {...props}
    >
      <path
        fill="#fff"
        d="M0 1.002A1 1 0 0 1 1.54.16l9.151 5.883a1 1 0 0 1 0 1.682l-9.15 5.883A1 1 0 0 1 0 12.767z"
      />
    </svg>
  );
};
