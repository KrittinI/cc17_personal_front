import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import CourtContainer from "../../courts/components/CourtContainer";
import EventContainer from "../../events/components/EventContainer";
import useEvent from "../../events/hooks/useEvent";

export default function LeftHome() {
    const navigate = useNavigate()
    const { events } = useEvent()
    return (
        <div>
            <div className="flex justify-between px-4 pt-4 pb-2 sticky top-14 bg-blue-200">
                <div className="text-4xl font-semibold ">Eventlist</div>
                <Button bg="sky" width={20} onClick={() => navigate('/events')} >See All</Button>
            </div>
            <EventContainer display="grid4" limit={2} events={events} />
            <div className="flex justify-between px-4 pt-4 pb-2 sticky top-14 bg-blue-200">
                <div className="text-4xl font-semibold ">CourtList</div>
                <Button bg="sky" width={20} onClick={() => navigate('/courts')}>See All</Button>
            </div>
            <CourtContainer display="grid4" limit={4} />
        </div>
    )
}
