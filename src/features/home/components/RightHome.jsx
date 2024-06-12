import { Link } from "react-router-dom";
import CardContainer from "../../../components/CardContainer";
import EventMiniCard from "../../events/components/EventMiniCard";
import { useEffect } from "react";
import eventApi from "../../../api/event";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

export default function RightHome() {
    const { authUser } = useAuth()
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                if (!authUser) return
                const response = await eventApi.getEventByUserId(authUser?.id)
                setEvents(response.data?.events);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEventData()
    }, [authUser])
    return (
        <div className="bg-white rounded-xl p-4 max-h-[80vh]">
            <div className="sticky top-0 bg-white w-full">
                <div className="text-2xl py-2 font-semibold ">My Eventlist</div>
                <hr className="border mb-2 border-zinc-200" />
            </div>
            <div className="bg-white min-h-full rounded-xl p-4 max-h-[70vh] overflow-auto">
                <CardContainer display="flexCol">
                    {events?.map(event => {
                        if (event.status === "CANCELED" && Date.now() - Date.parse(event.updatedAt) < 60 * 60 * 24 * 1000) return
                        return (
                            <Link key={event.id} to={`/events/${event.id}`}>
                                <EventMiniCard event={event} />
                            </Link>
                        )
                    }
                    )
                    }
                </CardContainer>
            </div>
        </div>
    )
}
