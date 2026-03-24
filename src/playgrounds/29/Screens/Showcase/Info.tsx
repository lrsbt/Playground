import { animated, easings, useSprings } from "@react-spring/web";
import { Page } from "../../types";
import { useRef } from "react";

interface Props {
  pageData: Page;
  currentPage: number;
  renderPage: number; // page from .map we are looping through
  containerHeight: number;
}

const Info = ({
  pageData: { info, link },
  currentPage,
  renderPage,
  containerHeight
}: Props) => {
  const numberOfItems = useRef(3).current;

  const [contentStyle] = useSprings(
    numberOfItems,
    (i) => ({
      pageProgress: currentPage,
      // Using delay causes bugs
      // delay: i * 60 + title.length * 50,
      config: {
        duration: 700,
        easing: easings.easeInOutCubic
      }
    }),
    [currentPage]
  );

  const animatedProps = [...Array(numberOfItems)].map((_, i) => {
    return {
      translateY: contentStyle[i].pageProgress.to(
        [currentPage - 1, currentPage, currentPage + 1],
        [containerHeight, 0, -containerHeight]
      ),
      opacity: contentStyle[i].pageProgress.to(
        [renderPage - 0.5, renderPage, renderPage + 0.3],
        [1, 1, 0],
        "clamp"
      )
    };
  });

  return (
    <div className="showcase__author">
      <animated.div className="showcase__author-by" style={animatedProps[0]}>
        {info[0]}
      </animated.div>
      <animated.div className="showcase__author-name" style={animatedProps[1]}>
        {info[1]}
      </animated.div>
      <animated.div className="showcase__author-link" style={animatedProps[2]}>
        {link}
      </animated.div>
    </div>
  );
};

export { Info };
