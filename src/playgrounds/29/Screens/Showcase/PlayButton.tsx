import { animated, easings, useSpring } from "@react-spring/web";
import { Page } from "../../types";
import { Play } from "../../Components/Icons";
import { useEffect } from "react";

interface Props {
  pageData: Page;
  currentPage: number;
  renderPage: number; // page from .map we are looping through
  containerHeight: number;
}

const PlayButton = ({
  pageData: { title, color },
  currentPage,
  renderPage,
  containerHeight
}: Props) => {
  const [contentStyle] = useSpring(
    (i) => ({
      pageProgress: currentPage,
      // delay: 200,
      config: {
        duration: 1200,
        easing: easings.easeInOutCubic
      }
    }),
    [currentPage]
  );

  useEffect(() => {}, [currentPage]);

  const animatedProps = {
    backgroundColor: color,
    translateY: contentStyle.pageProgress.to(
      [currentPage - 1, currentPage, currentPage + 1],
      [containerHeight, 0, -containerHeight]
    ),
    opacity: contentStyle.pageProgress.to(
      [renderPage - 0.5, renderPage, renderPage + 0.3],
      [1, 1, 0],
      "clamp"
    )
  };

  return (
    <animated.div className="showcase__playButton" style={animatedProps}>
      <Play />
    </animated.div>
  );
};

export { PlayButton };
