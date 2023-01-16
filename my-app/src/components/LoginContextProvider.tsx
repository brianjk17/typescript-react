import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";

type ContextType = {
    isAuth: boolean;
    token: string;
    setAuth: Dispatch<SetStateAction<boolean>>;
};
export const LoginContext = createContext<ContextType>({isAuth:true,token : "",
    setAuth: () => {}})

export const LoginProvider = ({child}: any) => {
    const [isAuth,setAuth] = useState(Boolean(localStorage.getItem("isAuth") || false))
    const [token, setToken] = useState(String(localStorage.getItem("token")))

    useEffect(() => {
        localStorage.setItem("isAuth", String(isAuth))
    },[isAuth])
    return (
        <LoginContext.Provider value={{isAuth,token,setAuth}}>
            {child}
        </LoginContext.Provider>
    )
}