import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Paused = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="19"
      fill="none"
      viewBox="0 0 17 19"
      {...props}
    >
      <rect width="7" height="19" rx="2" />
      <rect width="7" height="19" x="10" rx="2" />
    </svg>
  );
};
