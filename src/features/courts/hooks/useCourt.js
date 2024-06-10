import { useContext } from "react";
import { CourtContext } from "../contexts/CourtContext";

export default function useCourt() {
    return useContext(CourtContext)
}