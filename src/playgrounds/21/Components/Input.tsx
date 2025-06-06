import React, { useState } from "react";
import useSound from "use-sound";
import { ChevronUp, Globe, Info, X } from "@app/components/Icons";
import { Values } from "@app/hooks/values";

import { SOUNDS } from "../const";

import { Text } from "./Text";
import { Button } from "./Button";
import { PermissionSelect } from "./PermissionSelect";

interface Props extends React.ComponentProps<"input"> {}

const INPUT_STATES = {
  EDIT: "EDIT",
  DISPLAY: "DISPLAY",
} as const;

type InputStateType = Values<typeof INPUT_STATES>;

const Input = ({ children }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("larsf2005@gmail.com");
  const [state, setState] = useState<InputStateType>(INPUT_STATES.DISPLAY);
  const [playClick1] = useSound(SOUNDS.click1, { volume: 0.1 });
  const [playClick2] = useSound(SOUNDS.click2, { volume: 0.1 });

  const toggleMode = () => {
    setState((s) =>
      s === INPUT_STATES.EDIT ? INPUT_STATES.DISPLAY : INPUT_STATES.EDIT
    );
  };

  const editValue = () => {
    setState(INPUT_STATES.EDIT);
    inputRef.current?.focus();
    playClick2();
  };

  const removeValue = () => {
    setValue("");
    setState(INPUT_STATES.EDIT);
    inputRef.current?.focus();
    playClick2();
  };

  const commitValue = () => {
    setState(INPUT_STATES.DISPLAY);
    playClick1();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyPress = ({ key }: { key: string }) => {
    if (key === "Enter") commitValue();
  };

  const Tray = () => (
    <div className="input-value">
      <span onClick={editValue}>{value}</span>
      <X onClick={removeValue} />
    </div>
  );

  return (
    <div>
      <label className="input-label" htmlFor="email">
        <Text.P>
          Invite Members <Info />
        </Text.P>
      </label>

      <div className="input-row">
        <div className="input-wrap">
          {state === INPUT_STATES.DISPLAY && <Tray />}
          <input
            ref={inputRef}
            className="input-input flex-1"
            type="text"
            id="email"
            value={value}
            style={{
              opacity: state === INPUT_STATES.EDIT ? 1 : 0,
              pointerEvents: state === INPUT_STATES.EDIT ? "auto" : "none",
            }}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
          >
            {children}
          </input>

          <PermissionSelect />
        </div>
        <Button>Invite</Button>
      </div>
    </div>
  );
};

export { Input };
