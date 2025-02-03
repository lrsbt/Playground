import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Speaker = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="17"
      fill="#000"
      viewBox="0 0 25 17"
      {...props}
    >
      <path
        d="M9.857 11.231V5.405l3.286-1.306v8.438zM8.212 3.747c.095-.133.218-.246.364-.33L14.29.153a1.143 1.143 0 0 1 1.71.993v14.347c0 .877-.948 1.427-1.71.992l-5.714-3.266a1.1 1.1 0 0 1-.364-.328H2a2 2 0 0 1-2-2V5.747a2 2 0 0 1 2-2zM2.857 6.604h3.429v3.428H2.857z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
      <path d="M18 13.208c0 .534.354 1.017.885 1.076q.303.034.615.034a5.5 5.5 0 1 0-.615-10.966c-.53.06-.885.542-.885 1.076v.781c0 .663.837 1.11 1.5 1.11a2.5 2.5 0 0 1 0 5c-.663 0-1.5.446-1.5 1.108z" />
    </svg>
  );
};
