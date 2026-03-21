import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Twitter = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      fill="#BFC3C6"
      viewBox="0 0 14 11"
      {...props}
    >
      <path d="M14 .006a7 7 0 0 1-1.998.938 2.87 2.87 0 0 0-1.46-.862 2.95 2.95 0 0 0-1.708.099c-.546.2-1.014.557-1.342 1.023A2.68 2.68 0 0 0 7 2.784v.612a7 7 0 0 1-3.226-.695A6.7 6.7 0 0 1 1.273.619s-2.546 5.517 3.182 7.97A7.6 7.6 0 0 1 0 9.815c5.727 3.065 12.727 0 12.727-7.05q0-.257-.05-.509A4.7 4.7 0 0 0 14 .006" />
    </svg>
  );
};
