import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { ChevronRight } from "@app/components/Icons";
import { OptionGroup } from "./types";

const PopOver = () => {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      tension: 300
    }
  });

  const options = [
    [{ name: "Preferences", shortCut: "G then S" }],
    [{ name: "Workspace settings" }, { name: "Invite and manage members" }],
    [{ name: "Download desktop app" }],
    [
      { name: "Switch workspace", shortCut: "O then W", children: [] },
      { name: "Log out", shortCut: "⌥ ⇧ Q" }
    ]
  ] as OptionGroup[];

  return (
    <animated.div className="popover" style={styles}>
      {Object.values(options).map((v, i) => {
        return (
          <div key={i} className="popover-group">
            {v.map(({ name, shortCut, children }) => (
              <a key={name} className="popover-link" href="#">
                {name}
                {shortCut && (
                  <span className="popover-shortCut">{shortCut}</span>
                )}
                {children && <ChevronRight className="popover-showMore" />}
              </a>
            ))}
          </div>
        );
      })}
    </animated.div>
  );
};

export { PopOver };
