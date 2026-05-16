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
            <div className="flex flex-col md:flex-row gap-6 w-full px-6">
                <div className="taskly-bg-sub rounded-3xl border border-white/5 taskly-shadow overflow-hidden p-6 w-3/5">
                    <h3 className="text-xl font-bold tracking-wide text-white mb-4">
                        Task List
                    </h3>

                    <div className="p-6 mb-5 h-14 flex items-center gap-4 rounded-2xl border border-white/5 bg-white/10">
                        <span className="text-2xl text-purple-500">
                            +
                        </span>
                        <input type="text" placeholder="Add a new task..." className="flex flex-1 bg-transparent border-none outline-none text-white text-sm" />
                        <button className="taskly-button rounded-xl px-4 py-2 cursor-pointer text-white font-bold text-sm" >
                            Add Task
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    )
}

export default Dashboard
