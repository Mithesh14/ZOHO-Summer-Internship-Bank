import React from "react";
import { Link } from 'react-router-dom';

import { MdPassword, MdContactPhone } from 'react-icons/md';
import styles from "./style.module.css";
import Login from "../../../../assests/img/bank.svg";

function LoginFunction() {
  const [LoginphoneNumber, setLoginphoneNumber] = React.useState("");
  const [Loginpassword, setLoginpassword] = React.useState("");

  const success = (message) => {
    alert(message);
  }

  const error = (message) => {
    alert(message);
  }

  const onSubmit = (e) => {
    e.preventDefault();
 
    if(LoginphoneNumber === "") return alert("Phone Number cannot be empty");
    if(Loginpassword === "") return alert("Password cannot be empty");
 
    const data = { LoginphoneNumber, Loginpassword };

    LoginFunction(data, success, error);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.login_form}>
        <form onSubmit={onSubmit}>
          <h1>LOGIN</h1>
          <div className={styles.content}>
            <div className={styles.input_field}>
              <input 
              type="phonenumber" 
              placeholder="PhoneNumber" 
              autoComplete="nope" 
              value={LoginphoneNumber}
              onChange={(e) => setLoginphoneNumber(e.target.value)}
              />
              <MdContactPhone className={styles.ioP} />
            </div>

            <div className={styles.input_field}>
              <input 
              type="password" 
              placeholder="Password" 
              autoComplete="new-password" 
              value={Loginpassword}
              onChange={(e) => setLoginpassword(e.target.value)}
              />
              <MdPassword className={styles.ioP} />
            </div>
          </div>
          <div className={styles.action}>
            <Link to="/authentication/SignUp" className={styles.btn} style={{ textDecoration: 'none', textAlign: "center" }}>Sign up</Link>
            <button type="submit" className={styles.btn}>LOGIN</button>

          </div>
        </form>

      </div>
      <img src={Login} className={styles.log_img} alt=""/>
    </div>
  );
}

export default LoginFunction;