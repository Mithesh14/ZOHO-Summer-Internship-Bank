import React from 'react'
import styles from "./style.module.css";

const Creatacc = () => {
  const [accountType, setAccountType] = React.useState(0);

  const accounts = [
    { label: "Savings (3% Interest)", value: 1 },
    { label: "Business (12% Interest)", value: 2 },
    { label: "Loan (Depends on loan type)", value: 3 },
  ] ;
  
  const branches = [
    { label: "MKB Nagar", value: 1 },
    { label: "Kottur", value: 2 },
    { label: "Adayar", value: 3 },
  ];

  const loans = [
    { label: "Personal", value: 1 },
    { label: "Home", value: 2 },
    { label: "Vehicle", value: 3 },
  ];
  
  const onAccountTypeChange = (e) => {
    console.log(e.target.value);
    setAccountType(e.target.value);
  }

  return (
    <div className={styles.main}>
    <div className={styles.container}>
        <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>Create Bank Account { accountType }</h2>

                <select className={styles.field} value={accountType} onChange={onAccountTypeChange}>
                  <option value={0} selected disabled>Select an account type</option>
                  {accounts.map((account,idx) => <option key={idx} value={account.value}>{account.label}</option>)}
                </select>

                <select className={styles.field}>
                  <option value={0} selected disabled>Select an branch</option>
                  { branches.map((branch, idx) => <option key={idx} value={branch.value} >{branch.label}</option> ) }
                </select>
                
                {
                  accountType == 3 &&
                  <select className={styles.field}>
                    { loans.map((loan, idx) => <option key={idx} value={loan.value} >{loan.label}</option> ) }
                  </select>
                }

                <textarea placeholder="Reason" className={styles.field}></textarea>
                <button className={styles.btn}>Create new account</button>
                </div>

        </div>
    </div>
  )
}

export default Creatacc