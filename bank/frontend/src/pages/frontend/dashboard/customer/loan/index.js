import React from 'react'
import styles from "./style.module.css";
import { applyLoan, fetchBranches } from "../../../../../API"

const Lo = () => {
  const [loantype, setLoanType] = React.useState("");
  const [loantenure, setLoanTenure] = React.useState("");
  const [loanbranch, setLoanBranch] = React.useState("");
  const [loanamount, setLoanAmount] = React.useState("");
  const [branches, setBranches] = React.useState([]);

  const success = (message) => {
    alert(message);
}

const error = (message) => {
    alert(message);
}

React.useEffect(() => {
  fetchBranches((branches) => setBranches(branches), (message) => alert(message));
}, []);

const onSubmit = (e) => {
  e.preventDefault();

  if(loantype === "") return alert("Loan Type cannot be empty");
  if(loantenure === "") return alert("Loan Tenure cannot be empty");
  if(loanbranch === "") return alert("Loan Branch cannot be empty");
  if(loanamount === "") return alert("Loan amount cannot be empty");
  if(loanamount > 3000000) return alert("Loan amount shouldnot exceed 3000000");

  const data = { loantype, loantenure, loanbranch, loanamount };

  applyLoan(data, success, error);
}

  
  return (
    <div className={styles.main}>
    <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.contact_box}>
                <h2 className={styles.h2_cont}>Loan</h2>
                <select className={styles.field} onChange={(e) => setLoanType(e.target.value)}>
                  <option className={styles.field} value="" selected disabled>Select the type of loan</option>
                  <option className={styles.field} value="0"> Home loan </option>
                  <option className={styles.field} value="1"> Vehicle loan </option>
                  <option className={styles.field} value="2"> Personal loan </option>
                </select>
                <select className={styles.field} onChange={(e) => setLoanTenure(e.target.value)}>
                  <option className={styles.field} value="" selected disabled>Select the loan period</option>
                  <option className={styles.field} value="12"> 12 months </option>
                  <option className={styles.field} value="24"> 24 months </option>
                  <option className={styles.field} value="36"> 36 months </option>
                </select>
                <select className={styles.field}  onChange={(e) => setLoanBranch(e.target.value)}>
                  <option className={styles.field} value="" selected disabled>Branches</option>
                  {branches.map(branch => <option value={branch.id}>{branch.name}</option>)}
                </select>
                <input type="number" className={styles.field} placeholder="Amount" value={loanamount} onChange={(e) => setLoanAmount(e.target.value)}></input>
                <button className={styles.btn}>Apply for Loan</button>

        </form>
    </div>
</div>
  )
}

export default Lo