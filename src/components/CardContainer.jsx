const displayMap = {
    grid: 'p-8 grid grid-cols-5',
    grid4: 'p-4 grid grid-cols-4',
    flex: 'px-4 py-2 flex flex-nowrap',
    flexCol: 'flex flex-col'
}

export default function CardContainer({ children, display = "grid" }) {
    return (
        <div className={`${displayMap[display]} gap-4 `}>
            {children}
        </div>
    )
}
