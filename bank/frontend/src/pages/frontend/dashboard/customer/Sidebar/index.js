import React from "react";
import { NavLink, Outlet,useNavigate } from 'react-router-dom';

import styles from "./style.module.css";
import { logout } from "../../../../../API"
import { MdOutlineAccountCircle,MdOutlineHistory, MdOutlineLogout } from 'react-icons/md';
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney, GiMoneyStack}  from 'react-icons/gi';
import { BiReset}  from 'react-icons/bi';
import { IoCreateSharp } from 'react-icons/io5';
import {AuthenticationContext} from "../../../../../providers/authentication"
import { fetchLoan } from "../../../../../API";


const activeClass = ({ isActive }) => isActive ? styles.active + " " + styles.link : styles.link;

const Customer = () => {
    const [state,setState] = React.useContext(AuthenticationContext);
    const [loan, setLoan] = React.useState(null);
    const navigate = useNavigate();

    const role = {
        0: "Customer",
        1: "Manager",
    }

    const success = (message) => {
        setState({user: null, status: false})
        alert(message);
        navigate("/");
      }
    
      const error = (message) => {
        alert(message);
      }

      const onSubmit = (e) => {
        e.preventDefault();
        logout(success, error);
      }

      React.useEffect(() => {
        fetchLoan((loan) => setLoan(loan), (message) => alert(message));
    },[]);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.logo}>
                    <h2>{state.user.name}</h2>
                    <h3>{role[state.user.role]}</h3>
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

                        {loan === null && <NavLink to="loan" className={activeClass}>
                            <GiMoneyStack className={styles.ioP} />
                            <p className={styles.btn}>Apply for Loan </p>
                        </NavLink>}

                        {loan !== null && <NavLink to="emi" className={activeClass}>

                            <GiTakeMyMoney className={styles.ioP} />
                            <p className={styles.btn}>Schedule for EMI</p>
                        </NavLink>}

                        <NavLink to="createacc" className={activeClass}>
                            <IoCreateSharp className={styles.ioP} />
                            <p className={styles.btn}>Create Account</p>
                        </NavLink>

                        <NavLink to="resetpwd" className={activeClass}>
                            <BiReset className={styles.ioP} />
                            <p className={styles.btn}>Reset password</p>
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