import { useState } from 'react'
import { CheckCircle2, Clock3, ListTodo, Zap } from 'lucide-react'
import { useOutletContext } from 'react-router'
import InsightsPanel from '@/components/layout/InsightsPanel'
import PageContainer from '@/components/layout/PageContainer'
import TaskWorkspace from '@/components/tasks/TaskWorkspace'
import Card from '@/components/ui/Card'
import { formatTaskDate, toDateKey } from '@/lib/date'

const viewCopy = {
    dashboard: { title: 'Plan your day with clarity', description: 'Review what is due, choose a priority, and begin with one task.', listTitle: "Today's focus" },
    today: { title: 'Today', description: 'Everything scheduled for today, in one focused list.', listTitle: "Today's tasks" },
    upcoming: { title: 'Upcoming', description: 'See what is ahead before it becomes urgent.', listTitle: 'Upcoming tasks' },
    important: { title: 'Important', description: 'Focus on unfinished high-priority work.', listTitle: 'High-priority tasks' },
    completed: { title: 'Completed', description: 'Review the work you have already finished.', listTitle: 'Completed tasks' },
    archived: { title: 'Archived', description: 'Restore older tasks or remove them permanently.', listTitle: 'Archived tasks' },
}

const StatCard = ({ icon: Icon, label, value, note, tone }) => (
    <Card className="flex items-center gap-3 p-4">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="size-5" /></span>
        <div><p className="text-[11px] font-semibold text-muted">{label}</p><strong className="font-display text-xl text-foreground">{value}</strong><p className="text-[10px] text-muted">{note}</p></div>
    </Card>
)

const WorkspacePage = ({ view }) => {
    const { tasks, globalQuery, openCreate, openEdit, toggleTask, archiveTask, restoreTask, requestDelete } = useOutletContext()
    const today = toDateKey()
    const [selectedDate, setSelectedDate] = useState(today)
    const nonArchived = tasks.filter((task) => !task.archived)
    const todayTasks = nonArchived.filter((task) => task.dueDate === today)
    const selectedDateTasks = nonArchived.filter((task) => task.dueDate === selectedDate)
    const completed = nonArchived.filter((task) => task.completed)
    const pending = nonArchived.filter((task) => !task.completed)
    const productivity = todayTasks.length ? Math.round((todayTasks.filter((task) => task.completed).length / todayTasks.length) * 100) : 0

    const visibleTasks = globalQuery
        ? tasks
        : view === 'dashboard'
            ? selectedDateTasks
            : view === 'today'
                ? todayTasks
                : view === 'upcoming'
                    ? nonArchived.filter((task) => task.dueDate > today && !task.completed)
                    : view === 'important'
                        ? nonArchived.filter((task) => task.priority === 'High' && !task.completed)
                        : view === 'completed'
                            ? completed
                            : tasks.filter((task) => task.archived)

    const copy = viewCopy[view]
    const isDashboard = view === 'dashboard'
    const dashboardListTitle = selectedDate === today ? copy.listTitle : `Tasks for ${formatTaskDate(selectedDate)}`

    return (
        <main>
            <PageContainer className="py-6 lg:py-8">
                <header className="mb-6">
                    <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-primary uppercase">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{copy.title}</h1>
                    <p className="mt-1.5 text-sm text-muted">{copy.description}</p>
                </header>

                {isDashboard && (
                    <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Live task statistics">
                        <StatCard icon={ListTodo} label="Due today" value={todayTasks.length} note="scheduled for today" tone="bg-primary/10 text-primary" />
                        <StatCard icon={CheckCircle2} label="Finished" value={completed.length} note="completed tasks" tone="bg-success/10 text-success" />
                        <StatCard icon={Clock3} label="Open tasks" value={pending.length} note="not yet completed" tone="bg-warning/10 text-warning" />
                        <StatCard icon={Zap} label="Today complete" value={`${productivity}%`} note="updates as tasks change" tone="bg-violet-500/10 text-violet-400" />
                    </section>
                )}

                <div className={`grid items-start gap-5 ${isDashboard ? 'xl:grid-cols-[minmax(0,1fr)_280px]' : ''}`}>
                    <TaskWorkspace title={globalQuery ? 'Results from every task' : isDashboard ? dashboardListTitle : copy.listTitle} description={globalQuery ? `Tasks matching "${globalQuery}"` : undefined} tasks={visibleTasks} globalQuery={globalQuery} allowCompletedToggle={view === 'dashboard' || view === 'today'} onAddTask={openCreate} onToggle={toggleTask} onEdit={openEdit} onArchive={archiveTask} onRestore={restoreTask} onDelete={requestDelete} />
                    {isDashboard && <InsightsPanel tasks={tasks} selectedDate={selectedDate} onSelectDate={setSelectedDate} />}
                </div>
            </PageContainer>
        </main>
    )
}

export default WorkspacePage
