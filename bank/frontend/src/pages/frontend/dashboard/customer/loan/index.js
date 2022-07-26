import React from 'react'
import styles from "./style.module.css";

const Lo = () => {
  
  return (
    <div className={styles.main}>
    <div className={styles.container}>
        <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>Loan</h2>
                <select className={styles.field}>
                  <option className={styles.field} value="" selected disabled>Select the type of loan</option>
                  <option className={styles.field} value="0"> Home loan </option>
                  <option className={styles.field} value="1"> Vehicle loan </option>
                  <option className={styles.field} value="2"> Personal loan </option>
                </select>
                <select className={styles.field}>
                  <option className={styles.field} value="" selected disabled>Select the loan period</option>
                  <option className={styles.field} value="0"> 5 months </option>
                  <option className={styles.field} value="1"> 10 months </option>
                  <option className={styles.field} value="2"> 15 months </option>
                </select>
                <select className={styles.field}>
                  <option className={styles.field} value="" selected disabled>Branches</option>
                  <option className={styles.field} value="0"> ABC Kottur </option>
                  <option className={styles.field} value="1"> ABC Chromepet </option>
                  <option className={styles.field} value="2"> ABC Main office </option>
                </select>


                <input type="number" className={styles.field} placeholder="Amount"></input>
                <button className={styles.btn}>Apply for Loan</button>

        </div>
    </div>
</div>
  )
}

export default Lo