import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import eventApi from "../../../api/event";

export const EventContext = createContext()


export default function EventContextProvider({ children }) {
    const [events, setEvents] = useState([])

    const fetchEventData = async () => {
        const response = await eventApi.getAllEvent()
        setEvents(response.data.events)
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
