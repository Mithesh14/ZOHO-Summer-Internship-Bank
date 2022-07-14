import React from 'react'
import styles from "./style.module.css";

const Creatacc = () => {
  return (
    <div className={styles.main}>
    <div className={styles.container}>
        <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>Create Bank Account</h2>
                <input type="text" className={styles.field} placeholder="Account Type"></input>
                <input type="text" className={styles.field} placeholder="Branch"></input>
                <textarea placeholder="Reason" className={styles.field}></textarea>
                <button className={styles.btn}>Create new account</button>

        </div>
    </div>
</div>
  )
}

export default Creatacc