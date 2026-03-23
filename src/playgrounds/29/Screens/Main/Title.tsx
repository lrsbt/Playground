import { animated, easings, useSprings, useTrail } from "@react-spring/web";
import { Page } from "../../types";

interface Props {
  pageData: Page;
  currentPage: number;
  renderPage: number; // page from .map we are looping through
  containerHeight: number;
}

const Title = ({
  pageData: { title, color },
  currentPage,
  renderPage,
  containerHeight
}: Props) => {
  const [contentStyle] = useSprings(
    title.length,
    (i) => ({
      pageProgress: currentPage,
      config: {
        duration: 700 + i * 100,
        easing: easings.easeInOutCubic
      }
    }),
    [currentPage]
  );

  return (
    <h1 className="mainContent-h1">
      {title.map((line, i) => {
        const isLast = i === title.length - 1;
        const colorStyle = isLast ? { color } : {};
        const translateY = contentStyle[i].pageProgress.to(
          [currentPage - 1, currentPage, currentPage + 1],
          [containerHeight, 0, -containerHeight]
        );
        const opacity = contentStyle[i].pageProgress.to(
          [renderPage - 0.7, renderPage, renderPage + 0.3],
          [0, 1, 0],
          "clamp"
        );

        return (
          <animated.div
            key={i}
            style={{
              ...colorStyle,
              translateY,
              opacity
            }}
          >
            {line}
          </animated.div>
        );
      })}
    </h1>
  );
};

export { Title };
