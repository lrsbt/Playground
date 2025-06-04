import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const ChevronUp = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};
