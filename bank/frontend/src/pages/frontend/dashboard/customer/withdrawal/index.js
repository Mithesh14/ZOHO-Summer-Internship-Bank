import React from 'react';
import styles from "./style.module.css";
import { withdrawMoney, fetchAccounts } from "../../../../../API"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wit = () => {
    const [accounts, setAccounts] = React.useState([]);
    const [accountNumber, setAccountNumber] = React.useState("");
    const [amount, setAmount] = React.useState("");

    const success = (message) => {
        toast.success(message,{position: "top-center", autoClose: 2000,});
    }
    
    const error = (message) => {
        toast.error(message,{position: "top-center", autoClose: 2000,});
    }

    React.useEffect(() => {
        fetchAccounts((accounts) => setAccounts(accounts.otherAccounts), (message) => toast(message,{position: "top-center", autoClose: 2000,}));
    }, []);
      
    const onSubmit = (e) => {
        e.preventDefault();
     
        if(accountNumber === "") return toast.warn("Choose the account Number!",{position: "top-center", autoClose: 2000,});
        if(amount === "") return toast.warn("Amount cannot be empty",{position: "top-center", autoClose: 2000,});
     
        const data = { accountNumber, amount };
    
        withdrawMoney(data, success, error);
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form onSubmit={onSubmit} className={styles.contact_box}>
                    <h2 className={styles.h2_cont}>WITHDRAW</h2>
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