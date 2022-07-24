import axios from "axios"

export const register = async (data, success, error) => {
    try {   
        const response = await axios.post("/authentication/register", data);
        success(response.data.message);

    }
    catch(e) {
        error(e.response.data.message);
    }
}

export const login = async (data, success, error) => {
    try {
        const response = await axios.post("/authentication/login", data);
        success("Login successfull", response.data.user);
    }

    catch(e) {
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

export const depositMoney = async (success, error) => {
    try {
        const response = await axios.get("/dashboard/customer/depositMoney");
        success(response.data);
    }
    catch(e) {
        console.log(e);
        error(e.response.data.message);
    }
}