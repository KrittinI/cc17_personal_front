import { Link } from "react-router-dom";
import CardContainer from "../../../components/CardContainer";
import EventMiniCard from "../../events/components/EventMiniCard";
import useEvent from "../../events/hooks/useEvent";

export default function EventInCourt({ courtId }) {
    const { events } = useEvent()

    return (
        <div className="bg-white rounded-xl p-4 max-h-[80vh]">
            <div className="sticky top-0 bg-white w-full">
                <div className="text-2xl py-2 font-semibold ">Eventlist</div>
                <hr className="border mb-2 border-zinc-200" />
            </div>
            <div className="bg-white min-h-full rounded-xl p-4 max-h-[70vh] overflow-auto">
                <CardContainer display="flexCol">
                    {events.filter(event => event.courtId === +courtId).map(event => {
                        if (event.status === "CANCELED" && Date.now() - Date.parse(event.updatedAt) < 60 * 60 * 24 * 1000) return
                        return (
                            <Link key={event.id} to={`/events/${event.id}`}>
                                <EventMiniCard event={event} />
                            </Link>
                        )
                    }
                    )}
                </CardContainer>
            </div>
        </div>
    )
}
