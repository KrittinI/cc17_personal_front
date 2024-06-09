import { useState } from "react";
import useAuth from "../hooks/useAuth";
import SplitScreen from "../layout/SplitScreen";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import courtApi from "../api/court";
import CourtDetail from "../features/courts/components/CourtDetail";

export default function CourtDetailPage() {
    const { authUser } = useAuth()
    const { courtId } = useParams()

    const [courtDetail, setCourtDetail] = useState({})

    useEffect(() => {
        const fetchCourtDetail = async () => {
            const response = await courtApi.getCourtById(courtId)
            setCourtDetail(response.data.courts)
        }
        fetchCourtDetail()
    }, [courtId])

    if (!authUser)
        return (
            <><CourtDetail /></>
        )
    else
        return (
            <SplitScreen>
                <><CourtDetail courtsDetail={courtDetail} /></>
                <>Event</>
            </SplitScreen>
        )
}
