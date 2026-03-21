import { Facebook, Instagram, Twitter } from "../../Components/Icons";

const SideBar = () => {
  return (
    <div className="socials">
      <div>
        <a href="">
          <Facebook />
        </a>
        <a href="">
          <Instagram />
        </a>
        <a href="">
          <Twitter />
        </a>
      </div>
    </div>
  );
};

export { SideBar };
