import React from "react";
import { Route, Routes, BrowserRouter, Navigate, useNavigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from './providers/authentication'
import { fetchUser } from "./API";
import "../src/App.css";

//Authentication
import Login from "./pages/frontend/authenticate/login";
import Signup from "./pages/frontend/authenticate/register";

//Customer Dashboard
import Customer from "./pages/frontend/dashboard/customer/Sidebar/index";
import Account from "./pages/frontend/dashboard/customer/account"
import Transaction from "./pages/frontend/dashboard/customer/transaction"
import Deposit from "./pages/frontend/dashboard/customer/deposit"
import Withdrawal from "./pages/frontend/dashboard/customer/withdrawal"
import Loan from "./pages/frontend/dashboard/customer/loan"
import Crtacc from "./pages/frontend/dashboard/customer/createacc";
import Schedemi from "./pages/frontend/dashboard/customer/emi";
import Resetpwd from "./pages/frontend/dashboard/customer/resetpassword";

// Manager Dashboard
import Manager from "./pages/frontend/dashboard/Manager/Sidebar";
import Report from "./pages/frontend/dashboard/Manager/report";
import Addbr from "./pages/frontend/dashboard/Manager/addbranch";
import Editbr from "./pages/frontend/dashboard/Manager/editbranch";
import Clseacc from "./pages/frontend/dashboard/Manager/closeacc";
import EditPage from "./pages/frontend/dashboard/Manager/edit";
import Loanreq from "./pages/frontend/dashboard/Manager/loanrequest";

const App = () => {
    const [state, setState] = React.useContext(AuthenticationContext);
    const [loading, setLoading] = React.useState(true);

    const onSuccess = (message, data) => {
        setLoading(false);
        const stateCopy = {...state};
        stateCopy.user = data;
        stateCopy.status = true;
        setState(stateCopy);
    }

    const onError = (message) => {
        setLoading(false);
    }

    React.useEffect(() => {
      fetchUser(onSuccess, onError);
    }, []);

  return (
    loading?
    <h1>loading</h1>:
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="authentication" replace />} />
        <Route path="authentication">
          <Route index element={<Navigate to="Login" replace />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
        </Route>
        <Route path="dashboard" element={<Dashboard/>}>
          <Route path="customer" element={<Customer />}>
            <Route index element={<Navigate to="account" replace />} />
            <Route path="account" element={<Account />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdrawal" element={<Withdrawal />} />
            <Route path="loan" element={<Loan />}/>
            <Route path="createacc" element={<Crtacc />}/>
            <Route path="emi" element={<Schedemi />}/>
            <Route path="resetpwd" element={<Resetpwd />}/>
          </Route>
          <Route path="manager" element={<Manager />}>
            <Route index element={<Navigate to="report" replace />} />
            <Route path="report" element={<Report />} />
            <Route path="addbranch" element={<Addbr />} />
            <Route path="editbranch" element={<Editbr />} />
            <Route path="editbranch/:id" element={<EditPage/>} />
            <Route path="closeacc" element={<Clseacc />} />
            <Route path="loanrequest" element={<Loanreq />} />
            <Route path="resetpwd" element={<Resetpwd />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const Dashboard = () => {
  const [state, setState] = React.useContext(AuthenticationContext);

  const navigate = useNavigate();

  React.useEffect(() => {
      console.log(state);
      if(state.status === false) {
          navigate("/authentication");
      }
      else {
          if(state.user.role === '0')
              navigate("/dashboard/Customer");
          if(state.user.role === '1')
              navigate("/dashboard/Manager");
      }
  }, []);

  return (
      <Outlet/>
  );
}



export default App;