import React from "react";
import { NavLink, Outlet } from 'react-router-dom';

import styles from "./style.module.css";
import { MdOutlineAddBox, MdEditNote, MdCancel, MdOutlineLogout, MdPersonRemove } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';

const activeClass = ({ isActive }) => isActive ? styles.active + " " + styles.link : styles.link;

const Manager = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.logo}>
                        <h2>Mithesh</h2>
                    </div>
                    <div className={styles.user}>

                    </div>
                    <a href="../../authentication/Login">
                    <MdOutlineLogout className={styles.out} NavLink="Login"/>
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

                        <NavLink to="cancelloan" className={activeClass}>
                            <MdCancel className={styles.ioP} />
                            <p className={styles.btn}>Cancel loan</p></NavLink>

                        <NavLink to="closeacc" className={activeClass}>
                            <MdPersonRemove className={styles.ioP} />
                            <p className={styles.btn}>Close account</p>
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