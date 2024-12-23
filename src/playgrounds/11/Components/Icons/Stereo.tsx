import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Stereo = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="12"
      fill="none"
      viewBox="0 0 18 12"
      stroke="#FFAD44"
      strokeWidth="1.5"
      {...props}
    >
      <circle cx="6" cy="6" r="5.25" />
      <circle cx="12" cy="6" r="5.25" />
    </svg>
  );
};
