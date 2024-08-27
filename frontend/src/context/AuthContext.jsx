import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";

import { verifyTokenService } from '../services/auth.services.js';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const checkLogin = async() => {

            const cookies = Cookies.get();

            if(!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
            }

            try {

                const resVerifyToken = await verifyTokenService();
                if(!resVerifyToken.data && resVerifyToken.status !== 200) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return setUser(null);
                }

                setIsAuthenticated(true);
                setUser(resVerifyToken.data);
                setLoading(false);
    
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }

        }
        checkLogin();

    }, []);


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            setIsAuthenticated,
            isAuthenticated,
            loading,
            setLoading
        }}>
           { children } 
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
