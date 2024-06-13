import { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import EventContainer from '../features/events/components/EventContainer'
import EventForm from '../features/events/components/EventForm'
import useEvent from '../features/events/hooks/useEvent'
import { useEffect } from 'react'

export default function EventPage() {

    const { fetchEventData, events } = useEvent()

    const [open, setOpen] = useState(false)
    useEffect(() => {
        fetchEventData()
    }, [])

    return (
        <div>
            <div className='flex justify-between items-center px-8 pt-4 pb-2 sticky top-14 bg-blue-200 opacity-90'>
                <h1 className='text-4xl font-bold'>EventList</h1>
                <Button bg='sky' onClick={() => setOpen(true)} >Add Event</Button>
                <Modal title="Event Detail" width={40} open={open} onClose={() => setOpen(false)}>
                    <EventForm onSuccess={() => setOpen(false)} />
                </Modal>
            </div>
            <EventContainer events={events} />
        </div >
    )
}
