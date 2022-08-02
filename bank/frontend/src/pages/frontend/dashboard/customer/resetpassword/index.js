import React from 'react'
import styles from "./style.module.css";
import { resetPassword} from "../../../../../API"
import {useNavigate} from "react-router-dom"
import {AuthenticationContext} from "../../../../../providers/authentication"
import { toast } from 'react-toastify';
import { Modal } from "../../../../../shared/Modal/Modal";
import 'react-toastify/dist/ReactToastify.css';

const Resetpwd = () => {
    const [oldpassword, setoldPassword] = React.useState("");
    const [newpassword, setnewPassword] = React.useState("");
    const [confirmpassword, setconfirmPassword] = React.useState("");
    const navigate = useNavigate();
    const [state,setState] = React.useContext(AuthenticationContext);
    const [showModal, setShowModal]=React.useState(false);
    
    const success = (message) => {
        setState({user: null, status: false})
        toast.success(message,{position: "top-center", autoClose: 2000,});
        navigate("/");
    }
    
    const error = (message) => {
        toast.error(message,{position: "top-center", autoClose: 2000,});
    }

    const onSubmitClick = (e) => {    
        if(!newpassword && !oldpassword && !confirmpassword) return toast.warning("Credentials can't be empty",{position: "top-center", autoClose: 2000,}); 
        
        if(newpassword === "") return toast.warning("Enter a New passsword",{position: "top-center", autoClose: 2000,});

        if(!oldpassword) return toast.warning("Enter an Old passsword",{position: "top-center", autoClose: 2000,});

        if(!confirmpassword) return toast.warning("Confirm passsword can't be empty",{position: "top-center", autoClose: 2000,});

        if(newpassword !== confirmpassword) return toast.warning("Password doesn't match",{position: "top-center", autoClose: 2000,})
        
        if(newpassword.length < 5) return toast.warning("New passsword should be atleast 5 characters",{position: "top-center", autoClose: 2000,});
     
        setShowModal(true);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        const data = { password :   newpassword, oldpassword: oldpassword, confirmpassword:confirmpassword};
        resetPassword(data, success, error);
       
    }
    return (
        <>
        {showModal && <Modal onConfirm={onSubmit} onCancel={() => setShowModal(false)}/>}  
        <div className={styles.main}>
        <div className={styles.container}>
            <form className={styles.contact_box}>
                <h2 className={styles.h2_cont}>RESET PASSWORD</h2>
                <input type="text" className={styles.field} placeholder="Old password"  onChange={(e) => setoldPassword(e.target.value)}></input>
                <input type="text" className={styles.field} placeholder="New password"  onChange={(e) => setnewPassword(e.target.value)}></input>
                <input type="text" className={styles.field} placeholder="Confirm password" onChange={(e) => setconfirmPassword(e.target.value)}></input>
                <button  type="button" onClick={onSubmitClick} className={styles.btn}>Change password</button>
            </form>
        </div>
        </div>
        </>
  )
}

export default Resetpwd