import React from 'react';
import { fetchBranches, createAccount } from "../../../../../API";
import { toast } from 'react-toastify';
import { Modal } from "../../../../../shared/Modal/Modal";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./style.module.css";

const Creatacc = () => {
  const [accountType, setAccountType] = React.useState(0);
  const [branch, setBranch] = React.useState(0);
  const [branches, setBranches] = React.useState([]);
  const [showModal, setShowModal]=React.useState(false);

  React.useEffect(() => {
    fetchBranches((branches) => setBranches(branches), (message) => toast(message,{position: "top-center", autoClose: 2000,}));
  }, []);

  const accountTypes = [
    { label: "Savings (3% Interest)", value: 1 },
    { label: "Business (12% Interest)", value: 2 },
  ] ;
    
  const onAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  }

  const onBranchChange = (e) => {
    setBranch(e.target.value);
  }

  const onSubmitClick = (e) => {    
    if(!accountType) return toast.warning("Choose the account type!",{position: "top-center", autoClose: 2000,});
    if(!branch) return toast.warning("Branch is not selected !",{position: "top-center", autoClose: 2000,});
    setShowModal(true);
}

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    const data = {branchId: branch, accountType, balance: 1000};

    createAccount(data, (message) => toast(message,{position: "top-center", autoClose: 2000,}), (message) => toast(message,{position: "top-center", autoClose: 2000,}));
  }

  return (
    <>
    {showModal && <Modal onConfirm={onSubmit} onCancel={() => setShowModal(false)}/>} 
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.contact_box}>
          <h2 className={styles.h2_cont}>CREATE NEW BANK ACCOUNT</h2>
          <select className={styles.field} value={accountType} onChange={onAccountTypeChange}>
            <option value={0} selected disabled>Select an account type</option>
            { accountTypes.map((account,idx) => <option key={idx} value={account.value}>{account.label}</option>) }
          </select>
          <select className={styles.field} value={branch} onChange={onBranchChange}>
            <option value={0} selected disabled>Select an branch</option>
            { branches.map((branch, idx) => <option key={idx} value={branch.id} >{branch.name}</option> ) }
          </select>
          <button type="button" onClick={onSubmitClick} className={styles.btn}>CREATE</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Creatacc