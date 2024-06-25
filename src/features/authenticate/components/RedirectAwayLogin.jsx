import { Navigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import Spinner from "../../../components/Spinner"

export default function RedirectAwayLogin({ children }) {
    const { authUser, isLoading } = useAuth()
    if (authUser && !isLoading) {
        return (
            <>
                <Navigate to='/' />
            </>
        )
    }
    return (
        <>
            {isLoading && <Spinner />}
            {children}
        </>
    )
}
