import { useParams } from "react-router-dom";
import EventDetail from "../features/events/components/EventDetail";
import SplitScreen from "../layout/SplitScreen";
import { useState } from "react";
import { useEffect } from "react";
import eventApi from "../api/event";
import relationApi from "../api/relation";
import EventPlayers from "../features/events/components/EventPlayers";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function EventDetailPage() {
    const { eventId } = useParams()
    const { authUser } = useAuth()

    const [eventDetail, setEventDetail] = useState({})
    const [players, setPlayers] = useState([])

    const ableToDelete = authUser?.id === eventDetail?.creatorId && eventDetail.status === "OPENED"

    const handleDeleteUser = async (id) => {
        try {
            const response = await relationApi.deleteRelationByCreator(+eventId, id)
            if (response.status !== 204) {
                toast.error("cannot delete")
            }
            setPlayers(prev => prev.filter(player => player.playerId !== id))
            toast.success("Remove player")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchEventDetail = async () => {
            const eventResponse = await eventApi.getEventById(+eventId)
            setEventDetail(eventResponse.data.events);
            const playersResponse = await relationApi.getPlayerFromEventId(+eventId)
            setPlayers(playersResponse.data.players)
        }
        fetchEventDetail()
    }, [eventId])

    return (
        <SplitScreen>
            <><EventDetail players={players} eventDetail={eventDetail} setEventDetail={setEventDetail} setPlayers={setPlayers} /></>
            <><EventPlayers players={players} owner={ableToDelete} handleDeleteUser={handleDeleteUser} /></>
        </SplitScreen>
    )
}
