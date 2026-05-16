const Dashboard = () => {
    const boxInfo = [
        {
            id: 1,
            emoji: "📌",
            name: "Total Tasks",
            count: 12,
            variant: "purple"
        },
        {
            id: 2,
            emoji: "✅",
            name: "Completed",
            count: 8,
            variant: "cyan"
        },
        {
            id: 3,
            emoji: "⌛",
            name: "Pending",
            count: 4,
            variant: "orange"
        }
    ]

    return (
        <section className="flex flex-col justify-start">
            <div className="flex flex-wrap justify-around w-full py-6">
                {boxInfo.map((box) => {
                    return (
                        <div key={box.id} className={`taskly-after-card ${box.variant} flex items-center gap-4 min-h-24 min-w-xs rounded-3xl border border-white/5 p-5 taskly-shadow-task taskly-bg-dashcards relative overflow-hidden`}>

                            <div className="w-12 h-12 rounded-2xl flex justify-center items-center bg-white/10 text-2xl">
                                {box.emoji}
                            </div>
                            <div className="flex flex-col">
                                <small className="text-slate-400 text-sm font-medium tracking-wide">
                                    {box.name}
                                </small>
                                <strong className="text-2xl font-bold tracking-wide text-white mt-1">
                                    {box.count}
                                </strong>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </section>
    )
}

export default Dashboard
