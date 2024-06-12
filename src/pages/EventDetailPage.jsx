import { useParams } from "react-router-dom";
import EventDetail from "../features/events/components/EventDetail";
import SplitScreen from "../layout/SplitScreen";
import { useState } from "react";
import { useEffect } from "react";
import eventApi from "../api/event";

export default function EventDetailPage() {
    const { eventId } = useParams()

    const [eventDetail, setEventDetail] = useState({})

    useEffect(() => {
        const fetchEventDetail = async () => {
            const eventResponse = await eventApi.getEventById(eventId)
            setEventDetail(eventResponse.data.events);
        }
        fetchEventDetail()
    }, [eventId])

    return (
        <SplitScreen>
            <><EventDetail eventDetail={eventDetail} setEventDetail={setEventDetail} /></>
            <>Players Relation</>
        </SplitScreen>
    )
}
