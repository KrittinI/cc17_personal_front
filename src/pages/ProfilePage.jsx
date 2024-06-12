import { useParams } from "react-router-dom";
import ProfileContainer from "../features/profile/components/ProfileContainer";
import ProfileEvent from "../features/profile/components/ProfileEvent";
import SplitScreen from "../layout/SplitScreen";

export default function ProfilePage() {
    const { userId } = useParams()
    return (
        <SplitScreen>
            <><ProfileEvent userId={userId} /></>
            <><ProfileContainer userId={userId} /></>
        </SplitScreen>
    )
}
