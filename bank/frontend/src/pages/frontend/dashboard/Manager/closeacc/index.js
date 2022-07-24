import React from 'react'
import { fetchRequests, updateRequest } from "../../../../../API";

import styles from "./style.module.css";

const Cls = () => {
    const [requests, setRequests] = React.useState([]);
    const status = {
        2: "ACCEPTED",
        3: "REJECTED",
    }

    React.useEffect(() => {
        fetchRequests((data) => setRequests(data), (message) => alert(message));
    },[]);

    const onClick = (requestId, status) => {
        updateRequest({requestId, status}, (message) =>alert(message), (message) =>alert(message));
    }

    return (
        <div className={styles.main}>
            <div className={styles.contact_box}>
                <h2 className={styles.h2_cont}>CLOSE ACCOUNT</h2>
                <table className={styles.content_table}>
                    <thead>
                        <tr>
                            <th>CUSTOMER ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>PHONE NUMBER</th>
                            <th>ADDRESS</th>
                            <th>ACCOUNT NUMBER</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map(
                                request => 
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.accounts.users.name}</td>
                                    <td>{request.accounts.users.phoneNumber}</td>
                                    <td>{request.accounts.users.address}</td>
                                    <td>{request.accounts.accountNumber}</td>
                                    <td>
                                        {
                                            request.status == 2 || request.status == 3 ?
                                            <p>{status[request.status]}</p>:
                                            <React.Fragment>
                                                <button onClick={() => onClick(request.id, 2)} className={styles.btn}>Accept</button>
                                                <button onClick={() => onClick(request.id, 3)} className={styles.btn}>Reject</button>
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

export default Cls