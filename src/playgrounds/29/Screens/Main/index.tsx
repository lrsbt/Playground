import { DATA } from "../../const";
import { SideBar } from "./Socials";

const Main = () => {
  const { id, color, title, info, link, socials, image } = DATA[1];

  return (
    <div className="wrapper">
      <div className="main">
        <div className="column">
          <SideBar />
          Left
        </div>
        <div className="column">
          <img src={image} className="image" />
        </div>
      </div>
    </div>
  );
};

export { Main };
