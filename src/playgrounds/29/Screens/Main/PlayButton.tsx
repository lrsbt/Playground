import { animated, easings, useSpring } from "@react-spring/web";
import { Page } from "../../types";
import { Play } from "../../Components/Icons";

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
      delay: i * 60 + title.length * 150,
      config: {
        duration: 1400,
        easing: easings.easeInOutCubic
      }
    }),
    [currentPage]
  );

  console.log("rendering");

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
    <animated.div className="mainContent-play" style={animatedProps}>
      <Play />
    </animated.div>
  );
};

export { PlayButton };
