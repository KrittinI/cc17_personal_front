import { useState } from "react"
import courtApi from "../../../api/court"
import { useEffect } from "react"
import CourtCard from "./CourtCard"
import { Link } from "react-router-dom"
import CardContainer from "../../../components/CardContainer"

export default function CourtContainer({ display }) {

    const [courts, setCourts] = useState([])

    useEffect(() => {
        const fetchCourtData = async () => {
            const response = await courtApi.getAllCourt()
            setCourts(response.data.courts)
        }
        fetchCourtData()
    }, [])

    return (
        <CardContainer display={display}>
            {courts.map(court =>
                <Link key={court.id} to={`/courts/${court.id}`}>
                    <CourtCard key={court.id} court={court} display={display} />
                </Link>
            )}
        </CardContainer>
    )
}
