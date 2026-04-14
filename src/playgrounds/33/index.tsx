import React from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";
import { Dropdown } from "./Dropdown";

const Playground = () => {
  return (
    <FullScreen centerContent info={info} className="arr-bg ">
      <div className="container">
        <div className="box" />
        <Dropdown
          options={[
            {
              name: "Event Enquiry",
              value: "event_enquiry",
            },
            {
              name: "Other Enquiry",
              value: "other_enquiry",
            },
          ]}
        />
      </div>
    </FullScreen>
  );
};

export default Playground;
