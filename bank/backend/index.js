const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const csrf = require("../backend/middlewares/csrf")


const { login, register, user, logout, resetPassword, fetchToken, deleteToken} = require("./controllers/authentication");
const guard = require("./middlewares/guard");
const { addBranch,editBranch,deleteBranch, generateReport, viewRequests, updateRequest, viewLoanRequests, updateLoanRequests } = require("./controllers/admin");
const { addAccount, closeAccount, accounts, depositMoney, withdrawMoney, transactionTable, fetchBranch, applyLoan, fetchLoan} = require("./controllers/customer");

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())
// app.use(csrf)

app.post("/authentication/login", login);
app.post("/authentication/register", register);
app.get("/authentication/logout", guard(["0", "1"]),logout);
app.get("/authentication/user", guard(["0", "1"]),user);
app.post("/authentication/resetPassword", guard(["0", "1"]),resetPassword);
app.get("/authentication/fetchToken", guard(["0", "1"]),fetchToken);
app.post("/authentication/deleteToken", guard(["0", "1"]),deleteToken);

app.post("/dashboard/manager/addBranch", guard(["1"]) ,addBranch);
app.post("/dashboard/manager/editBranch", guard(["1"]) ,editBranch);
app.post("/dashboard/manager/deleteBranch", guard(["1"]) ,deleteBranch);
app.get("/dashboard/manager/generateReport", guard(["1"]) ,generateReport);
app.get("/dashboard/manager/viewRequests", guard(["1"]) ,viewRequests);
app.post("/dashboard/manager/updateRequest", guard(["1"]) ,updateRequest);
app.get("/dashboard/manager/viewLoanRequests", guard(["1"]) ,viewLoanRequests);
app.post("/dashboard/manager/updateLoanRequests", guard(["1"]) ,updateLoanRequests);

app.post("/dashboard/customer/addAccount", guard(["0"]) ,addAccount);
app.post("/dashboard/customer/closeAccount", guard(["0"]) ,closeAccount);
app.get("/dashboard/customer/accounts", guard(["0"]) ,accounts);
app.post("/dashboard/customer/depositMoney", guard(["0"]) ,depositMoney);
app.post("/dashboard/customer/withdrawMoney", guard(["0"]) ,withdrawMoney);
app.get("/dashboard/customer/transactionTable", guard(["0"]) ,transactionTable);
app.get("/dashboard/customer/fetchbranch", guard(["0", "1"]) ,fetchBranch);
app.post("/dashboard/customer/applyLoan", guard(["0"]) ,applyLoan);
app.get("/dashboard/customer/fetchLoan", guard(["0"]) ,fetchLoan);


app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});