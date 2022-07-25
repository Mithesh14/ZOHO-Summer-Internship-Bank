import React from 'react';
import { fetchAccounts, closeAccount } from "../../../../../API";

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
    const accountTypes = {
        1: "Savings Account",
        2: "Business Account",
        3: "Loan Account"
    }

    const activeTypes = {
        0: "Closed",
        1: "Active",
    }

    const onClose = () => {
        closeAccount({accountNumber: props.account.accountNumber}, (message) => alert(message), (message) => alert(message));
    }

    return (
        <div className={styles.card}>
            <div className={styles.card_content}>
                <div className={styles.number}>{ props.account.accountNumber }</div>
                <div className={styles.card_name}>BALANCE : { props.account.balance }</div>
                <div className={styles.card_name} >BRANCH ID : { props.account.branchId }</div>
                <div className={styles.card_name}>{ props.account.branch.address }</div>
                <div className={styles.card_name} ><i>{ accountTypes[props.account.type] }, { activeTypes[props.account.active] }</i></div>
                {props.account.active == 1 && <button className={styles.btn} onClick={onClose}>Close</button>}
            </div>
        </div>
    );
}

export default Accounts;