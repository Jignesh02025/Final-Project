import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export default function Authuser({children}){
    const initialAuthuser = localStorage.getItem('user')
    const [user, setUser] = useState(
        initialAuthuser? JSON.parse(initialAuthuser):undefined
    )
    return(
        <AuthContext.Provider value={[user,setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)