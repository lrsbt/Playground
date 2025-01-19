import React, { useState } from "react";
import { FullScreen } from "@app/components";
import { Switch } from "@app/components/Switch";

import info from "./info.md";
import { Version1 } from "./Version1";
import { Version2 } from "./Version2";

const Playground = () => {
  const [version, setVersion] = useState(0);
  const switchChange = (val: number) => setVersion(val);

  return (
    <FullScreen centerContent info={info} stretch>
      <Switch onChange={switchChange} />
      {version === 0 ? <Version1 /> : <Version2 />}
    </FullScreen>
  );
};

export default Playground;
