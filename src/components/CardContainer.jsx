const displayMap = {
    grid: 'p-8 grid grid-cols-5',
    flex: 'px-4 py-2 flex flex-nowrap'
}

export default function CardContainer({ children, display = "grid" }) {
    return (
        <div className={`${displayMap[display]} gap-4 `}>
            {children}
        </div>
    )
}
