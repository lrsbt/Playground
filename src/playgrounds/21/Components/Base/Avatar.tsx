import React from "react";

interface Props extends React.ComponentProps<"div"> {
  src?: string;
}

const Avatar = ({ src, className }: Props) => {
  if (!src) return null;
  const myClass = ["avatar", className].filter(Boolean).join(" ");
  return <img src={src} className={myClass} />;
};

export { Avatar };
