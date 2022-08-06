import React from 'react'
import {fetchTokens, deleteToken} from "../../../../../API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./style.module.css";

const Session = () => {
    const [sessions, setSessions] = React.useState([]);
    const [id,setId] = React.useState("");
    const success = (data) => {
        setSessions(data.tokens);
        setId(data.currenttokenId)
    }

    const error = (message) => {
        toast.error(message,{position: "top-center", autoClose: 2000,});
    }

    const onDelete = (tokenid) => {
        const data = {id: tokenid};
        deleteToken(data, (message) => toast(message,{position: "top-center", autoClose: 2000,}), (message) => toast(message,{position: "top-center", autoClose: 2000,}));
    }

    React.useEffect(() => {
        fetchTokens(success, error);
    }, []);

  return (
    <div className={styles.main}>
    <div className={styles.contact_box}>
        <h2 className={styles.h2_cont}>SESSION HISTORY</h2>
        <table className={styles.content_table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>BROWSER</th>
                    <th>OS</th>
                    <th>CREATED DATE</th>
                    <th>TERMINATE SESSION</th>
                </tr>
            </thead>
            <tbody>
            {
                sessions.map(
                                (token,idx) => 
                                <tr key={token.id}>
                                    <td> {idx +1}</td>
                                    <td>{token.browser}</td>
                                    <td>{token.os}</td>
                                    <td>{new Date(token.createdat).toLocaleString()}</td>
                                    <td >{token.id==id?<p>CURRENT SESSION</p>:<button className={styles.btn_two} onClick={() => onDelete(token.id)}>Terminate</button>} </td>
                                </tr>
                            )
                        }
            </tbody>
        </table>
            </div>
        </div>
  )
}

export default Session