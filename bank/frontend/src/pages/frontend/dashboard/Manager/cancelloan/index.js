import React from 'react'
import styles from "./style.module.css";

const Can = () => {
    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>CANCEL LOAN</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>CUSTOMER ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>LOAN ID</th>
                            <th>LOAN TYPE</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th>CANCEL</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>1</td>
                            <td>Mitz</td>
                            <td>6</td>
                            <td>Savings</td>
                            <td>Not paid</td>
                            <td>35000</td>
                            <td><button className={styles.btn}>Cancel</button></td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>2</td>
                            <td>Anirudh</td>
                            <td>9</td>
                            <td>Business</td>
                            <td>Not paid</td>
                            <td>4588567</td>
                            <td><button className={styles.btn}>Cancel</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Rajini</td>
                            <td>45</td>
                            <td>Self</td>
                            <td>Paid</td>
                            <td>520067</td>
                            <td><button className={styles.btn}>Cancel</button></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Madhavan</td>
                            <td>34</td>
                            <td>Self</td>
                            <td>Not Paid</td>
                            <td>30010</td>
                            <td><button className={styles.btn}>Cancel</button></td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>5</td>
                            <td>Arunachalam</td>
                            <td>64</td>
                            <td>Business</td>
                            <td>Paid</td>
                            <td>234980</td>
                            <td><button className={styles.btn}>Cancel</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Can