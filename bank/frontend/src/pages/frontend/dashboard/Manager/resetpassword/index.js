import React from 'react'
import styles from "./style.module.css";
import { resetPassword } from "../../../../../API"
import {useNavigate} from "react-router-dom"
import {AuthenticationContext} from "../../../../../providers/authentication"

const Resetpwd = () => {
    const [newpassword, setnewPassword] = React.useState("");
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
        
        if(newpassword.length < 5) return alert("New passsword should be atleast 5 characters in length");
     
        const data = { password :   newpassword};
    
        resetPassword(data, success, error);
       
    }
    return (
        <div className={styles.main}>
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.contact_box}>
                <h2 className={styles.h2_cont}>RESET PASSWORD</h2>
                <input type="text" className={styles.field} placeholder="New password"  onChange={(e) => setnewPassword(e.target.value)}></input>
                <button type="submit" className={styles.btn}>Change password</button>
            </form>
        </div>
        </div>
  )
}

export default Resetpwd