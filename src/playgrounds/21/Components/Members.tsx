import React, { useState } from "react";
import { Member } from "../types";
import { Avatar } from "./Avatar";

interface Props extends React.ComponentProps<"a"> {
  members: Member[];
}

const Members = ({ members }: Props) => {
  return (
    <ul className="member-list">
      {members.map((member) => (
        <li className="member">
          <Avatar src={member.image} />
          <div className="member-cols">
            <span className="member-name">{member.name}</span>
            <span className="member-email">{member.email}</span>
          </div>
          <div className="member-permissions">
            <span>{member.permission}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { Members };
