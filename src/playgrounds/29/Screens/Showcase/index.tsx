import { useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { animated, easings, useSpring } from "@react-spring/web";

import { DATA as PAGEDATA } from "../../const";
import { Navigation, Search } from "../../Components/Icons";

import { Pager } from "./Pager";
import { Info } from "./Info";
import { Title } from "./Title";
import { SideBar } from "./Socials";
import { PlayButton } from "./PlayButton";
import { Interactions } from "./Interactions";

const Main = () => {
  const totalPages = useRef(PAGEDATA.length).current;
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, { height: containerHeight }] = useMeasure();

  const [springStyle] = useSpring(
    () => ({
      pageProgress: currentPage,
      delay: 450,
      config: {
        duration: 600,
        easing: easings.easeInOutCubic
      }
    }),
    [currentPage]
  );

  const goToNextPage = () => setCurrentPage((v) => (v + 1) % totalPages);

  return (
    <div className="wrapper">
      <div className="showcase" ref={containerRef}>
        <div className="showcase__panel">
          <SideBar />
          <div className="showcase__content">
            <div className="showcase__header">
              <div className="showcase__nav">
                <span className="_bold _fs-xl">Design.</span>
                <a href="#">
                  <Navigation />
                </a>
              </div>
              <div className="showcase__search">
                <Search />
                <span>Search</span>
              </div>
            </div>

            <div
              className="showcase__body"
              style={{ top: -currentPage * containerHeight }}
            >
              {PAGEDATA.map((pageData, i) => {
                const props = {
                  pageData: pageData,
                  currentPage: currentPage,
                  renderPage: i,
                  containerHeight: containerHeight
                };
                return (
                  <div key={i} style={{ height: containerHeight }}>
                    <Title {...props} />
                    <Info {...props} />
                    <PlayButton {...props} />
                  </div>
                );
              })}
            </div>

            <div className="showcase__footer">
              <Pager
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={goToNextPage}
              />
              <div className="showcase__interactions">
                {PAGEDATA.map((pageData, i) => (
                  <Interactions
                    {...pageData.socials}
                    pageIndex={i}
                    currentPage={currentPage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <animated.div className="showcase__media">
          {PAGEDATA.map(({ image }, i) => {
            const translateY = springStyle.pageProgress.to(
              [i - 1, i, i + 1],
              [containerHeight || 800, 0, -200]
            );

            return (
              <animated.img
                key={i}
                src={image}
                className="showcase__media-image"
                style={{ position: "absolute", translateY: translateY }}
              />
            );
          })}
        </animated.div>
      </div>
    </div>
  );
};

export { Main };
