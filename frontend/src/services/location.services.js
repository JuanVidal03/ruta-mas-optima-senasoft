import axios from "./axios";

export const createLocationService = async(data) => {
    try {

        const response = await axios.post("/locations", data);
        return response;
        
    } catch (error) {
        return error.message;
    }
}