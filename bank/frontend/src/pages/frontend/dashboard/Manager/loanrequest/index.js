import React from 'react'
import styles from "./style.module.css";

const loanreq = () => {
  return (
    <div className={styles.main}>
    <div className={styles.contact_box}>
        <h2 className={styles.h2_cont}>LOAN</h2>
        <table className={styles.content_table}>
            <thead>
                <tr>
                    <th>CUSTOMER ID</th>
                    <th>CUSTOMER NAME</th>
                    <th>ACCOUNT NUMBER</th>
                    <th>AMOUNT</th>
                    <th>PERIOD</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                <td>5</td>
                <td>Anirudh</td>
                <td>10000</td>
                <td>15000</td>
                <td>15</td>
                <button className={styles.btn}>Accept</button>
                <button className={styles.btn}>Reject</button>
            </tbody>
        </table>
            </div>
        </div>
    )
}


export default loanreq