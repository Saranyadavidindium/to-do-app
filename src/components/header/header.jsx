import { FaBars, FaTimes } from "react-icons/fa";
import classes from "./header.module.css";
import { useState, useContext } from "react";
import NavLinker from "./NavLink";
import { getLocalStorageLoggedInUser } from "../../store/localstoragelibrary";
import { TaskContext } from "../../store/taskcontext";
import { NavLink } from "react-router-dom";

export default function Header(prop) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logOutUser } = useContext(TaskContext);
  const showNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  console.log(user);
  return (
    <>
      <header className={classes.header}>
        <h3>TASK MANAGER</h3>
        <button className={classes.navBtn} onClick={showNavbar}>
          <FaBars />
        </button>
        <nav
          className={`${classes.nav} ${isNavOpen ? classes.responsiveNav : ""}`}
        >
          <NavLinker href="/" onClick={showNavbar}>
            Home
          </NavLinker>
          {user !== "" && (
            <>
              <NavLinker href="/task" onClick={showNavbar}>
                Add Task
              </NavLinker>
              <NavLinker href="/charts" onClick={showNavbar}>
                Visualization
              </NavLinker>
            </>
          )}
          <NavLinker href="/auth" onclick={user !== "" && logOutUser}>
            {user === "" ? "Login" : "Logout"}
          </NavLinker>
          <button
            className={`${classes.navBtn} ${classes.navCloseBtn}`}
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
        </nav>
      </header>
      {prop.children}
    </>
  );
}
