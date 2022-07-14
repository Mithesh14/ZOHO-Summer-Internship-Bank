import React from 'react';
import styles from "./style.module.css";

const Rep = () => {
    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>REPORT</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>BRANCH ID</th>
                            <th>BRANCH NAME</th>
                            <th>NUMBER OF ACCOUNTS</th>
                            <th>AMOUNT DEPOSITED</th>
                            <th>LOANS AVAILED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Kottur</td>
                            <td>4659</td>
                            <td>1379567</td>
                            <td>96725</td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>2</td>
                            <td>MKB Nagar</td>
                            <td>9765</td>
                            <td>102045</td>
                            <td>379548</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Chromepet</td>
                            <td>679</td>
                            <td>57954</td>
                            <td>30210</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Teynampet</td>
                            <td>976431</td>
                            <td>13466741</td>
                            <td>9784512</td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>5</td>
                            <td>Adyar</td>
                            <td>56784</td>
                            <td>1234932</td>
                            <td>123002</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Rep