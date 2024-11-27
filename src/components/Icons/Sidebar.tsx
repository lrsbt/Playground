import { SVGProps } from "react";
import { animated, useSpring } from "@react-spring/web";

interface IProps extends SVGProps<SVGSVGElement> {
  isShowing: boolean;
}

export const Sidebar = ({ isShowing, ...props }: IProps) => {
  const fillStyle = useSpring({
    width: isShowing ? 4 : 0,
    config: {
      tension: 200
    }
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      fill="none"
      stroke="#fff"
      viewBox="0 0 14 13"
      {...props}
    >
      <path
        d="M2.545 1.25h8.91c.959 0 1.795.825 1.795 1.917v6.666c0 1.092-.836 1.917-1.796 1.917H2.545c-.959 0-1.795-.825-1.795-1.917V3.167c0-1.092.836-1.917 1.795-1.917Z"
        strokeWidth="1.5"
      />
      <path d="M5.375 1.875h.75v9.25h-.75z" strokeWidth=".75" />
      <animated.rect
        x="1"
        y="1.875"
        fill="white"
        width="0"
        height="9"
        stroke="white"
        strokeWidth="0.75"
        style={fillStyle}
      />
    </svg>
  );
};
