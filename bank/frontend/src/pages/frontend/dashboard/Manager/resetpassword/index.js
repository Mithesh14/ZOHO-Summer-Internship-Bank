import React from 'react'
import styles from "./style.module.css";
import { resetPassword } from "../../../../../API"
import {useNavigate} from "react-router-dom"
import {AuthenticationContext} from "../../../../../providers/authentication"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resetpwd = () => {
    const [oldpassword, setoldPassword] = React.useState("");
    const [newpassword, setnewPassword] = React.useState("");
    const [confirmpassword, setconfirmPassword] = React.useState("");
    const navigate = useNavigate();
    const [state,setState] = React.useContext(AuthenticationContext);
    const success = (message) => {
        setState({user: null, status: false})
        toast.success(message,{position: "top-center", autoClose: 2000,});
        navigate("/");
    }
    
    const error = (message) => {
        toast.error(message,{position: "top-center", autoClose: 2000,});
    }

    const onSubmit = (e) => {
        e.preventDefault();
     
        if(newpassword === "") return toast.warn("New passsword can't be empty",{position: "top-center", autoClose: 2000,});

        if(newpassword !== confirmpassword) return toast.warn("Password doesn't match",{position: "top-center", autoClose: 2000,});

        if(newpassword == oldpassword) return toast.warn("Old password can't be new password",{position: "top-center", autoClose: 2000,});
        
        if(newpassword.length < 5) return toast.warn("New passsword should be atleast 5 characters in length",{position: "top-center", autoClose: 2000,});
     
        const data = { password :   newpassword, oldpassword: oldpassword, confirmpassword:confirmpassword};
    
        resetPassword(data, success, error);
       
    }
    return (
        <div className={styles.main}>
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.contact_box}>
            <h2 className={styles.h2_cont}>RESET PASSWORD</h2>
                <input type="text" className={styles.field} placeholder="Old password"  onChange={(e) => setoldPassword(e.target.value)}></input>
                <input type="text" className={styles.field} placeholder="New password"  onChange={(e) => setnewPassword(e.target.value)}></input>
                <input type="text" className={styles.field} placeholder="Confirm password" onChange={(e) => setconfirmPassword(e.target.value)}></input>
                <button type="submit" className={styles.btn}>Change password</button>
            </form>
        </div>
        </div>
  )
}

export default Resetpwd