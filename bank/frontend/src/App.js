import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "../src/App.css";

//Authentication
import Login from "./pages/frontend/authenticate/login";
import Signup from "./pages/frontend/authenticate/register";

//Customer Dashboard
import Customer from "./pages/frontend/dashboard/customer/Sidebar/index";
import Account from "./pages/frontend/dashboard/customer/account"
import Transaction from "./pages/frontend/dashboard/customer/transaction"
import Deposit from "./pages/frontend/dashboard/customer/deposit"
import Loan from "./pages/frontend/dashboard/customer/loan"
import Crtacc from "./pages/frontend/dashboard/customer/createacc";
import Schedemi from "./pages/frontend/dashboard/customer/emi";

// Manager Dashboard
import Manager from "./pages/frontend/dashboard/Manager/Sidebar";
import Report from "./pages/frontend/dashboard/Manager/report";
import Addbr from "./pages/frontend/dashboard/Manager/addbranch";
import Editbr from "./pages/frontend/dashboard/Manager/editbranch";
import Canloan from "./pages/frontend/dashboard/Manager/cancelloan";
import Clseacc from "./pages/frontend/dashboard/Manager/closeacc";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="authentication" replace />} />
          <Route path="authentication">
            <Route index element={<Navigate to="Login" replace />} />
            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
          </Route>
          <Route path="dashboard">
            <Route path="customer" element={<Customer />}>
              <Route index element={<Navigate to="account" replace />} />
              <Route path="account" element={<Account />} />
              <Route path="transaction" element={<Transaction />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="loan" element={<Loan />}/>
              <Route path="createacc" element={<Crtacc />}/>
              <Route path="emi" element={<Schedemi />}/>
            </Route>

            <Route path="manager" element={<Manager />}>
              <Route index element={<Navigate to="report" replace />} />
              <Route path="report" element={<Report />} />
              <Route path="addbranch" element={<Addbr />} />
              <Route path="editbranch" element={<Editbr />} />
              <Route path="cancelloan" element={<Canloan />} />
              <Route path="closeacc" element={<Clseacc />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;