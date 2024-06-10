import { Link } from "react-router-dom"
import CardContainer from "../../../components/CardContainer"
import useEvent from "../hooks/useEvent"
import EventCard from "./EventCard"

export default function EventContainer({ display, limit }) {
    const { events } = useEvent()
    if (limit) {
        return (
            <CardContainer display={display}>
                {events?.slice(0, limit * 4).map(event =>
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <EventCard event={event} />
                    </Link>
                )}
            </CardContainer>
        )
    }
    return (
        <CardContainer display={display}>
            {events?.map(event =>
                <Link key={event.id} to={`/events/${event.id}`}>
                    <EventCard event={event} />
                </Link>
            )}
        </CardContainer>
    )
}
