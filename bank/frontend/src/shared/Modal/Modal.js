import React from 'react'
import styles from "./style.module.css";

export const Modal = (props) => {
  return (
    <div className={styles.main}>
        <h2 className={styles.sure}>Are you sure ?</h2>
        <div className={styles.buttonclass}>
          <button type="button" className={styles.btn_one} onClick={props.onConfirm}>Confirm</button>
          <button type="button" className={styles.btn_two} onClick={props.onCancel}>Cancel</button>
          </div>
        </div>
  )
}

export default Modal