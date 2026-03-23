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
      // config: { tension: 100, friction: 25, mass: 1.5 }
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
      <div className="main" ref={containerRef}>
        <div className="column column--text">
          <SideBar />
          <div className="mainContent">
            <div className="mainContent-header">
              <div className="mainContent-header-logo">
                <span className="_bold _fs-xl">Design.</span>
                <a href="#">
                  <Navigation />
                </a>
              </div>
              <div className="mainContent-header-search">
                <Search />
                <span className="">Search</span>
              </div>
            </div>

            <div className="mainContent-content">
              <div
                style={{
                  position: "absolute",
                  width: "75%",
                  top: -currentPage * containerHeight
                }}
              >
                {PAGEDATA.map((pageData, ii) => {
                  const { title, color, info, link } = pageData;

                  return (
                    <div key={ii} style={{ height: containerHeight }}>
                      <Title
                        pageData={pageData}
                        currentPage={currentPage}
                        renderPage={ii}
                        containerHeight={containerHeight}
                      />

                      <Info
                        pageData={pageData}
                        currentPage={currentPage}
                        renderPage={ii}
                        containerHeight={containerHeight}
                      />

                      <PlayButton
                        pageData={pageData}
                        currentPage={currentPage}
                        renderPage={ii}
                        containerHeight={containerHeight}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mainContent-footer">
              <Pager
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={goToNextPage}
              />
              <div className="mainContent-footer-socials">
                {PAGEDATA.map((pageData, i) => (
                  <Interactions
                    {...pageData.socials}
                    i={i}
                    currentPage={currentPage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <animated.div className="column column--image">
          {PAGEDATA.map(({ image }, i) => {
            const translateY = springStyle.pageProgress.to(
              [i - 1, i, i + 1],
              [containerHeight || 800, 0, -200]
            );

            return (
              <animated.img
                key={i}
                src={image}
                className="image"
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
