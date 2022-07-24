import React from 'react';
import styles from "./style.module.css";
import { withdrawMoney, fetchAccounts } from "../../../../../API"
import accounts from '../account';

const Wit = () => {
    const [accounts, setAccounts] = React.useState([]);
    const [accountNumber, setAccountNumber] = React.useState("");
    const [amount, setAmount] = React.useState("");

    const success = (message) => {
        alert(message);
    }
    
    const error = (message) => {
        alert(message);
    }

    React.useEffect(() => {
        fetchAccounts((accounts) => setAccounts(accounts.otherAccounts), (message) => alert(message));
    }, []);
      
    const onSubmit = (e) => {
        e.preventDefault();
     
        if(accountNumber === "") return alert("Account Number cannot be empty");
        if(amount === "") return alert("Amount cannot be empty");
     
        const data = { accountNumber, amount };
    
        withdrawMoney(data, success, error);
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form onSubmit={onSubmit} className={styles.contact_box}>
                    <h2 className={styles.h2_cont}>Withdraw Money</h2>
                    <select className={styles.field} onChange={(e) => setAccountNumber(e.target.value)}>
                        <option className={styles.field} value="" selected disabled>Select an account</option>
                        {accounts.map(account => <option value={account.accountNumber}>{account.accountNumber}</option>)}
                    </select>
                    <input type="number" className={styles.field} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                    <button type="submit" className={styles.btn}>Withdraw money</button>
                </form>
            </div>
        </div>
    )
}

export default Wit