import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { IMAGES } from "../../constant/theme";

export function NavMenuToggle() {
  setTimeout(() => {
    let mainwrapper = document.querySelector("#main-wrapper");
    if (mainwrapper.classList.contains("menu-toggle")) {
      mainwrapper.classList.remove("menu-toggle");
    } else {
      mainwrapper.classList.add("menu-toggle");
    }
  }, 200);
}

const NavHader = () => {

  // console.log(data)

  const [toggle, setToggle] = useState(false);
  const { openMenuToggle } = useContext(ThemeContext);
  return (
    <div className="nav-header zIndexH">
      <img className="logo-image dashboard-logo" src={IMAGES.User} alt="" />
      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
          NavMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
