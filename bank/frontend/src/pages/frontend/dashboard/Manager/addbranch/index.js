import React from 'react';
import styles from "./style.module.css";
import { createBranch } from "../../../../../API";
import { toast } from 'react-toastify';
import { Modal } from "../../../../../shared/Modal/Modal";
import 'react-toastify/dist/ReactToastify.css';

const Dep = () => {

    const [branchname, setBranchName] = React.useState();
    const [branchaddress, setBranchAddress] = React.useState();
    const [showModal, setShowModal]=React.useState(false);

    const onBranchName = (e) => {
        setBranchName(e.target.value);
      }
    
      const onBranchAddress = (e) => {
        setBranchAddress(e.target.value);
      }

      const onSubmitClick = (e) => {    
        if(!branchname){
            return toast.warn("Enter a branch",{position: "top-center", autoClose: 2000,});
        }

        if(!branchaddress){
            return toast.warn("Enter a branch address",{position: "top-center", autoClose: 2000,});
        }
    
        setShowModal(true);

    }
    
      const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        const data = {name: branchname, address: branchaddress};
        createBranch(data, (message) => toast(message,{position: "top-center", autoClose: 2000,}), (message) => toast(message,{position: "top-center", autoClose: 2000,}));
      }

      
    return (
        <>
        {showModal && <Modal onConfirm={onSubmit} onCancel={() => setShowModal(false)}/>}  
        <div className={styles.main}>
            <div className={styles.container}>
                <form className={styles.contact_box} >
                    <h2 className={styles.h2_cont}>ADD BRANCH</h2>
                    <input type="text" className={styles.field} placeholder="Branch Name" value={branchname} onChange={onBranchName}></input>
                    <textarea placeholder="Address" className={styles.field} value={branchaddress} onChange={onBranchAddress}></textarea>
                    <button className={styles.btn}  type="button" onClick={onSubmitClick}>Add branch</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Dep