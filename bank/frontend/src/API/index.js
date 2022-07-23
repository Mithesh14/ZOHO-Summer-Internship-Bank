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

export const LoginFunction = async (data, success, error) => {
    try {   
        const response = await axios.post("/authentication/login", data);
        success(response.data.message);

    }
    catch(e) {
        error(e.response.data.message);
    }

    
}