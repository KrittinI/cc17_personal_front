import CardBox from "../../../components/CardBox";
import { BadmintonIcon } from "../../../icons";

export default function CourtCard({ court, display }) {
    return (
        <CardBox display={display}>
            <div className="h-12 text-2xl font-bold flex items-center overflow-hidden">{court?.name}</div>
            <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-md">{court.courtImage || <BadmintonIcon />}</div>
            <div className="flex justify-between items-center">
                <div className="font-semibold">{+court?.ratePerHour !== 0 ? court?.ratePerHour : ' - '} Baht / hr.</div>
                {court.isActive
                    ? <div className={`px-3 py-1.5 bg-blue-500 text-white rounded-xl `} >Detail</div>
                    : <div className={`px-3 py-1.5 bg-gray-200 text-black rounded-xl `} >Closed</div>
                }
            </div>
        </CardBox>
    )
}
