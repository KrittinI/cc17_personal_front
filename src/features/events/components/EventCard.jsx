import Avatar from "../../../components/Avatar";
import CardBox from "../../../components/CardBox";

const statusMap = {
    OPENED: 'bg-green-500 text-white shadow',
    CLOSED: 'bg-red-500 text-black shadow',
    BOOKED: 'bg-blue-500 text-white shadow',
    END: 'bg-gray-200 text-white',
    CANCELED: 'bg-gray-500 shadow'
}

export default function EventCard({ event, display }) {
    const eventDay = event.eventDay.split('T')
    const date = eventDay[0].split('-').reverse().join('/')
    const time = eventDay[1].slice(0, 5)
    return (
        <CardBox display={display}>
            <div className="flex items-center justify-between px-2">
                <div className="flex flex-col overflow-hidden">
                    <div className=" text-xl font-bold flex items-center overflow-hidden ">{event?.name}</div>
                    <div className=" text-md flex items-center 	font-style: italic">by {event?.users?.userName}</div>
                    <div>@{event?.courts?.name}</div>
                </div>
                <Avatar size={3} src={event?.users?.profileImage} />
            </div>
            <div>
                <div>Event Day:</div>
                <div>{`${date}, ${time} ${event?.evnetDuration ? `(${event?.evnetDuration}h)` : ''}`}</div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    {event?.limit === 0
                        ? `${event?._count?.eventrelation} person join`
                        : `${event?._count?.eventrelation} / ${event?.limit} person`}
                </div>
                <div className={`px-2 py-1 ${statusMap[event?.status]} font-semibold rounded-md `}>{event?.status}</div>
            </div>
        </CardBox>
    )
}
