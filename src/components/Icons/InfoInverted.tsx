import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const InfoInverted = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#39ab46"
      viewBox="0 0 20 20"
      {...props}
      style={{ marginTop: -2 }}
    >
      <rect width="18.5" height="18.5" x=".75" y=".75" rx="9.25" />
      <rect
        width="18.5"
        height="18.5"
        x=".75"
        y=".75"
        rx="9.25"
        strokeWidth="1.5"
      />
      <path
        fill="#fff"
        d="M6.972 14v-1.176h2.316V8.576H7.272V7.4h3.276v5.424h2.124V14zm2.82-7.74q-.42 0-.672-.216a.77.77 0 0 1-.252-.6q0-.384.252-.6.252-.228.672-.228t.672.228q.252.216.252.6a.77.77 0 0 1-.252.6q-.252.216-.672.216"
      />
    </svg>
  );
};
