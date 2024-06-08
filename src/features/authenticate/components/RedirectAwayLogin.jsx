import { Navigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"


export default function RedirectAwayLogin({ children }) {
    const { authUser, isLoading } = useAuth()
    if (authUser && !isLoading) {
        return (
            <Navigate to='/' />
        )

    }
    return (
        <>
            {children}
        </>
    )
}
