import React, { useRef, useState } from "react";
import classNames from "classNames";
import Markdown from "react-markdown";
import { animated, useSpring } from "@react-spring/web";

import { padInt } from "@app/utils";
import { Next, Sidebar } from "@app/components/Icons";
import { PLAYGROUNDS } from "@app/App";

interface Props extends React.ComponentProps<"div"> {
  centerContent?: boolean;
  stretch?: boolean;
  info?: string;
}

const FullScreen = ({
  centerContent,
  info,
  children,
  stretch,
  className
}: Props) => {
  const id = useRef(window.location.pathname.replace(/\D/g, "")).current;
  const prevId = Number(id) > 1 && Number(id) - 1;
  const nextId = Number(id) < PLAYGROUNDS.length && Number(id) + 1;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = (e: any) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  const sidebarStyles = useSpring({
    marginLeft: showSidebar ? 0 : -216
  });

  return (
    <div className="page">
      <animated.div className="sidebar" style={sidebarStyles}>
        <header className="sidebar-header">
          <div className="sidebar-name">Playground {padInt(Number(id))}</div>
        </header>
        <section className="sidebar-info">
          <Markdown>{info}</Markdown>
        </section>
      </animated.div>
      <div
        className={classNames("fullScreen", {
          "fullScreen--center": centerContent
        })}
      >
        <a
          href="#"
          className="iconButton iconButton--sidebar"
          onClick={toggleSidebar}
        >
          <Sidebar isShowing={showSidebar} />
        </a>
        <nav className="page-nav">
          {prevId && (
            <a href={`/${prevId}`} className="iconButton _flip-h">
              <Next />
            </a>
          )}
          {nextId && (
            <a href={`/${nextId}`} className="iconButton">
              <Next />
            </a>
          )}
        </nav>
        <div
          className={classNames(className, { "fullScreen--stretch": stretch })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { FullScreen };
