import { createContext } from "react";
import authApi from "../api/auth";
import { useState } from "react";
import { useEffect } from "react";


export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (localStorage.getItem("ACCESS_TOKEN")) {
                    const res = await authApi.getAuthUser()
                    setAuthUser(res.data.user)
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
        const result = await authApi.login(input)
        console.log(result);
        if (!result) {
            const error = new Error('User not found')
            throw error
        }
        localStorage.setItem('ACCESS_TOKEN', result?.data.accessToken)
        const resGetUser = await authApi.getAuthUser()
        setAuthUser(resGetUser?.data.user)
    }

    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN')
        setAuthUser(null)
    }

    return <AuthContext.Provider value={{ login, logout, authUser, isLoading }}>
        {children}
    </AuthContext.Provider>
}