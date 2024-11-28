import React, { lazy, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const PLAYGROUNDS = [
  lazy(() => import("./playgrounds/1")),
  lazy(() => import("./playgrounds/2")),
  lazy(() => import("./playgrounds/3"))
];

const App = () => {
  const Pages = useRef(
    PLAYGROUNDS.map((Playground, i) => (
      <Route key={i} path={(i + 1).toString()} element={<Playground />} />
    ))
  ).current;

  return (
    <BrowserRouter>
      <Routes>{...Pages}</Routes>
    </BrowserRouter>
  );
};

export default App;
