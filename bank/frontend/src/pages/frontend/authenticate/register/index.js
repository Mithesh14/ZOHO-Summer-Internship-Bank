import React from "react";
import { Link } from 'react-router-dom';
import { IoPeople } from 'react-icons/io5';
import { MdPassword, MdContactPhone } from 'react-icons/md';
import { ImAddressBook } from 'react-icons/im';
import { GiCharacter } from 'react-icons/gi'; 
import { register } from "../../../../API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import styles from "./style.module.css";
import reg from "../../../../assests/img/bank.svg";

function Register() {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  
  const [showpassword, setshowPassword] = React.useState(false);

  const userTypes = [
    {label: "Customer", value: 0},
    {label: "Manager",  value: 1}
  ];

  const success = (message) => {
    toast.success(message,{position: "top-center", autoClose: 2000,});
  }

  const error = (message) => {
    toast.error(message,{position: "top-center", autoClose: 2000,});
  }

  const onSubmit = (e) => {
    e.preventDefault();
 
    if(name === "") return toast.warn("Enter a name",{position: "top-center", autoClose: 2000,});
    if(phoneNumber === "") return toast.warn("Enter a phone number",{position: "top-center", autoClose: 2000,});
    if(address === "") return toast.warn("Enter an address",{position: "top-center", autoClose: 2000,});
    if(password === "") return toast.warn("Enter a password",{position: "top-center", autoClose: 2000,});
    if(role === "") return toast.warn("Enter a role",{position: "top-center", autoClose: 2000,});

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
              <select className={styles.field_drop} value={role}  onChange={(e) => setRole(e.target.value)}>
                  <option className={styles.field_option} value="" selected disabled>Select user type</option>
                  { userTypes.map(userType => <option className={styles.field_drop} value={userType.value}>{userType.label}</option>) }
              </select>
              <GiCharacter className={styles.iop} />
            </div>

            <div className={styles.input_field}>
              <input
                type={showpassword?"text":"password"} 
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MdPassword className={styles.iop} />
            </div>

            <div className={styles.input_field_check}>Show password&nbsp;&nbsp;&nbsp;
              <input 
                type="checkbox" 
                placeholder="Show password"
                onChange={(e) => setshowPassword(!showpassword)}
              />
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