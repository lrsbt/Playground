import React from "react";
import { ChevronUp, Globe } from "@app/components/Icons";
import { Text } from "./Base/Text";

interface Props extends React.ComponentProps<"div"> {
  grey?: boolean;
}

const PermissionSelect = ({ grey }: Props) => {
  const myClass = ["input-permissions", grey && "input-permissions--grey"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={myClass}>
      <Globe className="input-permissions-globe" />
      <Text.P color="black" size="xl">
        can view
      </Text.P>
      <ChevronUp className="input-permissions-chev flip-v" />
    </div>
  );
};

export { PermissionSelect };
