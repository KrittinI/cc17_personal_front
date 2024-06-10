import { Link } from "react-router-dom";
import CardContainer from "../../../components/CardContainer";
import EventMiniCard from "../../events/components/EventMiniCard";

export default function EventInCourt({ evetnDetail }) {
    return (
        <div className="bg-white min-h-full rounded-xl p-4 max-h-[80vh] overflow-auto">
            <CardContainer display="flexCol">
                {evetnDetail.map(event =>
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <EventMiniCard event={event} />
                    </Link>
                )}
            </CardContainer>
        </div>
    )
}
