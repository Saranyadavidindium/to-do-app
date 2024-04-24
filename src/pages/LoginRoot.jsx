import classes from "./RootLogin.module.css";
import image from "./login.png";
import { Outlet, redirect } from "react-router-dom";

export default function LoginRoot() {
  return (
    <>
      <div className={classes.root}>
        <Outlet></Outlet>
        <img src={image}></img>
      </div>
    </>
  );
}
