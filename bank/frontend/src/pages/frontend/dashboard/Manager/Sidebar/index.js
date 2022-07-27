import React from "react";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {AuthenticationContext} from "../../../../../providers/authentication"

import styles from "./style.module.css";

import { logout, fetchAccounts } from "../../../../../API"
import { BiReset}  from 'react-icons/bi';
import { MdOutlineAddBox, MdEditNote, MdCancel, MdOutlineLogout, MdPersonRemove } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';


const activeClass = ({ isActive }) => isActive ? styles.active + " " + styles.link : styles.link;


const Manager = () => {
    const [state,setState] = React.useContext(AuthenticationContext);
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
                    <MdOutlineLogout onClick={onSubmit} className={styles.out} NavLink="Login"/>
                    </a>
                    
                </div>
                <div className={styles.sidebar}>
                    <div className={styles.sidecontent}>
                        <NavLink to="report" className={activeClass}>
                            <TbReportAnalytics className={styles.ioP} />
                            <p className={styles.btn}>View Report</p>
                        </NavLink>

                        <NavLink to="addbranch" className={activeClass}>
                            <MdOutlineAddBox className={styles.ioP} />
                            <p className={styles.btn}>Add Branches</p>
                        </NavLink>

                        <NavLink to="editbranch" className={activeClass}>
                            <MdEditNote className={styles.ioP} />
                            <p className={styles.btn}>Edit branches</p>
                        </NavLink>

                        <NavLink to="loanrequest" className={activeClass}>
                            <MdCancel className={styles.ioP} />
                            <p className={styles.btn}>Loan Requests</p></NavLink>

                        <NavLink to="closeacc" className={activeClass}>
                            <MdPersonRemove className={styles.ioP} />
                            <p className={styles.btn}>Close account</p>
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

export default Manager;