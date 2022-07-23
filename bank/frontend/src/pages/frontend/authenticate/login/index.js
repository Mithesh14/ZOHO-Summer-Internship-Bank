import React from "react";
import { Link } from 'react-router-dom';
import { MdPassword, MdContactPhone } from 'react-icons/md';
import { login } from "../../../../API"

import styles from "./style.module.css";
import log from "../../../../assests/img/bank.svg";

function Login() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");


  const success = (message) => {
    alert(message);
  }

  const error = (message) => {
    alert(message);
  }

  const onSubmit = (e) => {
    e.preventDefault();
 
    if(phoneNumber === "") return alert("Phone Number cannot be empty");
    if(password === "") return alert("Password cannot be empty");
 
    const data = { phoneNumber, password };

    login(data, success, error);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.login_form}>
        <form onSubmit={onSubmit}>
          <h1>LOGIN</h1>
          <div className={styles.content}>
            <div className={styles.input_field}>
              <input 
                type="text"
                placeholder="Phone Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <MdContactPhone className={styles.ioP} />
            </div>

            <div className={styles.input_field}>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
      <img src={log} className={styles.log_img} alt=""/>
    </div>
  );
}

export default Login;