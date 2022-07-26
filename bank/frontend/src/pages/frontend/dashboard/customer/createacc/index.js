import React from 'react';
import { fetchBranches, createAccount } from "../../../../../API";

import styles from "./style.module.css";

const Creatacc = () => {
  const [accountType, setAccountType] = React.useState(0);
  const [branch, setBranch] = React.useState(0);
  const [branches, setBranches] = React.useState([]);

  React.useEffect(() => {
    fetchBranches((branches) => setBranches(branches), (message) => alert(message));
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

  const onSubmit = (e) => {
    e.preventDefault();

    // add validation

    const data = {branchId: branch, accountType, balance: 1000};

    createAccount(data, (message) => alert(message), (message) => alert(message));
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.contact_box} onSubmit={onSubmit}>
          <h2 className={styles.h2_cont}>Create Bank Account</h2>
          <select className={styles.field} value={accountType} onChange={onAccountTypeChange}>
            <option value={0} selected disabled>Select an account type</option>
            { accountTypes.map((account,idx) => <option key={idx} value={account.value}>{account.label}</option>) }
          </select>
          <select className={styles.field} value={branch} onChange={onBranchChange}>
            <option value={0} selected disabled>Select an branch</option>
            { branches.map((branch, idx) => <option key={idx} value={branch.id} >{branch.name}</option> ) }
          </select>
          <button className={styles.btn}>Create new account</button>
        </form>
      </div>
    </div>
  )
}

export default Creatacc