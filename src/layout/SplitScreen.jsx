/* eslint-disable react/prop-types */

export default function SplitScreen({ children }) {
    const [left, right] = children;
    return (
        <div className="flex ">
            <div className="w-[70%] p-4">{left}</div>
            <div className="w-[30%] p-4">{right}</div>
        </div>
    )
}
