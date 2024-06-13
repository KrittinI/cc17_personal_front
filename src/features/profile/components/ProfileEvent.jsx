import { useState } from "react"
import EventContainer from "../../events/components/EventContainer"
import { useEffect } from "react"
import eventApi from "../../../api/event"
import useAuth from "../../../hooks/useAuth"

export default function ProfileEvent({ userId }) {
    const [events, setEvents] = useState([])
    const { authRelation } = useAuth()

    const joinEvent = authRelation.filter(event => event.events.creatorId !== userId).map(event => event.events)

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await eventApi.getEventByUserId(+userId)
                setEvents(response.data.events);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEventData()
    }, [userId])

    return (
        <div>
            <div >
                <div className="flex justify-between px-4 pt-4 pb-2 sticky top-14 bg-blue-200">
                    <div className="text-4xl font-semibold ">Own Events</div>
                </div>
                <EventContainer display="grid4" events={events} />
            </div>
            <div>
                <div className="flex justify-between px-4 pt-4 pb-2 sticky top-14 bg-blue-200">
                    <div className="text-4xl font-semibold ">Events</div>
                </div>
                <EventContainer display="grid4" events={joinEvent} />
            </div>
        </div>
    )
}
