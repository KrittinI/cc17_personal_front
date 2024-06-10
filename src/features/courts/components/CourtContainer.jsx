import CourtCard from "./CourtCard"
import { Link } from "react-router-dom"
import CardContainer from "../../../components/CardContainer"
import useCourt from "../hooks/useCourt"

export default function CourtContainer({ display, limit }) {

    const { courts } = useCourt()
    if (limit) {
        return (
            <CardContainer display={display}>
                {courts?.slice(0, limit * 4).map(court =>
                    <Link key={court.id} to={`/courts/${court.id}`}>
                        <CourtCard key={court.id} court={court} display={display} />
                    </Link>
                )}
            </CardContainer>
        )
    }
    return (
        <CardContainer display={display}>
            {courts?.map(court =>
                <Link key={court.id} to={`/courts/${court.id}`}>
                    <CourtCard key={court.id} court={court} display={display} />
                </Link>
            )}
        </CardContainer>
    )
}
