import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const CopyThis = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="#fff"
      viewBox="0 0 18 18"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M14 12.25H7.25a1.5 1.5 0 0 1-1.5-1.5V4a1.5 1.5 0 0 1 1.5-1.5H14A1.5 1.5 0 0 1 15.5 4v6.75a1.5 1.5 0 0 1-1.5 1.5" />
      <path
        d="M3.75 6.75H3a1.5 1.5 0 0 0-1.5 1.5V15A1.5 1.5 0 0 0 3 16.5h6.75a1.5 1.5 0 0 0 1.5-1.5v-.75"
        opacity=".7"
      />
    </svg>
  );
};
