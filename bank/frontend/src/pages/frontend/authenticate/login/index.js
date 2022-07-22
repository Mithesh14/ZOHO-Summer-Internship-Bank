import React from "react";
import { Link } from 'react-router-dom';

import { MdPassword, MdContactPhone } from 'react-icons/md';
import styles from "./style.module.css";
import Login from "../../../../assests/img/bank.svg";

function index() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.login_form}>
        <form>
          <h1>LOGIN</h1>
          <div className={styles.content}>
            <div className={styles.input_field}>
              <input type="phonenumber" placeholder="PhoneNumber" autoComplete="nope" />
              <MdContactPhone className={styles.ioP} />
            </div>

            <div className={styles.input_field}>
              <input type="password" placeholder="Password" autoComplete="new-password" />
              <MdPassword className={styles.ioP} />
            </div>
          </div>
          <div className={styles.action}>
            <Link to="/authentication/SignUp" className={styles.btn} style={{ textDecoration: 'none', textAlign: "center" }}>Sign up</Link>
            <button className={styles.btn}>LOGIN</button>

          </div>
        </form>

      </div>
      <img src={Login} className={styles.log_img} alt=""/>
    </div>
  );
}

export default index;