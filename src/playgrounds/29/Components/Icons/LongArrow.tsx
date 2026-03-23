import { type SVGProps } from "react";
import { animated, useSpring } from "@react-spring/web";

interface IProps extends SVGProps<SVGSVGElement> {}

export const LongArrow = (props: IProps) => {
  const [springs] = useSpring(() => ({
    from: { progress: 0 },
    to: { progress: 1 },
    delay: 200,
    config: {
      friction: 18
    }
  }));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="11"
      fill="none"
      viewBox="0 0 30 11"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      {...props}
    >
      <animated.path
        d="M16.9423 9.36538L21.25 5.05769L16.9423 0.75"
        transform={springs.progress.to({
          range: [0, 1],
          output: ["translate(-20, 0)", "translate(0, 0)"]
        })}
      />
      <animated.path
        d={springs.progress.to({
          range: [0, 1],
          output: ["M0 5 L 0 5", "M20 5 L 0 5"]
        })}
      />
    </svg>
  );
};
