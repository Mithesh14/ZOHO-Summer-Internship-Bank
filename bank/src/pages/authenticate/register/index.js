import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { IoPeople } from 'react-icons/io5';
import { MdPassword, MdAlternateEmail, MdContactPhone } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';


import styles from "./style.module.css";

import reg from "../../../assests/img/bank.svg";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const resp = await fetch("/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await resp.json();

    console.log(data);
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("registeration successful");

      navigate.push("/");
    }
  };
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
                value={user.name}
                onChange={handleInputs}
                placeholder="Name"
              />
              <IoPeople className={styles.iop}/>
            </div>

            <div className={styles.input_field}>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={user.email}
                onChange={handleInputs}
                placeholder="Email"
              />
              <MdAlternateEmail className={styles.ioP}/>
            </div>

            <div className={styles.input_field}>
              <input
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword1"
                value={user.password}
                onChange={handleInputs}
                placeholder="Password"
              />
              <MdPassword className={styles.iop}/>
            </div>

            <div className={styles.input_field}>
              <input
                type="password"
                name="cpassword"
                className="form-control"
                id="exampleInputPassword1"
                value={user.cpassword}
                onChange={handleInputs}
                placeholder="Confirm password"
              />
              <GiConfirmed className={styles.iop}/>
            </div>

            <div className={styles.input_field}>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="exampleInputPassword1"
                value={user.phone}
                onChange={handleInputs}
                placeholder="Phone number"
              />
              <MdContactPhone className={styles.iop}/>
            </div>
            </div>

            <div className={styles.action}>
              <Link to="/" className={styles.btn} style={{ textDecoration: 'none', textAlign: "center" }}>Login</Link>
              <button className={styles.btn} onClick={postData}>SignUp</button>
            </div>
        </form>
      </div>
      <img src={reg} className={styles.img_reg}/>
    </div>
  );
}

export default Register;