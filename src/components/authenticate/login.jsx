import { NavLink, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import getLocalStorageUsers from "../../store/localstoragelibrary";
import { useContext, useState, useRef } from "react";
import { TaskContext } from "../../store/taskcontext";
import ResetPasswordModel from "./resetPasswordModel";

export default function LoginPage() {
  const [error, setError] = useState("");
  const dialog = useRef();
  const { filterItems, setUser } = useContext(TaskContext);
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    const res = getLocalStorageUsers();
    const user = res.filter((ele) => ele.username === data.username);
    if (user.length === 0) {
      setError("User not registered!!");
      return;
    }
    if (user[0].password !== data.password) {
      setError("Password Incorrect!!");
      return;
    }
    setUser(data.username);
    localStorage.setItem("loggedInUser", JSON.stringify(data.username));
    filterItems();
    navigate(`/${data.username}`);
  }
  function handleClickReset(event) {
    event.preventDefault();
    dialog.current.open();
  }
  return (
    <>
      <ResetPasswordModel ref={dialog}></ResetPasswordModel>
      <form className={classes.form} onSubmit={handleClick}>
        <h3>Welcome to our website!</h3>
        <h2>{error !== "" && error}</h2>
        <label htmlFor="user">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <NavLink onClick={handleClickReset}>Forgot Password?</NavLink>
        <button>Sign In</button>
        {/* <button>New to our site! Signup</button>
        {/* <NavLink to="/register" className={classes.button}>
          New to our site! Signup
        </NavLink> */}

        <NavLink to="register">
          <button>New to our site! Signup</button>
        </NavLink>
      </form>
    </>
  );
}
