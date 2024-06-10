import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import eventApi from "../../../api/event";

export const EventContext = createContext()


export default function EventContextProvider({ children }) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEventData = async () => {
            const response = await eventApi.getAllEvent()
            // console.log(response.data.events);
            setEvents(response.data.events)
        }
        fetchEventData()
    }, [])


    const value = { events, setEvents }
    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}
