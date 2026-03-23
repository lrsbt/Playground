import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Heart = (props: IProps) => {
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
        d="M15.897 3.517a4.195 4.195 0 0 0-5.935 0l-.808.808-.809-.808A4.197 4.197 0 0 0 2.411 9.45l6.743 6.744 6.743-6.744a4.196 4.196 0 0 0 0-5.934"
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.526"
      />
    </svg>
  );
};
