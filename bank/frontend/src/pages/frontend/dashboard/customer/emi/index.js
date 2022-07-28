import React from 'react'
import styles from "./style.module.css";
import { fetchLoan } from "../../../../../API";

const Emi = () => {
    const [loan, setLoan] = React.useState(null);
    const [schedules, setSchedules] = React.useState([]);

    const interests = [13, 9, 7];

    const success = (loan) => {
        setLoan(loan);
        console.log(loan);
        setSchedules(calculateEMI(loan.amount, interests[loan.type], loan.period));
    }
    
    const error = (message) => {
        alert(message);
    }

    React.useEffect(() => {
        fetchLoan(success, error);
    },[]);
    

    const calculateEMI= (loanAmount, loanInterestRate, loanTenure) => {
        const interest = loanInterestRate / 12 / 100;
        let emi = Math.floor(loanAmount * interest * (Math.pow(1 + interest, loanTenure) / (Math.pow(1 + interest, loanTenure) - 1))); 
    
        const schedule = [];
    
        for(var i = 0; i < loanTenure; i++) {
            const item = {};
            item.loan = loanAmount;
            item.emi = emi;
            item.monthlyInterest = Math.floor(item.loan * interest);
            item.principal = Math.floor(item.emi - item.monthlyInterest);
            item.outstanding = Math.floor(item.loan - item.principal);
    
            schedule.push(item);
    
            loanAmount = item.outstanding;
        }
    
        return schedule;
    }
    console.log(schedules);
  return (
    <div className={styles.main}>
    <div className={styles.contact_box}>
        <h2 className={styles.h2_cont}>EMI SCHEDULE</h2>
        <table className={styles.content_table}>
            <thead>
                <tr>
                    <th>MONTH</th>
                    <th>BEGINING LOAN BALANCE</th>
                    <th>EMI</th>
                    <th>MONTHLY INTEREST</th>
                    <th>PRINCIPAL</th>
                    <td>OUTSTANDING BALANCE</td>
                </tr>
            </thead>
            <tbody>
            {
                schedules.map(
                    (schedule,index) => 
                        <tr>
                        <td>{index+1}</td>
                        <td>{schedule.loan}</td>
                        <td>{schedule.emi}</td>
                        <td>{schedule.monthlyInterest}</td>
                        <td>{schedule.principal}</td>
                        <td>{schedule.outstanding}</td>
                        </tr>
                    )
            }
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Emi