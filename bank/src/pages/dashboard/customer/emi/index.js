import React from 'react'
import styles from "./style.module.css";

const emi = () => {
  return (
    <div className={styles.main}>
    <div className={styles.contact_box}>
        <h2 className={styles.h2_cont}>Schedule EMI</h2>
        <div className={styles.h3_cont}>
        <h3 className={styles.h31_cont}>Total Money : 250000</h3>
        <h3 className={styles.h32_cont}>Interest : 15%</h3>
        </div>
        <table className={styles.content_table}>
            <thead>
                <tr>
                    <th>MONTH</th>
                    <th>LOAN EMI</th>
                    <th>TOTAL INTEREST PAYABLE</th>
                    <th>TOTAL PAYMENT (PRINCIPAL + INTEREST)</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr className={styles.active_row}>
                    <td>1</td>
                    <td>51,891</td>
                    <td>9,453</td>
                    <td>2,59,453</td>
                    <td>Paid</td>
                </tr>
                <tr className={styles.active_row}>
                    <td>2</td>
                    <td>51,891</td>
                    <td>9,453</td>
                    <td>2,59,453</td>
                    <td>Paid</td>
                </tr>
                <tr className={styles.active_row}>
                    <td>3</td>
                    <td>51,891</td>
                    <td>9,453</td>
                    <td>2,59,453</td>
                    <td>Paid</td>
                </tr>

                <tr>
                    <td>4</td>
                    <td>51,891</td>
                    <td>9,453</td>
                    <td>2,59,453</td>
                    <td>Not Paid</td>
                </tr>


                <tr>
                    <td>5</td>
                    <td>51,891</td>
                    <td>9,453</td>
                    <td>2,59,453</td>
                    <td>Not Paid</td>
                </tr>


            </tbody>
        </table>
    </div>
</div>
  )
}

export default emi