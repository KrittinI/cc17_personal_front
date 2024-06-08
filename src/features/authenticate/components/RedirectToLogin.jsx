/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function RedirectToLogin({ children }) {
    const { authUser, isLoading } = useAuth()
    if (!authUser && !isLoading) {
        return <Navigate to='/login' />
    }
    return (
        <>
            {children}
        </>
    )
}
