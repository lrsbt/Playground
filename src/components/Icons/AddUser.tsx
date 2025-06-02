import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const AddUser = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#000"
        d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M20 8v6m3-3h-6m-4.5-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
