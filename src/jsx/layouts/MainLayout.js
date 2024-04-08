import React, { useContext } from "react";
import Nav from "./nav";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { ThemeContext } from "../../context/ThemeContext";


const MainLayout = () => {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);

  return (
    <div
      id="main-wrapper"
      className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
        menuToggle ? "menu-toggle" : ""
      }`}
    >
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "calc(100vh - 72.297px)"}}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
