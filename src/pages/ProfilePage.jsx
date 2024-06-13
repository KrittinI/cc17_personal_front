import { useParams } from "react-router-dom";
import ProfileContainer from "../features/profile/components/ProfileContainer";
import ProfileEvent from "../features/profile/components/ProfileEvent";
import SplitScreen from "../layout/SplitScreen";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export default function ProfilePage() {
    const { fetchUser } = useAuth()
    const { userId } = useParams()

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <SplitScreen>
            <><ProfileEvent userId={+userId} /></>
            <><ProfileContainer userId={+userId} /></>
        </SplitScreen>
    )
}
