import { animated, easings, useSpring } from "@react-spring/web";
import { Comment, Eye, Heart } from "../../Components/Icons";
import { Page } from "../../types";

type Socials = Page["socials"];

interface Props extends Socials {
  currentPage: number;
  i: number;
}

const Interactions = ({ likes, views, comments, currentPage, i }: Props) => {
  const [contentStyle] = useSpring(
    (i) => ({
      pageProgress: currentPage,
      config: {
        duration: 700,
        easing: easings.easeInOutCubic
      }
    }),
    [currentPage]
  );

  const translateY = contentStyle.pageProgress.to(
    [i - 1, i, i + 1],
    [200, 0, -200]
  );
  const opacity = contentStyle.pageProgress.to(
    [i - 0.5, i, i + 0.5],
    [0, 1, 0]
  );

  return (
    <animated.div
      style={{
        width: "max-content",
        display: "flex",
        gap: 12,
        translateY,
        opacity,
        position: "absolute"
      }}
    >
      <div className="mainContent-footer-socialRow">
        <Heart />
        {likes}
      </div>
      <div className="mainContent-footer-socialRow">
        <Eye />
        {views}
      </div>
      <div className="mainContent-footer-socialRow">
        <Comment />
        {comments}
      </div>
    </animated.div>
  );
};

export { Interactions };
