import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./reset.module.css";
import getLocalStorageUsers from "../../store/localstoragelibrary";

const initialState = {
  show: false,
  msg: "",
};
const ResetPasswordModel = forwardRef(function ResetPassword({}, ref) {
  const [verify, setVerify] = useState(initialState);
  const dialog = useRef();
  const user = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });
  function verifyUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const users = getLocalStorageUsers();
    const getUser = users.find((ele) => ele.mobile === formData.get("num"));
    if (getUser) {
      user.current = getUser.username;
      console.log(user.current);
      setVerify((pre) => {
        return {
          msg: "User Authenticated!",
          show: true,
        };
      });
    } else {
      setVerify((pre) => {
        return {
          ...pre,
          msg: "Mobile number not registered!",
        };
      });
    }
    console.log(verify.show);
  }
  function changePassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      newPassword: formData.get("newpassword"),
      rePassword: formData.get("repassword"),
    };
    if (data.newPassword !== data.rePassword) {
      setVerify((prevVerify) => ({
        ...prevVerify,
        msg: "New Password and retype password should be same",
      }));
      return;
    }
    const users = getLocalStorageUsers();
    const index = users.findIndex((ele) => ele.username === user.current);
    const person = users[index];
    const updatedUser = {
      ...person,
      password: data.newPassword,
    };
    users[index] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password Reset Successful!");
    setVerify(initialState);
    ref.current.close();
  }
  function handleClose() {
    setVerify(initialState);
    ref.current.close();
  }
  return (
    <>
      <dialog ref={dialog} id={classes.dialog}>
        <h2>Reset Password</h2>
        {verify.msg !== "" && <h5>{verify.msg}</h5>}
        <form method="dialog" className={classes.form} onSubmit={verifyUser}>
          <label htmlFor="num">Enter Registered Mobile Number</label>
          <div className={classes.fixbtn}>
            <input type="number" name="num" />
            <button>Verify</button>
          </div>
        </form>
        {!verify.show && (
          <button className={classes.button} onClick={() => handleClose()}>
            Close
          </button>
        )}
        {verify.show && (
          <>
            <form className={classes.form} onSubmit={changePassword}>
              <label htmlFor="newpassword">New Password</label>
              <input type="text" name="newpassword" />
              <label htmlFor="repassword">Retype Password</label>
              <input type="text" name="repassword" />
              <div className={classes.buttonbox}>
                <button>Reset</button>
                <button type="button" onClick={() => handleClose()}>
                  Close
                </button>
              </div>
            </form>
          </>
        )}
      </dialog>
    </>
  );
});

export default ResetPasswordModel;
