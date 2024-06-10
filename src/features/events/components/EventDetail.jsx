import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import { BadmintonIcon } from "../../../icons";

const statusMap = {
    OPENED: 'bg-green-500 text-white',
    CLOSED: 'bg-red-500 text-black',
    BOOKED: 'bg-blue-500 text-white',
    CANCELED: 'bg-gray-500'
}


export default function EventDetail({ eventDetail }) {
    const eventDay = eventDetail?.eventDay
    const date = eventDay?.split('T')[0].split('-').reverse().join('/')
    const time = eventDay?.split('T')[1].slice(0, 5)
    return (
        <div className={`w-full mx-auto bg-white p-4 rounded-xl flex min-h-[80vh] gap-2`}>
            <div className="w-[60%] flex flex-col justify-start gap-8 py-4">
                <div>
                    <div className="text-5xl font-bold">{eventDetail?.name}</div>
                </div>
                <div className="flex flex-col justify-start gap-4 bg-slate-100 p-4 rounded-md">
                    <div className="text-xl">
                        <span className="font-semibold">Date/Time: </span>
                        <span>{`${date}, ${time}`}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Duration: </span>
                        <span>{eventDetail?.evnetDuration}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Limit: </span>
                        <span>{eventDetail?.limit} person</span>
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
            </div>
            <div className="flex-1 flex flex-col justify-between py-4 items-center">
                <div className="flex flex-col gap-4">
                    <div className={`px-3 py-2 text-center ${statusMap[eventDetail?.status]} font-semibold rounded-md shadow`}>
                        {eventDetail?.status}
                    </div>
                    <div
                        className=" flex justify-center items-center bg-gray-100 rounded-md h-64 w-full">
                        {eventDetail?.courts?.courtImage || <BadmintonIcon />}
                    </div>
                    <div className="font-semibold">Location:</div>
                    {eventDetail?.courts?.location
                        ? <a href={eventDetail?.courts?.location} className="text-blue-500 underline" target="_blank">
                            {eventDetail?.courts?.location}
                        </a>
                        : <p>none</p>
                    }
                </div>
                {
                    eventDetail?.status === 'OPENED'
                        ? <Button width={40}>Join Event</Button>
                        : <div role="button" className={`px-3 py-1.5 border text-gray-400 w-40 rounded-md text-center`}>Cannot Join</div>
                }
            </div>
        </div>
    )
}
