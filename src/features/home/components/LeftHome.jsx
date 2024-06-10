import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import CourtContainer from "../../courts/components/CourtContainer";
import EventContainer from "../../events/components/EventContainer";

export default function LeftHome() {
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex justify-between px-4">
                <div className="text-2xl font-semibold">Eventlist</div>
                <Button bg="sky" width={20} onClick={() => navigate('/events')} >See All</Button>
            </div>
            <EventContainer display="grid4" limit={2} />
            <div className="flex justify-between px-4">
                <div className="text-2xl font-semibold">CourtList</div>
                <Button bg="sky" width={20} onClick={() => navigate('/courts')}>See All</Button>
            </div>
            <CourtContainer display="grid4" limit={1} />
        </div>
    )
}
