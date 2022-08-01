import React from 'react';
import { fetchAccounts, closeAccount } from "../../../../../API";
import { Modal } from "../../../../../shared/Modal/Modal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./style.module.css";

const Accounts = () => {
    const [accounts, setAccounts] = React.useState([]);
    const [loans, setLoans] = React.useState([]);
    const [active, setActive] = React.useState([]);

    const success = (data) => {
        setLoans(data.loanAccounts);
        setAccounts(data.otherAccounts);
        setActive(data.active);
    }
    
    const error = (message) => {
        console.log("Error");
    }

    React.useEffect(() => {
        fetchAccounts(success, error);
    }, []);

    return (
        <div className={styles.main}>
             <h2 className={styles.h2_cont}>SAVINGS AND BUSINESS ACCOUNTS</h2>
            <div className={styles.cards}>
                { accounts.map(account => <Card account={account}/>) }
            </div>
            <h2 className={styles.h2_cont}>LOAN ACCOUNTS</h2>
            <div className={styles.cards}>
               { loans.map(account => <Card account={account}/>) }
           </div>
        </div>
    )
}

const Card = (props) => {
    const [showModal, setShowModal]=React.useState(false);

    const accountTypes = {
        1: "Savings Account",
        2: "Business Account",
        3: "Loan Account"
    }

    const activeTypes = {
        0: "Closed",
        1: "Active",
        2: "Requested"
    }
    

    const onClose = () => {
        setShowModal(false);
        closeAccount({accountNumber: props.account.accountNumber}, (message) => toast(message,{position: "top-center", autoClose: 2000,}), (message) => toast(message,{position: "top-center", autoClose: 2000,}));
    }

    return (
        <>
        {showModal && <Modal onConfirm={onClose} onCancel={() => setShowModal(false)}/>}        
        <div className={styles.card}>
            <div className={styles.card_content}>
                <div className={styles.number}>{ props.account.accountNumber }</div>
                <div className={styles.card_name}>BALANCE : { props.account.balance }</div>
                <div className={styles.card_name} >BRANCH ID : { props.account.branchId }</div>
                <div className={styles.card_name}>{ props.account.branch.address }</div>
                <div className={styles.card_name} ><i>{ accountTypes[props.account.type] }, { activeTypes[props.account.active] }</i></div>
                {props.account.active === 1 && props.account.type !== 3 && <button onClick={() => setShowModal(true)} className={styles.btn}>Close</button>}
            </div>
        </div>
        </>
    );
}

export default Accounts;