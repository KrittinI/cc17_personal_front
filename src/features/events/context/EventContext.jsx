import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import eventApi from "../../../api/event";

export const EventContext = createContext()


export default function EventContextProvider({ children }) {
    const [events, setEvents] = useState([])

    const fetchEventData = async () => {
        const response = await eventApi.getAllEvent()
        const data = response?.data?.events
        // data?.map(event => {
        //     const now = Date.now()
        //     let eventTime = Date.parse(event.eventDay)
        //     const duration = event?.evnetDuration[0]
        //     if (duration) eventTime += duration * 60 * 60 * 1000
        //     if (now > eventTime) {
        //         event.status = "END"
        //     }
        //     // if (now - eventTime > 24 * 60 * 60 * 1000) {
        //     //     // await eventApi.deleteEvent(event.id)
        //     // }
        //     return event
        // }
        // )
        setEvents(data)
    }

    useEffect(() => {
        fetchEventData()
    }, [])


    const value = { events, setEvents, fetchEventData }
    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}
