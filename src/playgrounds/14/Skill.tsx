import {
  animated,
  SpringValue,
  useSpring,
  useSpringValue
} from "@react-spring/web";

interface SkillProps extends React.ComponentProps<"div"> {}

import { useEffect, type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {
  percentage: SpringValue;
}

const Line = () => {
  return <div className="line" />;
};

const Skill = (props: SkillProps) => {
  const buttonStyle = useSpring({
    from: {
      translateY: -50,
      opacity: 0,
      scale: 0
      // rotateZ: "145deg",
      // boxShadow: `0px 0px 0px #5e6368`
    },
    to: {
      translateY: 0,
      opacity: 1,
      scale: 1
      // rotateZ: "0deg",
      // boxShadow: `0px 6px 0px #5e6368`
    },
    delay: 350,
    config: {
      friction: 20,
      tension: 270
    }
  });

  return (
    <div className="skill-wrap">
      <Line />

      <animated.div className="skill" style={buttonStyle} {...props}>
        +
      </animated.div>
    </div>
  );
};

export { Skill };
