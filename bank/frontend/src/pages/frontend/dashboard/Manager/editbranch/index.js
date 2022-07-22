import React from 'react'
import styles from "./style.module.css";

const Tran = () => {
    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>EDIT BRANCH</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>BRANCH NUMBER</th>
                            <th>BRANCH NAME</th>
                            <th>ADDRESS</th>
                            <th>NUMBER OF ACCOUNTS</th>
                            <th>AMOUNT DEPOSITED</th>
                            <th>LOANS AVAILED</th>
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>1</td>
                            <td>Kottur</td>
                            <td>Co Nr Mehta Pole, Bank Of Baroda Road, Co, Nr Mehta Pole, Mandvi</td>
                            <td>4659</td>
                            <td>1379567</td>
                            <td>96725</td>
                            <td><button className={styles.btn}>Edit</button></td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>2</td>
                            <td>MKB Nagar</td>
                            <td>Co Nr Mehta Pole, Bank Of Baroda Road, Co, Nr Mehta Pole, Mandvi</td>
                            <td>9765</td>
                            <td>102045</td>
                            <td>379548</td>
                            <td><button className={styles.btn}>Edit</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Chromepet</td>
                            <td>Co Nr Mehta Pole, Bank Of Baroda Road, Co, Nr Mehta Pole, Mandvi</td>
                            <td>679</td>
                            <td>57954</td>
                            <td>30210</td>
                            <td><button className={styles.btn}>Edit</button></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Teynampet</td>
                            <td>Co Nr Mehta Pole, Bank Of Baroda Road, Co, Nr Mehta Pole, Mandvi</td>
                            <td>976431</td>
                            <td>13466741</td>
                            <td>9784512</td>
                            <td><button className={styles.btn}>Edit</button></td>
                        </tr>
                        <tr className={styles.active_row}>
                            <td>5</td>
                            <td>Adyar</td>
                            <td>Co Nr Mehta Pole, Bank Of Baroda Road, Co, Nr Mehta Pole, Mandvi</td>
                            <td>56784</td>
                            <td>1234932</td>
                            <td>123002</td>
                            <td><button className={styles.btn}>Edit</button></td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tran