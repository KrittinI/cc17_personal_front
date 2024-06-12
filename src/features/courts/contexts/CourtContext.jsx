import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import courtApi from "../../../api/court"

export const CourtContext = createContext()

export default function CourtContextProvider({ children }) {
    const [courts, setCourts] = useState([])

    const fetchCourtData = async () => {
        const response = await courtApi.getAllCourt()
        const sortCourt = response.data.courts.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name === b.name) return 0
            if (a.name < b.name) return -1
        })
        setCourts(sortCourt)
    }
    useEffect(() => {

        fetchCourtData()
    }, [])
    const value = { courts, setCourts, fetchCourtData }
    return (
        <CourtContext.Provider value={value}>
            {children}
        </CourtContext.Provider>
    )
}
