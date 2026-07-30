import { CheckCircle2, Clock3, ListTodo, Zap } from 'lucide-react'
import { useOutletContext } from 'react-router'
import InsightsPanel from '@/components/layout/InsightsPanel'
import PageContainer from '@/components/layout/PageContainer'
import TaskWorkspace from '@/components/tasks/TaskWorkspace'
import Card from '@/components/ui/Card'
import { toDateKey } from '@/lib/date'

const viewCopy = {
    dashboard: { title: 'Good morning, Taha âœ¦', description: "Here's whatâ€™s on your plate today.", listTitle: "Today's focus" },
    today: { title: 'Today', description: 'A clear plan for a productive day.', listTitle: "Today's tasks" },
    upcoming: { title: 'Upcoming', description: 'Look ahead and stay prepared.', listTitle: 'Coming up' },
    important: { title: 'Important', description: 'The work that deserves your attention.', listTitle: 'High priority' },
    completed: { title: 'Completed', description: 'Celebrate your progress.', listTitle: 'Completed tasks' },
    archived: { title: 'Archived', description: 'Tasks youâ€™ve tucked away.', listTitle: 'Archived tasks' },
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
    const nonArchived = tasks.filter((task) => !task.archived)
    const todayTasks = nonArchived.filter((task) => task.dueDate === today)
    const completed = nonArchived.filter((task) => task.completed)
    const pending = nonArchived.filter((task) => !task.completed)
    const productivity = todayTasks.length ? Math.round((todayTasks.filter((task) => task.completed).length / todayTasks.length) * 100) : 0

    const visibleTasks = globalQuery
        ? tasks
        : view === 'dashboard' || view === 'today'
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

    return (
        <main>
            <PageContainer className="py-6 lg:py-8">
                <header className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-primary uppercase">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{copy.title}</h1>
                        <p className="mt-1.5 text-sm text-muted">{copy.description}</p>
                    </div>
                </header>

                {isDashboard && (
                    <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Task statistics">
                        <StatCard icon={ListTodo} label="Today's tasks" value={todayTasks.length} note="tasks scheduled" tone="bg-primary/10 text-primary" />
                        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} note="across your workspace" tone="bg-success/10 text-success" />
                        <StatCard icon={Clock3} label="Pending" value={pending.length} note="across all lists" tone="bg-warning/10 text-warning" />
                        <StatCard icon={Zap} label="Productivity" value={`${productivity}%`} note="today's progress" tone="bg-violet-500/10 text-violet-400" />
                    </section>
                )}

                <div className={`grid items-start gap-5 ${isDashboard ? 'xl:grid-cols-[minmax(0,1fr)_280px]' : ''}`}>
                    <TaskWorkspace title={globalQuery ? 'Search results' : copy.listTitle} description={globalQuery ? `Matching â€œ${globalQuery}â€ across all tasks` : undefined} tasks={visibleTasks} globalQuery={globalQuery} allowCompletedToggle={view === 'dashboard' || view === 'today'} onAddTask={openCreate} onToggle={toggleTask} onEdit={openEdit} onArchive={archiveTask} onRestore={restoreTask} onDelete={requestDelete} />
                    {isDashboard && <InsightsPanel tasks={tasks} />}
                </div>
            </PageContainer>
        </main>
    )
}

export default WorkspacePage
