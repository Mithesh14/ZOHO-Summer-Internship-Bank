import React from "react";
import { Link } from 'react-router-dom';
import { IoPeople } from 'react-icons/io5';
import { MdPassword, MdContactPhone } from 'react-icons/md';
import { ImAddressBook } from 'react-icons/im';
import { GiCharacter } from 'react-icons/gi'; 
import { register } from "../../../../API";

import styles from "./style.module.css";
import reg from "../../../../assests/img/bank.svg";

function Register() {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  const userTypes = [
    {label: "Customer", value: 0},
    {label: "Manager",  value: 1}
  ];

  const success = (message) => {
    alert(message);
  }

  const error = (message) => {
    alert(message);
  }

  const onSubmit = (e) => {
    e.preventDefault();
 
    if(name === "") return alert("Name cannot be empty");
    if(phoneNumber === "") return alert("Phone Number cannot be empty");
    if(address === "") return alert("Address cannot be empty");
    if(password === "") return alert("Password cannot be empty");
    if(role === "") return alert("Role cannot be empty");

    const data = { name, phoneNumber, address, password, role };

    register(data, success, error);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.register_form}>
        <form onSubmit={onSubmit}>
          <h1>SIGN UP</h1>
          <div className={styles.content}>
            <div className={styles.input_field}>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <IoPeople className={styles.iop} />
            </div>
            <div className={styles.input_field}>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MdPassword className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="phone-number"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <MdContactPhone className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <input
                type="text"
                name="address"
                className="form-control"
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <ImAddressBook className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <select className={styles.field} value={role}  onChange={(e) => setRole(e.target.value)}>
                  <option className={styles.field_option} value="" selected disabled>Select user type</option>
                  { userTypes.map(userType => <option className={styles.field} value={userType.value}>{userType.label}</option>) }
              </select>
              <GiCharacter className={styles.iop} />
            </div>
          </div>

          <div className={styles.action}>
            <Link to="/" className={styles.btn} style={{ textDecoration: 'none', textAlign: "center" }}>Login</Link>
            <button type="submit" className={styles.btn}>SignUp</button>
          </div>
        </form>
      </div>
      <img src={reg} className={styles.img_reg} />
    </div>
  );
}

export default Register;