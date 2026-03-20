import { useState } from "react";

import { Button } from "../Button";
import { Select } from "../Select";
import { useToast } from "../../Context/useToast";
import { ToastType } from "../../types";
import { EXAMPLE_DATA } from "../../const";

const Nav = () => {
  const { addToast } = useToast();
  const [type, setType] = useState<ToastType["type"]>("success");

  const create = () => {
    addToast(EXAMPLE_DATA[type]);
  };

  return (
    <div className="nav">
      <Select value={type} setValue={setType} />
      <Button onClick={create}>Create</Button>
    </div>
  );
};

export { Nav };
