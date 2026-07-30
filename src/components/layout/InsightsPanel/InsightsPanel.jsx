import { useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Keyboard, Plus } from 'lucide-react'
import Card from '@/components/ui/Card'
import IconButton from '@/components/ui/IconButton'
import { toDateKey } from '@/lib/date'

const InsightsPanel = ({ tasks, selectedDate, onSelectDate }) => {
    const [calendarDate, setCalendarDate] = useState(new Date())
    const today = toDateKey()
    const todaysTasks = tasks.filter((task) => task.dueDate === today && !task.archived)
    const completedToday = todaysTasks.filter((task) => task.completed).length
    const percentage = todaysTasks.length ? Math.round((completedToday / todaysTasks.length) * 100) : 0

    const calendarCells = useMemo(() => {
        const year = calendarDate.getFullYear()
        const month = calendarDate.getMonth()
        const start = new Date(year, month, 1).getDay()
        const days = new Date(year, month + 1, 0).getDate()
        return [...Array(start).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)]
    }, [calendarDate])

    const changeMonth = (amount) => setCalendarDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1))
    const activity = [...tasks].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3)

    return (
        <aside className="space-y-4 xl:sticky xl:top-22 xl:self-start" aria-label="Productivity insights">
            <Card className="p-5">
                <h3 className="font-display text-sm font-bold text-foreground">Today&apos;s progress</h3>
                <div className="mx-auto mt-4 grid size-32 place-items-center rounded-full" style={{ background: `conic-gradient(var(--app-primary) ${percentage}%, var(--app-control-muted) 0)` }}><div className="grid size-24 place-items-center rounded-full bg-card text-center"><div><strong className="font-display text-2xl text-foreground">{percentage}%</strong><span className="block text-[10px] text-muted">complete</span></div></div></div>
                <p className="mt-4 text-center text-xs text-muted">{completedToday} of {todaysTasks.length} tasks completed today.</p>
            </Card>

            <Card className="p-5">
                <div className="flex items-center justify-between"><div><h3 className="font-display text-sm font-bold text-foreground">{new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(calendarDate)}</h3><p className="mt-0.5 text-[9px] text-muted">Select a date to filter tasks</p></div><div className="flex"><IconButton size="sm" aria-label="Previous month" onClick={() => changeMonth(-1)}><ChevronLeft className="size-3.5" /></IconButton><IconButton size="sm" aria-label="Next month" onClick={() => changeMonth(1)}><ChevronRight className="size-3.5" /></IconButton></div></div>
                <div className="mt-4 grid grid-cols-7 text-center text-[9px] font-semibold text-muted">{'SMTWTFS'.split('').map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
                <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px]">
                    {calendarCells.map((day, index) => {
                        if (!day) return <span key={`empty-${index}`} />
                        const value = toDateKey(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day))
                        const hasTask = tasks.some((task) => task.dueDate === value && !task.archived)
                        const isSelected = value === selectedDate
                        return <button key={value} type="button" aria-label={`Show tasks due ${value}`} aria-pressed={isSelected} onClick={() => onSelectDate(value)} className={`relative grid aspect-square place-items-center rounded-md transition hover:bg-control-muted ${isSelected ? 'bg-primary font-bold text-white hover:bg-primary' : value === today ? 'ring-1 ring-primary text-primary' : 'text-body'}`}>{day}{hasTask && !isSelected && <i className="absolute bottom-0.5 size-1 rounded-full bg-primary" />}</button>
                    })}
                </div>
            </Card>

            <Card className="p-5">
                <h3 className="font-display text-sm font-bold text-foreground">Recent activity</h3>
                <ul className="mt-4 space-y-3">{activity.map((task) => <li key={task.id} className="flex gap-2.5 text-[11px]"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{task.completed ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}</span><p className="min-w-0 text-muted">{task.completed ? 'Completed' : 'Updated'} <strong className="block truncate text-foreground">{task.title}</strong></p></li>)}</ul>
            </Card>

            <div className="flex items-center gap-3 rounded-card border border-primary/25 bg-primary/10 p-4 text-primary"><Keyboard className="size-5" /><div><strong className="text-xs">Keyboard shortcuts</strong><p className="mt-0.5 text-[10px] text-body"><kbd>Ctrl</kbd> <kbd>K</kbd> search | <kbd>N</kbd> new task</p></div></div>
        </aside>
    )
}

export default InsightsPanel
