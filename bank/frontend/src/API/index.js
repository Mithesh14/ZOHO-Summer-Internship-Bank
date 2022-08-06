import axios from "axios"

export const register = async (data, success, error) => {
    try {   
        const response = await axios.post("/authentication/register", data);
        // document.cookie.split(";").forEach(cookie => {
        //     const [key, value] = cookie.split("=");
        //     if(key === "CSRF-TOKEN") {
        //         axios.defaults.headers["X-CSRF-Token"] = value;
        //     }
        // });
        success(response.data.message);

    }
    catch(e) {
        error(e.response.data.message);
    }
}

export const login = async (data, success, error) => {
    try {
        const response = await axios.post("/authentication/login", {...data,os:detectOS(),browser:detectBrowser()});
        // document.cookie.split(";").forEach(cookie => {
        //     const [key, value] = cookie.split("=");
        //     if(key === "CSRF-TOKEN") {
        //         axios.defaults.headers["X-CSRF-Token"] = value;
        //     }
        // });
        success("Login successfull", response.data.user);
    }

    catch(e) {
        error(e.response.data.message);
    }
}

export const logout = async (success, error) => {
    try {
        const response = await axios.get("/authentication/logout");
        success("Logout successfull", response.data.user);
    }

    catch(e) {
        error(e.response.data.message);
    }
}

export const detectBrowser = () => {
    const UserAgent = navigator.userAgent;
  
    if(UserAgent.match(/chrome|chromium|crios/i)) return "Chrome";
    if(UserAgent.match(/firefox|fxios/i))         return "Firefox";
    if(UserAgent.match(/safari/i))                return "Safari";
    if(UserAgent.match(/opr\//i))                 return "Opera";
    if(UserAgent.match(/edg/i))                   return "Edge";
  
    return "Unknown Browser";
  };
  
  export const detectOS = () => {
      const UserAgent = navigator.userAgent;
  
      if(UserAgent.indexOf("Win")   != -1) return "Windows";
      if(UserAgent.indexOf("Mac")   != -1) return "MacOS";
      if(UserAgent.indexOf("X11")   != -1) return "UNIX";
      if(UserAgent.indexOf("Linux") != -1) return "Linux";
  
      return "Unknown OS";
  }

export const fetchTokens = async (success, error) => {
    try {
        const response = await axios.get("/authentication/fetchToken");
        success(response.data);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const deleteToken = async (data, success, error) => {
    try {
        const response = await axios.post("/authentication/deleteToken", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const fetchAccounts = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/customer/accounts");
        success(response.data);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const depositMoney = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/customer/depositMoney", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}


export const withdrawMoney = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/customer/withdrawMoney", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const generateReport = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/manager/generateReport");
        success(response.data);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const fetchTransaction = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/customer/transactionTable");
        success(response.data.transactions);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const fetchBranches = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/customer/fetchbranch");
        success(response.data.branches);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const createAccount = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/customer/addAccount", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}


export const closeAccount = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/customer/closeAccount", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const fetchUser = async (onSuccess, onError) => {
    try {
        const response  = await axios.get("/authentication/user");
        onSuccess("User loaded successfully", response.data.user);
    }
    catch(e) {
        onError("Unable to process request. Try again");
    }
}

export const fetchRequests = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/manager/viewRequests");
        success(response.data.requests);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const createBranch = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/manager/addBranch", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const editBranch = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/manager/editBranch", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const deleteBranch = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/manager/deleteBranch", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const updateRequest = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/manager/updateRequest", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const applyLoan = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/customer/applyLoan", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const viewLoanRequests = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/manager/viewLoanRequests");
        console.log(response.data.loans);
        success(response.data.loans);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const updateLoanRequests = async (data, success, error) => {
    try {
        const response = await axios.post("/dashboard/manager/updateLoanRequests", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const fetchLoan = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/customer/fetchLoan");
        success(response.data.loan);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}

export const resetPassword = async (data, success, error) => {
    try {
        const response = await axios.post("/authentication/resetPassword", data);
        success(response.data.message);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}