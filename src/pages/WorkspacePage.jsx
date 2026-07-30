import { useRef, useState } from 'react'
import { AlertTriangle, CalendarDays, CheckCircle2, Clock3, ListTodo } from 'lucide-react'
import { useOutletContext } from 'react-router'
import InsightsPanel from '@/components/layout/InsightsPanel'
import PageContainer from '@/components/layout/PageContainer'
import TaskWorkspace from '@/components/tasks/TaskWorkspace'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { formatTaskDate, toDateKey } from '@/lib/date'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const viewCopy = {
    dashboard: { title: 'Plan your day with clarity', description: 'A live overview of your workload, deadlines, and progress.' },
    today: { title: 'Today', description: 'Everything scheduled for today, in one focused list.', listTitle: "Today's tasks" },
    upcoming: { title: 'Upcoming', description: 'See what is ahead before it becomes urgent.', listTitle: 'Upcoming tasks' },
    important: { title: 'Important', description: 'Focus on unfinished high-priority work.', listTitle: 'High-priority tasks' },
    completed: { title: 'Completed', description: 'Review the work you have already finished.', listTitle: 'Completed tasks' },
    archived: { title: 'Archived', description: 'Restore older tasks or remove them permanently.', listTitle: 'Archived tasks' },
}

const StatCard = ({ icon: Icon, label, value, note, tone }) => (
    <Card data-dashboard-card className="flex items-center gap-3 p-4">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="size-5" /></span>
        <div><p className="text-[11px] font-semibold text-muted">{label}</p><strong className="font-display text-xl text-foreground">{value}</strong><p className="text-[10px] text-muted">{note}</p></div>
    </Card>
)

const WorkspacePage = ({ view }) => {
    const { tasks, openCreate, openEdit, toggleTask, archiveTask, restoreTask, requestDelete } = useOutletContext()
    const pageRef = useRef(null)
    const user = useAuthStore((state) => state.user)
    const today = toDateKey()
    const [selectedDate, setSelectedDate] = useState(today)
    const nonArchived = tasks.filter((task) => !task.archived)
    const todayTasks = nonArchived.filter((task) => task.dueDate === today)
    const completed = nonArchived.filter((task) => task.completed)
    const pending = nonArchived.filter((task) => !task.completed)
    const completedToday = todayTasks.filter((task) => task.completed).length
    const upcomingCount = pending.filter((task) => task.dueDate > today).length
    const overdueCount = pending.filter((task) => task.dueDate < today).length
    const nextTask = [...pending].sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]
    const categoryCounts = Object.entries(nonArchived.reduce((counts, task) => ({ ...counts, [task.category]: (counts[task.category] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1])

    const visibleTasks = view === 'today'
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
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    const firstName = user?.name?.trim().split(/\s+/)[0]
    const pageTitle = isDashboard && firstName ? [greeting, firstName].join(', ') : copy.title

    useGSAP(() => {
        if (prefersReducedMotion()) return

        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
        timeline.from('[data-page-heading]', { autoAlpha: 0, y: 14, duration: 0.4 })
        if (isDashboard) timeline.from('[data-dashboard-card]', { autoAlpha: 0, y: 18, duration: 0.42, stagger: 0.06 }, '-=0.2')
    }, { scope: pageRef, dependencies: [view], revertOnUpdate: true })

    return (
        <main ref={pageRef}>
            <PageContainer className="py-6 lg:py-8">
                <header data-page-heading className="mb-6">
                    <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-primary uppercase">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{pageTitle}</h1>
                    <p className="mt-1.5 text-sm text-muted">{copy.description}</p>
                </header>

                {isDashboard && (
                    <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Live task statistics">
                        <StatCard icon={ListTodo} label="Due today" value={todayTasks.length} note={`${todayTasks.length - completedToday} still open`} tone="bg-primary/10 text-primary" />
                        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} note="across active lists" tone="bg-success/10 text-success" />
                        <StatCard icon={Clock3} label="Open tasks" value={pending.length} note={`${upcomingCount} due after today`} tone="bg-warning/10 text-warning" />
                        <StatCard icon={AlertTriangle} label="Overdue" value={overdueCount} note="past their due date" tone="bg-danger/10 text-danger" />
                    </section>
                )}

                {isDashboard ? (
                    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
                        <div className="grid gap-5">
                            <Card data-dashboard-card className="p-5">
                                <h2 className="font-display text-base font-bold text-foreground">Next deadline</h2>
                                {nextTask ? (
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-control p-4">
                                        <div><p className="text-sm font-semibold text-foreground">{nextTask.title}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><CalendarDays className="size-3.5" />Due {formatTaskDate(nextTask.dueDate)} · {nextTask.priority} priority</p></div>
                                        <Button variant="secondary" size="sm" onClick={() => openEdit(nextTask)}>Review task</Button>
                                    </div>
                                ) : <p className="mt-4 text-sm text-muted">No unfinished deadlines. Add a task when you are ready to plan more work.</p>}
                            </Card>
                            <Card data-dashboard-card className="p-5">
                                <h2 className="font-display text-base font-bold text-foreground">Tasks by category</h2>
                                <p className="mt-1 text-xs text-muted">Distribution of all non-archived tasks.</p>
                                {categoryCounts.length ? <div className="mt-5 space-y-4">{categoryCounts.map(([category, count]) => <div key={category}><div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-body">{category}</span><span className="text-muted">{count}</span></div><div className="h-2 overflow-hidden rounded-full bg-control-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((count / nonArchived.length) * 100)}%` }} /></div></div>)}</div> : <p className="mt-4 text-sm text-muted">No active tasks to summarize.</p>}
                            </Card>
                        </div>
                        <InsightsPanel tasks={tasks} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                    </div>
                ) : (
                    <TaskWorkspace title={copy.listTitle} tasks={visibleTasks} allowCompletedToggle={view === 'today'} onAddTask={openCreate} onToggle={toggleTask} onEdit={openEdit} onArchive={archiveTask} onRestore={restoreTask} onDelete={requestDelete} />
                )}
            </PageContainer>
        </main>
    )
}

export default WorkspacePage
