import React, { lazy, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const PLAYGROUNDS = [
  lazy(() => import("./playgrounds/1")),
  lazy(() => import("./playgrounds/2")),
  lazy(() => import("./playgrounds/3")),
  lazy(() => import("./playgrounds/4")),
  lazy(() => import("./playgrounds/5")),
  lazy(() => import("./playgrounds/6")),
  lazy(() => import("./playgrounds/7")),
  lazy(() => import("./playgrounds/8")),
  lazy(() => import("./playgrounds/9")),
  lazy(() => import("./playgrounds/10")),
  lazy(() => import("./playgrounds/11")),
  lazy(() => import("./playgrounds/12")),
  lazy(() => import("./playgrounds/13")),
  lazy(() => import("./playgrounds/14")),
  lazy(() => import("./playgrounds/15")),
  lazy(() => import("./playgrounds/16")),
  lazy(() => import("./playgrounds/17/3")),
  lazy(() => import("./playgrounds/18")),
  lazy(() => import("./playgrounds/19")),
  lazy(() => import("./playgrounds/20/2"))
];

export const TUTORIALS = [
  lazy(() => import("./tutorials/1")),
  lazy(() => import("./tutorials/2"))
];

const p = PLAYGROUNDS.map((Playground, i) => (
  <Route key={i} path={(i + 1).toString()} element={<Playground />} />
));

const t = TUTORIALS.map((Playground, i) => (
  <Route key={i} path={`tut/${(i + 1).toString()}`} element={<Playground />} />
));

const App = () => {
  const Pages = useRef([...p, ...t]).current;

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>{...Pages}</Routes>
    </BrowserRouter>
  );
};

export default App;
