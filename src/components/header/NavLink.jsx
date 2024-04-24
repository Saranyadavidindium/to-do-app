import { NavLink } from "react-router-dom";
import classes from "./header.module.css"; // Assuming you have a CSS module for styling

export default function NavLinker({ href, children, onclick }) {
  return (
    <NavLink to={href} activeClassName={classes.active} onClick={onclick}>
      {children}
    </NavLink>
  );
}
