import React from 'react';
import styles from "./style.module.css";
import { depositMoney } from "../../../../../API"

const Dep = () => {
    const [accountNumber, setaccountNumber] = React.useState("");
    const [amount, setamount] = React.useState("");

    const success = (message) => {
        alert(message);
    }
    
    const error = (message) => {
        alert(message);
    }
      
    const onSubmit = (e) => {
        e.preventDefault();
     
        if(accountNumber === "") return alert("Account Number cannot be empty");
        if(amount === "") return alert("Amoount cannot be empty");
        if(!accountNumber) return alert("The requested account is not there!")
     
        const data = { accountNumber, amount };
    
        depositMoney(data, success, error);
      }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form onSubmit={onsubmit} className={styles.contact_box}>
                    <h2 className={styles.h2_cont}>DEPOSIT</h2>
                    <select className={styles.field} value={accountNumber}  onChange={(e) => setaccountNumber(e.target.value)}>
                  <option className={styles.field} value="" selected disabled>Select account number</option>
                  { userTypes.map(userType => <option className={styles.field} value={userType.value}>{userType.label}</option>) }
              </select>
                    <input  placeholder="Account Number" value={accountNumber}
                onChange={(e) => setaccountNumber(e.target.value)}></input>
                    <input type="number" className={styles.field} placeholder="Amount" value={amount}
                onChange={(e) => setamount(e.target.value)}></input>
                    <button type="submit" className={styles.btn}>Deposit money</button>

                </form>
            </div>
        </div>
    )
}

export default Dep