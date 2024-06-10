import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export default function useEvent() {
    return useContext(EventContext)
}