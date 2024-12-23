import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const X = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="7"
      fill="none"
      viewBox="0 0 16 7"
      {...props}
    >
      <path
        fill="black"
        d="M5.698 4.347A7 7 0 0 1 2.746 5H1a1 1 0 0 0 0 2h2.326a7 7 0 0 0 3.742-1.084l.602-.38zm5.25-.781A7 7 0 0 1 13.705 3H15a1 1 0 1 0 0-2h-1.874a7 7 0 0 0-3.743 1.084l-.436.276z"
      />
      <path
        fill="black"
        d="M0 2a1 1 0 0 1 1-1h2.326a7 7 0 0 1 3.742 1.084l2.895 1.832A7 7 0 0 0 13.705 5H15a1 1 0 1 1 0 2h-1.874a7 7 0 0 1-3.743-1.084L6.49 4.084A7 7 0 0 0 2.746 3H1a1 1 0 0 1-1-1"
        clipRule="evenodd"
        fillRule="evenodd"
      />
      <path
        fill="#ffae1f"
        d="M5.698 3.347A7 7 0 0 1 2.746 4H1a1 1 0 0 0 0 2h2.326a7 7 0 0 0 3.742-1.084l.602-.38zm5.25-.781A7 7 0 0 1 13.705 2H15a1 1 0 1 0 0-2h-1.874a7 7 0 0 0-3.743 1.084l-.436.276z"
      />
      <path
        fill="#ffae1f"
        d="M0 1a1 1 0 0 1 1-1h2.326a7 7 0 0 1 3.742 1.084l2.895 1.832A7 7 0 0 0 13.705 4H15a1 1 0 1 1 0 2h-1.874a7 7 0 0 1-3.743-1.084L6.49 3.084A7 7 0 0 0 2.746 2H1a1 1 0 0 1-1-1"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
