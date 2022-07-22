import React from "react";
import { Link } from 'react-router-dom';
import { IoPeople } from 'react-icons/io5';
import { MdPassword, MdAlternateEmail, MdContactPhone } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';


import styles from "./style.module.css";

import reg from "../../../../assests/img/bank.svg";

function Register() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.register_form}>
        <form method="POST">
          <h1>Sign Up</h1>
          <div className={styles.content}>
            <div className={styles.input_field}>
              <input
                type="text"
                name="name"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Name"
              />
              <IoPeople className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
              <MdAlternateEmail className={styles.ioP} />
            </div>

            <div className={styles.input_field}>
              <input
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <MdPassword className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <input
                type="password"
                name="cpassword"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Confirm password"
              />
              <GiConfirmed className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Phone number"
              />
              <MdContactPhone className={styles.iop} />
            </div>
          </div>

          <div className={styles.action}>
            <Link to="/" className={styles.btn} style={{ textDecoration: 'none', textAlign: "center" }}>Login</Link>
            <button className={styles.btn}>SignUp</button>
          </div>
        </form>
      </div>
      <img src={reg} className={styles.img_reg} />
    </div>
  );
}

export default Register;