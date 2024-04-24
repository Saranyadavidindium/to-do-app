import classes from "./Register.module.css";
import { redirect, useNavigate } from "react-router-dom";
import getLocalStorageUsers from "../../store/localstoragelibrary";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handelRegisterUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      // userId: Number(getLocalStorageUserID()) + 1,
      username: formData.get("user"),
      password: formData.get("password"),
      mobile: formData.get("mobile"),
      agree: formData.get("check"),
    };
    const res = getLocalStorageUsers();
    const filt = res.filter((ele) => ele.username === data.username);
    console.log(filt);
    if (filt.length !== 0) {
      setError("Username is taken!");
      return;
    }
    if (data.mobile.length < 10) {
      setError("Invalid Mobile number!");
      return;
    }
    // const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{5,}$/;
    // if (!regex.test(data.password)) {
    //   setError("Enter Strong Password!");
    //   return;
    // }
    localStorage.setItem("users", JSON.stringify([...res, data]));
    navigate(`/auth`);
    alert("User Registered Successfully!! Login to continue..");
  }
  return (
    <>
      <form className={classes.form} onSubmit={handelRegisterUser}>
        <div>
          <h3>Join our community!</h3>
        </div>
        <h2>{error !== "" && error}</h2>
        <label htmlFor="user">Username</label>
        <input type="text" name="user" id="user" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <label htmlFor="mobile">Mobile Number</label>
        <input type="number" name="mobile" id="mobile" required />
        <div className={classes.checkbox}>
          <input type="checkbox" name="check" required />
          <p>Agree to terms and conditions</p>
        </div>
        <button>Sign Up</button>
      </form>
    </>
  );
}
