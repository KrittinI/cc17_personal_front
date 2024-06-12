import { createContext } from "react";
import authApi from "../api/auth";
import { useState } from "react";
import { useEffect } from "react";
import relationApi from "../api/relation";


export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authRelation, setAuthRelation] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (localStorage.getItem("ACCESS_TOKEN")) {
                    const res = await authApi.getAuthUser()
                    setAuthUser(res.data.user)
                    const response = await relationApi.getEventByUserId(res.data.user.id)
                    setAuthRelation(response.data.relations)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (input) => {
        const response = await authApi.login(input)
        if (response?.status !== 200) {
            throw response
        }

        localStorage.setItem('ACCESS_TOKEN', response?.data.accessToken)
        const resGetUser = await authApi.getAuthUser()
        setAuthUser(resGetUser?.data.user)
    }

    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN')
        setAuthUser(null)
    }

    return <AuthContext.Provider value={{ login, logout, authUser, isLoading, setAuthUser, authRelation, setAuthRelation }}>
        {children}
    </AuthContext.Provider>
}