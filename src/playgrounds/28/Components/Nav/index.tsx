import { useState } from "react";

import { Button } from "../Button";
import { Select } from "../Select";
import { useToast } from "../../Context/useToast";
import { ToastType } from "../../types";

const Nav = () => {
  const { addToast } = useToast();
  const [type, setType] = useState<ToastType["type"]>("success");

  const create = () => {
    addToast({
      title: "Changes saved",
      type,
      message:
        "Are you sure you would like to remove this user? If the user is an active member of your team, their account will be deleted. This action cannot be undone."
    });
  };

  return (
    <div className="nav">
      <Select value={type} setValue={setType} />
      <Button onClick={create}>Create</Button>
    </div>
  );
};

export { Nav };
