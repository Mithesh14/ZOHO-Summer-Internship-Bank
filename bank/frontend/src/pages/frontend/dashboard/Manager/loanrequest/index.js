import React from 'react'
import styles from "./style.module.css";
import { viewLoanRequests, updateLoanRequests } from "../../../../../API"
import { GiFlexibleLamp } from 'react-icons/gi';

const Loanreq = () => {
    const [loanrequests, setLoanRequests] = React.useState([]);
    const status = {
        1: "ACCEPTED",
        2: "REJECTED",
    }

    React.useEffect(() => {
        viewLoanRequests((data) => setLoanRequests(data), (message) => alert(message));
    },[]);

    const onClick = (loanId, status) => {
        updateLoanRequests({loanId, status}, (message) =>alert(message), (message) =>alert(message));
    }
    

  return (
    <div className={styles.main}>
    <div className={styles.contact_box}>
        <h2 className={styles.h2_cont}>LOAN</h2>
        <table className={styles.content_table}>
            <thead>
                <tr>
                    <th>CUSTOMER ID</th>
                    <th>CUSTOMER NAME</th>
                    <th>AMOUNT</th>
                    <th>PERIOD</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
            {
                loanrequests.map(
                                loan => 
                                <tr key={loan.id}>
                                    <td>{loan.id}</td>
                                    <td>{loan.users.name}</td>
                                    <td>{loan.amount}</td>
                                    <td>{loan.period}</td>
                                    <td style = {{display: 'flex'}}>
                                        {
                                            loan.status === 1 || loan.status === 2 ?
                                            <p>{status[loan.status]}</p>:
                                            <React.Fragment>
                                                <button onClick={() => onClick(loan.id, 1)} className={styles.btn_one}>Accept</button>
                                                <button onClick={() => onClick(loan.id, 2)} className={styles.btn_two}>Reject</button>
                                            </React.Fragment>
                                        }
                                        
                                    </td>
                                </tr>
                            )
                        }
            </tbody>
        </table>
            </div>
        </div>
    )
}


export default Loanreq