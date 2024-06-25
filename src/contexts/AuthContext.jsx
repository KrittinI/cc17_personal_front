import { createContext } from "react";
import authApi from "../api/auth";
import { useState } from "react";
import { useEffect } from "react";
import relationApi from "../api/relation";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/local-storage";

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authRelation, setAuthRelation] = useState([])
    const fetchUser = async () => {
        try {
            if (getAccessToken()) {
                const res = await authApi.getAuthUser()
                console.log(res);
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
    useEffect(() => {
        fetchUser()
    }, [])

    const login = async (input) => {
        const response = await authApi.login(input)
        if (response?.status !== 200) {
            throw response
        }

        setAccessToken(response?.data.accessToken)
        const resGetUser = await authApi.getAuthUser()
        console.log(resGetUser);
        setAuthUser(resGetUser?.data.user)
    }

    const logout = () => {
        removeAccessToken()
        setAuthUser(null)
    }

    return <AuthContext.Provider value={{ login, logout, authUser, isLoading, setAuthUser, authRelation, setAuthRelation, fetchUser }}>
        {children}
    </AuthContext.Provider>
}