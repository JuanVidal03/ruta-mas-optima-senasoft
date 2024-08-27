import { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {

    const [locationData, setLocationData] = useState([]);
    const [formLocationState, setFormLocationState] = useState(false);

    return (
        <GlobalContext.Provider value={{
            locationData,
            setLocationData,
            formLocationState,
            setFormLocationState
        }}>
            { children }
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;
