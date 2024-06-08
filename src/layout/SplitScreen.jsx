
export default function SplitScreen({ children }) {
    const [left, right] = children;
    return (
        <div className="flex ">
            <div className="w-[70%] flex flex-col">{left}</div>
            <div className="w-[30%] flex flex-col">{right}</div>
        </div>
    )
}
