import React from 'react'
import styles from "./style.module.css";
import { resetPassword } from "../../../../../API"
import {useNavigate} from "react-router-dom"
import {AuthenticationContext} from "../../../../../providers/authentication"

const Resetpwd = () => {
    const [oldpassword, setoldPassword] = React.useState("");
    const [newpassword, setnewPassword] = React.useState("");
    const [confirmpassword, setconfirmPassword] = React.useState("");
    const navigate = useNavigate();
    const [state,setState] = React.useContext(AuthenticationContext);
    const success = (message) => {
        setState({user: null, status: false})
        alert(message);
        navigate("/");
    }
    
    const error = (message) => {
        alert(message);
    }

    const onSubmit = (e) => {
        e.preventDefault();
     
        if(newpassword === "") return alert("New passsword can't be empty");

        if(newpassword !== confirmpassword) return alert("Password doesn't match");

        console.log(newpassword);
        console.log(oldpassword);
        if(newpassword == oldpassword) return alert("Old password can't be new password");
        
        if(newpassword.length < 5) return alert("New passsword should be atleast 5 characters in length");
     
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