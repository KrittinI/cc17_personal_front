import CardBox from "../../../components/CardBox";

const statusMap = {
    OPENED: 'bg-green-500 text-white',
    CLOSED: 'bg-red-500 text-black',
    BOOKED: 'bg-blue-500 text-white',
    CANCELED: 'bg-gray-500'
}

export default function EventCard({ event, display }) {
    const eventDay = event.eventDay.split('T')
    const date = eventDay[0].split('-').reverse().join('/')
    const time = eventDay[1].slice(0, 5)
    return (
        <CardBox display={display}>
            <div>
                <div className=" text-2xl font-bold flex items-center">{event?.name}</div>
                <div className=" text-md flex items-center 	font-style: italic">by {event?.users.userName}</div>
                <div>@{event.courts.name}</div>
            </div>
            <div>
                <div>Event Day:</div>
                <div>{`${date}, ${time} ${event.evnetDuration ? `(${event.evnetDuration})` : ''}`}</div>
            </div>
            <div className="flex justify-between items-center">
                <div>Limit:{event.limit} person</div>
                <div className={`px-3 py-1 ${statusMap[event.status]} font-semibold rounded-md shadow`}>{event.status}</div>
            </div>
        </CardBox>
    )
}
