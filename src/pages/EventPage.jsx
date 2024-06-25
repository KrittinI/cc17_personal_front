import EventContainer from '../features/events/components/EventContainer'
import useEvent from '../features/events/hooks/useEvent'
import { useEffect } from 'react'
import EventFormBox from '../features/events/components/EventFormBox'

export default function EventPage() {

    const { fetchEventData, events } = useEvent()

    useEffect(() => {
        fetchEventData()
    }, [])

    return (
        <div>
            <div className='flex justify-between items-center px-8 pt-4 pb-2 sticky top-14 bg-blue-200 opacity-90'>
                <h1 className='text-4xl font-bold'>EventList</h1>
                <EventFormBox />
            </div>
            <EventContainer events={events} />
        </div >
    )
}
