import { createContext, useState } from "react";

const UserLogedContext = createContext();

const UserLogedProvider = ({children}) => {
    const [isUserLoged, setIsUserLoged] = useState(localStorage.getItem('usertoken') ? true : false);

    return(
        <UserLogedContext.Provider value={{isUserLoged, setIsUserLoged}}>
            {children}
        </UserLogedContext.Provider>
    )
}

export {UserLogedContext, UserLogedProvider};

