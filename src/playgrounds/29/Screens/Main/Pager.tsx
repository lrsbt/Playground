import { animated, useTransition } from "@react-spring/web";
import { LongArrow } from "../../Components/Icons";

interface Props {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
}

const Pager = ({ currentPage, totalPages, goToNextPage }: Props) => {
  const transitions = useTransition(currentPage, {
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" }
  });

  return (
    <>
      {transitions((style) => (
        <animated.div style={{ ...style, width: 120 }}>
          <span className="_mr5">
            {currentPage + 1} of {totalPages}{" "}
          </span>
          <a href="#" onClick={goToNextPage}>
            <LongArrow />
          </a>
        </animated.div>
      ))}
    </>
  );
};

export { Pager };
