import React from 'react';
import styles from "./style.module.css";

const Acc = () => {
    return (
        <div className={styles.main}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.card_content}>
                        <div className={styles.number}>1234 5678 9123</div>
                        <div className={styles.card_name}>MKB nagar</div>
                        <div className={styles.card_name}>Balance : Rs.65000</div>
                        <div className={styles.card_name} ><i>Savings account</i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_content}>
                        <div className={styles.number}>1234 5678 9123</div>
                        <div className={styles.card_name}>Kottur</div>
                        <div className={styles.card_name}>Balance : Rs.97200</div>
                        <div className={styles.card_name} ><i>Business account</i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_content}>
                        <div className={styles.number}>1004 5678 9003</div>
                        <div className={styles.card_name}>Chrompet</div>
                        <div className={styles.card_name}>Balance : Rs.2000</div>
                        <div className={styles.card_name} ><i>Savings account</i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_content}>
                        <div className={styles.number}>1234 5678 9123</div>
                        <div className={styles.card_name}>MKB nagar</div>
                        <div className={styles.card_name}>Balance : Rs.65000</div>
                        <div className={styles.card_name} ><i>Savings account</i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_content}>
                        <div className={styles.number}>1234 5678 9123</div>
                        <div className={styles.card_name}>MKB nagar</div>
                        <div className={styles.card_name}>Balance : Rs.65000</div>
                        <div className={styles.card_name} ><i>Savings account</i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Acc