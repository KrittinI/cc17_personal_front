import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import courtApi from "../../../api/court"

export const CourtContext = createContext()

export default function CourtContextProvider({ children }) {
    const [courts, setCourts] = useState([])

    useEffect(() => {
        const fetchCourtData = async () => {
            const response = await courtApi.getAllCourt()
            setCourts(response.data.courts)
        }
        fetchCourtData()
    }, [])
    const value = { courts, setCourts }
    return (
        <CourtContext.Provider value={value}>
            {children}
        </CourtContext.Provider>
    )
}
