import { useState } from "react";
import useAuth from "../hooks/useAuth";
import SplitScreen from "../layout/SplitScreen";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import courtApi from "../api/court";
import CourtDetail from "../features/courts/components/CourtDetail";
import EventInCourt from "../features/courts/components/EventInCourt";

export default function CourtDetailPage() {
    const { authUser } = useAuth()
    const { courtId } = useParams()

    const [courtDetail, setCourtDetail] = useState({})

    useEffect(() => {
        const fetchCourtDetail = async () => {
            const courtResponse = await courtApi.getCourtById(+courtId)
            setCourtDetail(courtResponse.data.courts)
        }
        fetchCourtDetail()
    }, [courtId, authUser])
    if (!authUser)
        return (
            <div className="p-8">
                <CourtDetail courtDetail={courtDetail} width="70" />
            </div>
        )
    else
        return (
            <SplitScreen>
                <><CourtDetail courtDetail={courtDetail} setCourtDetail={setCourtDetail} /></>
                <><EventInCourt courtId={courtId} /></>
            </SplitScreen>
        )
}
