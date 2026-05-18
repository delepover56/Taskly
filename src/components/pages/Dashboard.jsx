import { useState } from "react"

const Dashboard = () => {
    const [inputTask, setInputTask] = useState("")
    const [tasks, setTasks] = useState([]);
    const [nextID, setNextID] = useState(1);

    const handleAddTask = (event) => {
        event.preventDefault();

        if (inputTask.trim() === "") return

        const now = new Date();
        const date = now.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })

        const newTask = {
            id: nextID,
            task: inputTask.trim(),
            date: `Today - ${date}`,
            isDone: false,
        }

        setTasks((prevTasks) => [newTask, ...prevTasks]);
        setNextID((prevID) => prevID + 1);
        setInputTask("");
    }

    const handleToggleTask = (taskID) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskID ? { ...task, isDone: !task.isDone } : task
            )
        );
    }

    const boxInfo = [
        {
            id: 1,
            emoji: "📌",
            name: "Total Tasks",
            count: tasks.length,
            variant: "purple"
        },
        {
            id: 2,
            emoji: "✅",
            name: "Completed",
            count: tasks.filter((task) => task.isDone).length,
            variant: "cyan"
        },
        {
            id: 3,
            emoji: "⌛",
            name: "Pending",
            count: tasks.filter((task) => !task.isDone).length,
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

                    <form
                        onSubmit={handleAddTask}
                        className="p-6 mb-5 h-14 flex items-center gap-4 rounded-2xl border border-white/5 bg-white/10"
                    >
                        <span className="text-2xl text-purple-500">
                            +
                        </span>
                        <input
                            value={inputTask}
                            onChange={(e) => setInputTask(e.target.value)}
                            type="text"
                            placeholder="Add a new task..."
                            className="flex flex-1 bg-transparent border-none outline-none text-white text-sm"
                        />
                        <button
                            type="submit"
                            className="taskly-button rounded-xl px-4 py-2 cursor-pointer text-white font-bold text-sm"
                        >
                            Add Task
                        </button>
                    </form>

                    <div className="task-lists flex flex-col gap-3">
                        {tasks.map((task) => {
                            return (
                                <div
                                    key={task.id}
                                    className="group flex items-center gap-4 rounded-3xl border border-white/5 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/8 hover:shadow-[inset_0_1px_rgba(255,255,255,0.06)]"
                                >
                                    <input
                                        type="checkbox"
                                        id={`task-${task.id}`}
                                        checked={task.isDone}
                                        onChange={() => handleToggleTask(task.id)}
                                        className="taskly-checkbox shrink-0"
                                    />

                                    <label
                                        htmlFor={`task-${task.id}`}
                                        className="flex flex-1 cursor-pointer flex-col"
                                    >
                                        <span
                                            className={`text-sm font-bold transition-all duration-300 ${task.isDone ? "text-slate-500 line-through decoration-slate-500" : "text-white"}`}
                                        >
                                            {task.task}
                                        </span>
                                        <span className="mt-2 text-xs font-medium text-slate-400">
                                            {task.date}
                                        </span>
                                    </label>

                                    <button
                                        type="button"
                                        aria-label="Task options"
                                        className="rounded-lg px-2 py-1 text-xl leading-none text-slate-400 opacity-80 transition-all duration-300 hover:bg-white/10 hover:text-white group-hover:opacity-100"
                                    >
                                        ...
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    )
}

export default Dashboard
