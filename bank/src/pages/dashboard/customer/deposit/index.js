import React from 'react';
import styles from "./style.module.css";

const Dep = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.contact_box}>
                    <h2 className={styles.h2_cont}>DEPOSIT</h2>
                    <input type="number" className={styles.field} placeholder="Account Number"></input>
                    <input type="text" className={styles.field} placeholder="Branch"></input>
                    <input type="number" className={styles.field} placeholder="Amount"></input>
                    <textarea placeholder="Subject" className={styles.field}></textarea>
                    <button className={styles.btn}>Deposit money</button>

                </div>
            </div>
        </div>
    )
}

export default Dep