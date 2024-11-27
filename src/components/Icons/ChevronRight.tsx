import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ChevronRight = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 18L15 12L9 6" />
  </svg>
);

export { ChevronRight };
