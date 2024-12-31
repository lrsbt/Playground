import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

import { FullScreen } from "@app/components";
import { useDraggableArea } from "./usDraggableArea";

import "./styles.css";
import info from "./info.md";
import { Skill } from "./Skill";

type e = React.MouseEvent<Element, MouseEvent>;

const Playground = () => {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const dragAreaSpringRef = useSpringRef();

  const [skills, setSkills] = useState([0]);
  const { areaStyle, onPointerDown, panTo } = useDraggableArea(
    dragAreaRef,
    dragAreaSpringRef,
    "skill"
  );

  const addSkill = (e: e) => {
    setSkills((skills) => {
      return [...skills, 1];
    });
    setTimeout(panTo, 50, e);
  };

  return (
    <FullScreen centerContent stretch info={info}>
      <animated.div
        ref={dragAreaRef}
        style={areaStyle}
        className="skills"
        onPointerDown={onPointerDown}
      >
        {skills.map((skill, i) => (
          <Skill
            key={i}
            onClick={addSkill}
            // style={{
            //   left: window.innerWidth / 2 - 40,
            //   top: window.innerHeight / 2 - 10
            // }}
          />
        ))}
      </animated.div>
    </FullScreen>
  );
};

export default Playground;
