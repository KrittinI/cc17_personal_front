import { Link } from "react-router-dom"
import CardContainer from "../../../components/CardContainer"
import EventCard from "./EventCard"

export default function EventContainer({ display, limit, events = [] }) {
    if (limit) {
        return (
            <CardContainer display={display}>
                {events?.slice(0, limit * 4).map(event => {
                    if (event.status === "CANCELED" && Date.now() - Date.parse(event.updatedAt) < 60 * 60 * 24 * 1000) return
                    return (
                        <Link key={event.id} to={`/events/${event.id}`}>
                            <EventCard event={event} />
                        </Link>
                    )
                }
                )}
            </CardContainer>
        )
    }
    return (
        <CardContainer display={display}>
            {events?.map(event => {
                if (event.status === "CANCELED" && Date.now() - Date.parse(event.updatedAt) < 60 * 60 * 24 * 1000) return
                return (
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <EventCard event={event} />
                    </Link>
                )
            }
            )}
        </CardContainer>
    )
}
