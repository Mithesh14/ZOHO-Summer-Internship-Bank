import React from 'react';
import styles from "./style.module.css";
import { createBranch } from "../../../../../API";

const Dep = () => {

    const [branchname, setBranchName] = React.useState();
    const [branchaddress, setBranchAddress] = React.useState();

    const onBranchName = (e) => {
        setBranchName(e.target.value);
      }
    
      const onBranchAddress = (e) => {
        setBranchAddress(e.target.value);
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        
        
        if(!branchname)
        {
            alert("Branch Name can't be empty!");
        }

        if(!branchaddress)
        {
            alert("Branch address can't be empty!");
        }
    
        const data = {name: branchname, address: branchaddress};
    
        createBranch(data, (message) => alert(message), (message) => alert(message));
      }

      
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form className={styles.contact_box} onSubmit={onSubmit}>
                    <h2 className={styles.h2_cont}>ADD BRANCH</h2>
                    <input type="text" className={styles.field} placeholder="Branch Name" value={branchname} onChange={onBranchName}></input>
                    <textarea placeholder="Address" className={styles.field} value={branchaddress} onChange={onBranchAddress}></textarea>
                    <button className={styles.btn} onSubmit={onsubmit}>Add branch</button>
                </form>
            </div>
        </div>
    )
}

export default Dep