import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const localUserString = localStorage.getItem('user');
    const localUser = (localUserString && localUserString !== 'undefined') ? JSON.parse(localStorage.getItem('user')) : null;
    const [user, setUser] = useState(localUser);

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}