import { Outlet } from "react-router-dom";
import classes from "../components/UserProfile.module.css";
import Header from "./Header";
import React from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes.controlPostsArea}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
