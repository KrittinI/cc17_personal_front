/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export default function RedirectToLogin({ children }) {
    const { authUser, isLoading } = useAuth()
    if (!authUser && !isLoading) {
        toast.error('you must login first')
        return <Navigate to='/login' />
    }
    return (
        <>
            {children}
        </>
    )
}
