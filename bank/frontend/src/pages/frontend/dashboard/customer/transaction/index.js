import React from 'react';
import { fetchTransaction} from "../../../../../API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./style.module.css";

const transactionTypes = {
    1: "DEPOSIT",
    2: "WITHDRAWAL"
}

const Tran = () => {
    const [transactions, setTransactions] = React.useState([]);
    

    const success = (transactions) => {
        setTransactions(transactions);
    }

    const error = (message) => {
        toast.error(message,{position: "top-center", autoClose: 2000,});
    }

    React.useEffect(() => {
        fetchTransaction(success, error);
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>TRANSACTION HISTORY</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>TRANSACTION ID</th>
                            <th>ACCOUNT NUMBER</th>
                            <th>AMOUNT</th>
                            <th>TYPE</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map(
                                transaction => 
                                <tr>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.accountNumber}</td>
                                    <td>Rs.{transaction.amount}</td>
                                    <td>{transactionTypes[transaction.type]}</td>
                                    <td>{new Date(transaction.date).toLocaleString()}</td>
                                    <td>{transaction.status}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tran