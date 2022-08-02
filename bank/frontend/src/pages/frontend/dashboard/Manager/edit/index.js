import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { editBranch } from "../../../../../API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./style.module.css";

const EditPage = () => {
    const { state: { branch } } = useLocation();
    const navigate = useNavigate();
    const [branchName, setBranchName] = React.useState(branch.name);
    const [branchAddress, setBranchAddress] = React.useState(branch.address);

    const onBranchName = (e) => {
        setBranchName(e.target.value);
    }

    const onBranchAddress = (e) => {
        setBranchAddress(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!branchName) {
            return toast.warn("Enter a branch name.",{position: "top-center", autoClose: 2000,});
        }

        if (!branchAddress) {
            return toast.warn("Enter a branch address.",{position: "top-center", autoClose: 2000,});
        }

        const data = {id: branch.id, name: branchName, address: branchAddress };

        editBranch(data, (message) => { toast(message,{position: "top-center", autoClose: 2000,}); navigate("..") }, (message) => toast(message,{position: "top-center", autoClose: 2000,}));
    }


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form className={styles.contact_box} onSubmit={onSubmit}>
                    <h2 className={styles.h2_cont}>EDIT BRANCH</h2>
                    <input type="text" className={styles.field} placeholder="Branch Name" value={branchName} onChange={onBranchName}></input>
                    <textarea placeholder="Address" className={styles.field} value={branchAddress} onChange={onBranchAddress}></textarea>
                    <button className={styles.btn}>Edit branch</button>
                </form>
            </div>
        </div>
    )
}

export default EditPage;