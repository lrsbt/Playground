import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Facebook = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="14"
      fill="#BFC3C6"
      viewBox="0 0 8 14"
      {...props}
    >
      <path d="M8 0H5.818a3.7 3.7 0 0 0-2.571 1.025A3.44 3.44 0 0 0 2.182 3.5v2.1H0v2.8h2.182V14H5.09V8.4h2.182L8 5.6H5.09V3.5c0-.186.078-.364.214-.495a.74.74 0 0 1 .514-.205H8z" />
    </svg>
  );
};
