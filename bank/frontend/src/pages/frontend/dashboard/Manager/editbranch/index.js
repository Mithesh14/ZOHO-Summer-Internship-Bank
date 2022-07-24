import React from 'react'
import { deleteBranch, fetchBranches } from "../../../../../API";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./style.module.css";

const Tran = () => {
    const [branches, setBranches] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchBranches(branches => setBranches(branches), message => alert(message));
    }, []);

    const onEdit = (branch) => navigate(`${branch.id}`, { state: { branch } });

    const onDelete = (branchId) => {
        const data = {id: branchId};
        deleteBranch(data, (message) => alert(message), (message) => alert(message));
    }

    // const { state: { branch } } = useLocation();

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
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            branches.map(
                                branch =>
                                <tr>
                                    <td>{branch.id}</td>
                                    <td>{branch.name}</td>
                                    <td>{branch.address}</td>
                                    <td><button className={styles.btn} onClick={() => onEdit(branch)}>Edit</button></td>
                                    <td><button className={styles.btn} onClick={() => onDelete(branch.id)}>Delete</button></td>
                                </tr> 
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tran