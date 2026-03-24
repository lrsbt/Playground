import { animated, useTrail } from "@react-spring/web";
import { Comment, Eye, Heart } from "../../Components/Icons";
import { Page } from "../../types";

type Socials = Page["socials"];

interface Props extends Socials {
  currentPage: number;
  pageIndex: number;
}

const Interactions = ({
  likes,
  views,
  comments,
  currentPage,
  pageIndex
}: Props) => {
  const [contentStyle] = useTrail(
    3,
    () => ({
      pageProgress: currentPage
    }),
    [currentPage]
  );

  const items = [
    { icon: <Heart />, count: likes },
    { icon: <Eye />, count: views },
    { icon: <Comment />, count: comments }
  ];

  return (
    <div className="showcase__interaction">
      {items.map(({ icon, count }, i) => {
        const translateY = contentStyle[i].pageProgress.to(
          [pageIndex - 1, pageIndex, pageIndex + 1],
          [200, 0, -200]
        );
        const opacity = contentStyle[i].pageProgress.to(
          [pageIndex - 0.5, pageIndex, pageIndex + 0.5],
          [0, 1, 0]
        );
        return (
          <animated.div
            key={i}
            style={{ translateY, opacity }}
            className="showcase__interaction-item"
          >
            {icon} {count}
          </animated.div>
        );
      })}
    </div>
  );
};

export { Interactions };
