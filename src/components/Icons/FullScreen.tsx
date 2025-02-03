import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const FullScreen = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="16"
      fill="#000"
      viewBox="0 0 21 16"
      {...props}
    >
      <path d="M2 0h4v3.5H3.5V6H0V2a2 2 0 0 1 2-2M0 10v4a2 2 0 0 0 2 2h4v-3.5H3.5V10zm17.5 0v2.5H15V16h4a2 2 0 0 0 2-2v-4zM21 6V2a2 2 0 0 0-2-2h-4v3.5h2.5V6z" />
    </svg>
  );
};
