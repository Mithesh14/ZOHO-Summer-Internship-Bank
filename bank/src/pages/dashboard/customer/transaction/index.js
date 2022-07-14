import React from 'react'
import styles from "./style.module.css";

const Tran = () => {
    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>TRANSACTION HISTORY</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>TRANSACTION ID</th>
                            <th>TYPE</th>
                            <th>ACCOUNT NUMBER</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Withdrawal</td>
                            <td>6,789</td>
                            <td>11/04/2022</td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>2</td>
                            <td>Deposit</td>
                            <td>25000</td>
                            <td>01/05/2022</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Withdrawal</td>
                            <td>10679</td>
                            <td>05/05/2022</td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>Withdrawal</td>
                            <td>4378</td>
                            <td>05/05/2022</td>
                        </tr>


                        <tr className={styles.active_row}>
                            <td>5</td>
                            <td>Deposit</td>
                            <td>8306</td>
                            <td>05/05/2022</td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tran