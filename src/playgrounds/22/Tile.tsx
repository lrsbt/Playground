import React from "react";

const Tile = ({
  type,
  children,
}: {
  type: "hero" | "npc" | "wall" | "cell";
  children: React.ReactNode;
}) => <span className={`tile tile--${type}`}>{children}</span>;

export { Tile };
