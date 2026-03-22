import { useRef, useState } from "react";
import { LongArrow, Navigation, Search } from "../../Components/Icons";
import { DATA } from "../../const";
import { SideBar } from "./Socials";
import { animated, useSpring, useTrail } from "@react-spring/web";

const Main = () => {
  const totalPages = useRef(DATA.length).current;
  const [page, setPage] = useState(0);

  const goToNextPage = () => setPage((v) => (v + 1 === totalPages ? 0 : v + 1));

  const [springStyle] = useSpring(
    () => ({
      pageProgress: page,
      config: { tension: 80, friction: 20 }
    }),
    [page]
  );

  return (
    <div className="wrapper">
      <div className="main">
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

            <div className="mainContent-content">content</div>

            <div className="mainContent-footer">
              <span className="_mr5">
                {page + 1} of {totalPages}
              </span>{" "}
              <a href="#" onClick={goToNextPage}>
                <LongArrow />
              </a>
            </div>
          </div>
        </div>
        <animated.div className="column column--image">
          {DATA.map(({ image }, i) => {
            const opacity = springStyle.pageProgress.to(
              [i - 1, i, i + 1],
              [1, 1, 1]
            );

            const translateY = springStyle.pageProgress.to(
              [i - 1, i, i + 1],
              [800, 0, -200]
            );

            return (
              <animated.img
                src={image}
                className="image"
                style={{
                  position: "absolute",
                  opacity: opacity,
                  translateY: translateY
                }}
              />
            );
          })}
        </animated.div>
      </div>
    </div>
  );
};

export { Main };
