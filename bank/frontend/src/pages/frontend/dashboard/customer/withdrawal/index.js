import React from 'react';
import styles from "./style.module.css";
import { withdrawMoney, fetchAccounts } from "../../../../../API"
import { Modal } from "../../../../../shared/Modal/Modal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wit = () => {
    const [accounts, setAccounts] = React.useState([]);
    const [accountNumber, setAccountNumber] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [showModal, setShowModal]=React.useState(false);

    const success = (message) => {
        toast.success(message,{position: "top-center", autoClose: 2000,});
    }
    
    const error = (message) => {
        toast.error(message,{position: "top-center", autoClose: 2000,});
    }

    React.useEffect(() => {
        fetchAccounts((accounts) => {
            setAccounts(accounts.otherAccounts.filter(e => e.active !== 0))
        }, (message) => toast(message,{position: "top-center", autoClose: 2000,}));
    }, []);

    const onSubmitClick = (e) => {    
        if(accountNumber === "") return toast.warn("Select an account Number",{position: "top-center", autoClose: 2000,});
        if(amount === "") return toast.warn("Enter an amount",{position: "top-center", autoClose: 2000,});
        setShowModal(true);

    }
      
    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
         const data = { accountNumber, amount };
    
        withdrawMoney(data, success, error);
    }

    return (
        <>
        {showModal && <Modal onConfirm={onSubmit} onCancel={() => setShowModal(false)}/>}  
        <div className={styles.main}>
            <div className={styles.container}>
                <form className={styles.contact_box}>
                    <h2 className={styles.h2_cont}>WITHDRAW</h2>
                    <select className={styles.field} onChange={(e) => setAccountNumber(e.target.value)}>
                        <option className={styles.field} value="" selected disabled>Select an account</option>
                        {accounts.map(account => <option value={account.accountNumber}>{account.accountNumber}</option>)}
                    </select>
                    <input type="number" className={styles.field} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                    <button type="button" onClick={onSubmitClick} className={styles.btn}>Withdraw money</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Wit