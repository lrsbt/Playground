import React from "react";

interface Props extends React.ComponentProps<"div"> {
  icon: React.ReactNode;
}

const Badge = ({ icon, className }: Props) => {
  const myClass = ["badge", className].filter(Boolean).join(" ");
  return <div className={myClass}>{icon}</div>;
};

export { Badge };
