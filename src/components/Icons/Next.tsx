import { SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Next = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        stroke="#C8C8CB"
        d="M3 3.643 6.857 7.5 3 11.357m5.143-7.714L12 7.5l-3.857 3.857"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
