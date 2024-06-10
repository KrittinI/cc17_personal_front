import LeftHome from "../features/home/components/LeftHome";
import RightHome from "../features/home/components/RightHome";
import SplitScreen from "../layout/SplitScreen";

export default function HomePage() {
    return (
        <SplitScreen>
            <><LeftHome /></>
            <><RightHome /></>
        </SplitScreen>
    )
}
