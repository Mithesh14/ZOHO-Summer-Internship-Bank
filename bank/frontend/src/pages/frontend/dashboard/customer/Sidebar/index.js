import React from "react";
import { NavLink, Outlet } from 'react-router-dom';

import styles from "./style.module.css";
import { logout } from "../../../../../API"
import { MdOutlineAccountCircle,MdOutlineHistory, MdOutlineLogout } from 'react-icons/md';
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney}  from 'react-icons/gi';
import { IoCreateSharp } from 'react-icons/io5';

const activeClass = ({ isActive }) => isActive ? styles.active + " " + styles.link : styles.link;

const Customer = () => {
    const success = (message) => {
        alert(message);
        window.location.reload();
      }
    
      const error = (message) => {
        alert(message);
      }

      const onSubmit = (e) => {
        e.preventDefault();
        logout(success, error);
      }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.logo}>
                        <h2>Mitz</h2>
                    </div>
                    <div className={styles.user}>

                    </div>
                    <a href="../../authentication/Login">
                    <MdOutlineLogout onClick={onSubmit} className={styles.out} />
                    </a>                
                        </div>
                <div className={styles.sidebar}>
                    <div className={styles.sidecontent}>
                        <NavLink to="account" className={activeClass}>
                            <MdOutlineAccountCircle className={styles.ioP} />
                            <p className={styles.btn}>Account</p>
                        </NavLink>

                        <NavLink to="transaction" className={activeClass}>
                            <MdOutlineHistory className={styles.ioP} />
                            <p className={styles.btn}>Transaction</p>
                        </NavLink>


                        <NavLink to="deposit" className={activeClass}>
                            <GiPayMoney className={styles.ioP} />
                            <p className={styles.btn}>Deposit money</p>
                        </NavLink>

                        <NavLink to="withdrawal" className={activeClass}>
                            <GiReceiveMoney className={styles.ioP} />
                            <p className={styles.btn}>Withdraw money</p>
                        </NavLink>

                        <NavLink to="loan" className={activeClass}>
                            <GiReceiveMoney className={styles.ioP} />
                            <p className={styles.btn}>Apply for Loan </p></NavLink>

                        <NavLink to="emi" className={activeClass}>

                            <GiTakeMyMoney className={styles.ioP} />
                            <p className={styles.btn}>Schedule for EMI</p>
                        </NavLink>

                        <NavLink to="createacc" className={activeClass}>
                            <IoCreateSharp className={styles.ioP} />
                            <p className={styles.btn}>Create Account</p>
                        </NavLink>

                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Customer;