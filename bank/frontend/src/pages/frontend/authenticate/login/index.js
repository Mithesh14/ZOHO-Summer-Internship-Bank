import React from "react";
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { MdPassword, MdContactPhone } from 'react-icons/md';
import { login } from "../../../../API"
import {AuthenticationContext } from "../../../../providers/authentication";
import styles from "./style.module.css";
import log from "../../../../assests/img/bank.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const notify = () => toast("Login successfull!");
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showpassword, setshowPassword] = React.useState(false);
  const [state, setState] = React.useContext(AuthenticationContext);
  

  const success = (message) => {
    toast.success(message,{position: "top-center", autoClose: 2000,});
    window.location.reload();
  }

  const error = (message) => {
    toast.error(message,{position: "top-center", autoClose: 2000,});
  }

  const onSubmit = (e) => {
    e.preventDefault();
 
    if(phoneNumber === "") return toast.warn("Phone Number cannot be empty",{position: "top-center", autoClose: 2000,});
    if(password === "") return toast.warn("Password cannot be empty",{position: "top-center", autoClose: 2000,});
 
    const data = { phoneNumber, password };

    login(data, success, error);
  }

  if(state.status) 
        return <Navigate to="/dashboard" replace/>

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
                type={showpassword?"text":"password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MdPassword className={styles.ioP} />
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