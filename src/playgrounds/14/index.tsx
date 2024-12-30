import React, { useState } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

interface SkillProps extends React.ComponentProps<"div"> {}

const Skill = (props: SkillProps) => (
  <div className="skill" {...props}>
    +
  </div>
);

const Playground = () => {
  const [skills, setSkills] = useState([0]);

  const addSkill = () => {
    setSkills((skills) => {
      return [...skills, 1];
    });
  };

  return (
    <FullScreen centerContent stretch info={info}>
      <div className="skills">
        {skills.map((skill) => (
          <Skill onClick={addSkill} />
        ))}
      </div>
    </FullScreen>
  );
};

export default Playground;
