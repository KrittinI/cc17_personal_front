import MiniCard from '../../../components/MiniCard'

const statusMap = {
    OPENED: 'bg-green-500 text-white',
    CLOSED: 'bg-red-500 text-black',
    BOOKED: 'bg-blue-500 text-white',
    CANCELED: 'bg-gray-500'
}

export default function EventMiniCard({ event }) {
    // const a = new Date(event.eventDay)
    // console.log(a.toLocaleString());
    // console.log(new Date(event.eventDay).toLocaleString());
    const eventDay = event.eventDay.split('T')
    const date = eventDay[0].split('-').reverse().join('/')
    const time = eventDay[1].slice(0, 5)
    return (
        <MiniCard>
            <div className='flex flex-col justify-between h-full p-4'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-lg text-wrap max-w-[50%] overflow-hidden'>{event.name}</p>
                    <p className='shrink-0'>{`${date}, ${time} ${event.evnetDuration ? `(${event.evnetDuration}h)` : ''}`}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>by {event.users.userName}</p>
                    <div className={`px-3 py-1 ${statusMap[event.status]} font-semibold rounded-md shadow`}>{event.status}</div>
                </div>
            </div>
        </MiniCard>
    )
}
