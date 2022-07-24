import React from 'react';
import { generateReport, fetchBranches} from '../../../../../API';

import styles from "./style.module.css";

const Rep = () => {
    const [data, setData] = React.useState({branches: [], report: {}});

    React.useEffect(() => {
        generateReport(
            data => setData(data), 
            message => alert(message)
        );
    }, []);

    console.log(data);

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
                        { 
                            data.branches.map(
                                branch => 
                                <tr>
                                    <td>{branch.id}</td>
                                    <td>{branch.name}</td>
                                    <td>{data.report[branch.id]?.accounts}</td>
                                    <td>{data.report[branch.id]?.amounts}</td>
                                    <td>{data.report[branch.id]?.loans}</td>
                                </tr>
                            ) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Rep