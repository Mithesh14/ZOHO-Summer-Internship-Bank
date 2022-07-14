import React from 'react';
import styles from "./style.module.css";

const Dep = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.contact_box}>
                    <h2 className={styles.h2_cont}>ADD BRANCH</h2>
                    <input type="number" className={styles.field} placeholder="Branch Number"></input>
                    <input type="text" className={styles.field} placeholder="Branch Name"></input>
                    <textarea placeholder="Address" className={styles.field}></textarea>
                    <button className={styles.btn}>Add branch</button>

                </div>
            </div>
        </div>
    )
}

export default Dep