import React from 'react'
import styles from "./style.module.css";

const Cls = () => {
    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>CLOSE ACCOUNT</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>CUSTOMER ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>PHONE NUMBER</th>
                            <th>ADDRESS</th>
                            <th>STATUS</th>
                            <th>CLOSE</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr className={styles.active_row}>
                            <td>1</td>
                            <td>Mitz</td>
                            <td>6150576459</td>
                            <td>182, Avvai Shanmugam Salai, Gopalapuram, Chennai, Tamil Nadu 600086</td>
                            <td>Requested</td>
                            <td><button className={styles.btn}>Close</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Anirudh</td>
                            <td>9895556784</td>
                            <td>3rd Main Rd, MKB Nagar, Mahakavi Bharathiyar Nagar Central, Mahakavi Bharathi Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039</td>
                            <td>Not Requested</td>
                            <td><button className={styles.btn}>Close</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Rajini</td>
                            <td>7982370065</td>
                            <td>MIT Rd, Radha Nagar, Chromepet, Chennai, Tamil Nadu 600044</td>
                            <td>Not Requested</td>
                            <td><button className={styles.btn}>Close</button></td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>4</td>
                            <td>Madhavan</td>
                            <td>986537890</td>
                            <td>12, Sardar Patel Rd, Anna University, Guindy, Chennai, Tamil Nadu 600025</td>
                            <td>Requested</td>
                            <td><button className={styles.btn}>Close</button></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Arunachalam</td>
                            <td>6056079034</td>
                            <td>Estancia IT Park,Vallancherry, Plot No. 140 , 151, Great Southern Trunk Rd, Chengalpattu, Tamil Nadu 603202</td>
                            <td>Not Requested</td>
                            <td><button className={styles.btn}>Close</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cls