import { useParams } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import { BadmintonIcon } from "../../../icons";
import eventApi from "../../../api/event";
import { useState } from "react";
import relationApi from "../../../api/relation";
import { toast } from "react-toastify";

const statusMap = {
    OPENED: 'bg-green-500 text-white',
    CLOSED: 'bg-red-500 text-black',
    BOOKED: 'bg-blue-500 text-white',
    CANCELED: 'bg-gray-500'
}


export default function EventDetail({ eventDetail, setEventDetail, players, setPlayers }) {
    const { authUser } = useAuth()
    const { eventId } = useParams()

    const [isDelete, setIsDelete] = useState(false)
    const isJoin = players.find(player => player.playerId === authUser.id)

    const eventDay = eventDetail?.eventDay
    const eDate = eventDay?.split('T')[0].split('-').reverse().join('/')
    const Etime = eventDay?.split('T')[1].slice(0, 5)
    const closingTime = eventDetail?.closingTime
    const cDate = closingTime?.split('T')[0].split('-').reverse().join('/')
    const cTime = closingTime?.split('T')[1].slice(0, 5)

    const handleClickBooked = async () => {
        try {
            const data = { ...eventDetail }
            delete data.courts
            delete data.users
            data.status = "BOOKED"
            const response = await eventApi.updateEvent(+eventId, data)
            setEventDetail({ ...eventDetail, ...response.data.events })
        } catch (error) {
            console.log(error);
        }
    }
    const handleClickClose = async () => {
        try {
            const data = { ...eventDetail }
            delete data.courts
            delete data.users
            data.status = "CLOSED"
            const response = await eventApi.updateEvent(+eventId, data)
            setEventDetail({ ...eventDetail, ...response.data.events })
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickDelete = async () => {
        try {
            const data = { ...eventDetail }
            delete data.courts
            delete data.users
            data.status = "CANCELED"
            const response = await eventApi.updateEvent(+eventId, data)
            await relationApi.deleteAllPlayerByEventId(+eventId)
            setEventDetail({ ...eventDetail, ...response.data.events })
            setPlayers([])
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickJoinEvent = async () => {
        try {
            const response = await relationApi.createRelation(+eventId)
            const newPlayer = response.data.relations
            newPlayer.users = { userName: authUser.userName, profileImage: authUser.profileImage }
            setPlayers(prev => [...prev, newPlayer])
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickUnjoinEvent = async () => {
        try {
            const response = await relationApi.deleteRelationByUser(+eventId)
            if (response.status !== 204) {
                toast.error("cannot remove players")
            }
            setPlayers(prev => prev.filter(player => player.playerId !== authUser.id))
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={`w-full mx-auto bg-white p-4 rounded-xl flex min-h-[80vh] gap-2`}>
            <div className="w-[60%] flex flex-col justify-between gap-8 py-4">
                <div className="flex flex-col gap-4">
                    <div className="text-5xl font-bold overflow-hidden">{eventDetail?.name}</div>
                    <div className="text-xl font-semibold font-style: italic">@ {eventDetail?.courts?.name}</div>
                </div>
                <div className="flex flex-col justify-start gap-4 bg-slate-100 p-4 rounded-md">
                    <div className="text-xl">
                        <span className="font-semibold">Date/Time: </span>
                        <span>{`${eDate}, ${Etime}`}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Duration: </span>
                        <span>{eventDetail?.evnetDuration}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Closing Time: </span>
                        {eventDetail?.status === "OPENED"
                            ? closingTime ? <span>{`${cDate}, ${cTime}`}</span> : <p></p>
                            : <span>Closed</span>
                        }
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Limit: </span>
                        <span>{eventDetail?.limit ? `${eventDetail?.limit} person` : `No limit`}</span>
                    </div>
                    <div className="font-bold text-2xl">Event Creator</div>
                    <div className="flex flex-col gap-4 px-4">
                        <Avatar size={8} />
                        <div className="text-xl">
                            <span className="font-semibold">Owner: </span>
                            <span>{eventDetail?.users?.userName}</span>
                        </div>
                        <div className="text-xl">
                            <span className="font-semibold">Contacts: </span>
                            <span>{eventDetail?.users?.mobile}</span>
                        </div>
                    </div>
                </div>
                {authUser?.id === eventDetail?.creatorId && eventDetail?.status !== "BOOKED" && eventDetail?.status !== "CANCELED"
                    ? <div className="flex justify-between">
                        {isDelete
                            ? <>
                                <Button bg="red" color="white" width={40} onClick={handleClickDelete}>Delete Event</Button>
                                <Button bg="none" color="black" width={40} onClick={() => setIsDelete(false)}>Cancel</Button>
                            </>
                            : <>
                                <Button width={40} onClick={handleClickBooked}>Booked</Button>
                                {eventDetail?.status === "CLOSED"
                                    ? <></>
                                    : <Button width={40} onClick={handleClickClose}>Closed</Button>
                                }
                                <Button bg="none" color="black" width={40} onClick={() => setIsDelete(true)}>Edit Event</Button>
                            </>
                        }
                    </div>
                    : <div className="h-[38px]"></div>
                }
            </div>
            <div className="flex-1 flex flex-col justify-between py-4 items-center ">
                <div className="flex flex-col gap-4 w-full">
                    <div className={`px-3 py-2 text-center ${statusMap[eventDetail?.status]} font-semibold rounded-md shadow`}>
                        {eventDetail?.status}
                    </div>
                    <div
                        className=" flex justify-center items-center bg-gray-100 rounded-md h-64 w-full">
                        {eventDetail?.courts?.courtImage || <BadmintonIcon />}
                    </div>
                    <div className="font-semibold">Google Map:</div>
                    {eventDetail?.courts?.location
                        ? <a href={eventDetail?.courts?.location} className="text-blue-500 underline" target="_blank">
                            {eventDetail?.courts?.location}
                        </a>
                        : <p>none</p>
                    }
                </div>
                {
                    eventDetail?.status === 'CANCELED'
                        ? <></>
                        : eventDetail?.status !== "OPENED"
                            ? <Button bg="disable" color="gray" width={40}>{isJoin ? "Joined" : "Event Close"}</Button> // Relation
                            : isJoin // Relation
                                ? <Button bg="gray" color="black" width={40} onClick={handleClickUnjoinEvent}>Unjoin Event</Button>
                                : <Button width={40} onClick={handleClickJoinEvent}>Join Event</Button>
                }
            </div>
        </div >
    )
}
