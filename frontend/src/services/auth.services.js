import axios from "./axios.js";

export const verifyTokenService = async() => {
    try {

        const result = await axios.get("/verify-token");
        return result;
        
    } catch (error) {
        return error.message;
    }
}

export const loginService = async(credentials) => {
    try {
        
        const loginResponse = await axios.post("/login", credentials);
        return loginResponse;

    } catch (error) {
        return error.message;
    }
}

export const logout = async() => {
    try {
        
        const response = await axios.post("/logout")
        return response;

    } catch (error) {
        return error;
    }
}