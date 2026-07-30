import { useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useRef } from 'react'
import Card from '@/components/ui/Card'
import IconButton from '@/components/ui/IconButton'
import { formatTaskDate, toDateKey } from '@/lib/date'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const InsightsPanel = ({ tasks, selectedDate, onSelectDate }) => {
    const [calendarDate, setCalendarDate] = useState(new Date())
    const progressRef = useRef(null)
    const progressValueRef = useRef(null)
    const calendarGridRef = useRef(null)
    const today = toDateKey()
    const todaysTasks = tasks.filter((task) => task.dueDate === today && !task.archived)
    const completedToday = todaysTasks.filter((task) => task.completed).length
    const percentage = todaysTasks.length ? Math.round((completedToday / todaysTasks.length) * 100) : 0
    const selectedTasks = tasks.filter((task) => task.dueDate === selectedDate && !task.archived)
    const selectedCompleted = selectedTasks.filter((task) => task.completed).length

    const calendarCells = useMemo(() => {
        const year = calendarDate.getFullYear()
        const month = calendarDate.getMonth()
        const start = new Date(year, month, 1).getDay()
        const days = new Date(year, month + 1, 0).getDate()
        return [...Array(start).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)]
    }, [calendarDate])

    const changeMonth = (amount) => setCalendarDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1))
    const activity = [...tasks].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3)

    useGSAP(() => {
        if (prefersReducedMotion()) return
        const progress = { value: 0 }
        gsap.to(progress, {
            value: percentage,
            duration: 0.7,
            ease: 'power2.out',
            onUpdate: () => {
                const value = Math.round(progress.value)
                progressRef.current.style.background = `conic-gradient(var(--app-primary) ${value}%, var(--app-control-muted) 0)`
                progressValueRef.current.textContent = `${value}%`
            },
        })
    }, { scope: progressRef, dependencies: [percentage], revertOnUpdate: true })

    useGSAP(() => {
        if (prefersReducedMotion()) return
        gsap.fromTo(calendarGridRef.current.children, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.2, stagger: 0.008, ease: 'power2.out', clearProps: 'transform' })
    }, { scope: calendarGridRef, dependencies: [calendarDate.getFullYear(), calendarDate.getMonth()], revertOnUpdate: true })

    return (
        <aside className="space-y-4 xl:sticky xl:top-22 xl:self-start" aria-label="Productivity insights">
            <Card data-dashboard-card className="p-5">
                <h3 className="font-display text-sm font-bold text-foreground">Today&apos;s progress</h3>
                <div ref={progressRef} className="mx-auto mt-4 grid size-32 place-items-center rounded-full" style={{ background: `conic-gradient(var(--app-primary) ${percentage}%, var(--app-control-muted) 0)` }}><div className="grid size-24 place-items-center rounded-full bg-card text-center"><div><strong ref={progressValueRef} className="font-display text-2xl text-foreground">{percentage}%</strong><span className="block text-[10px] text-muted">complete</span></div></div></div>
                <p className="mt-4 text-center text-xs text-muted">{completedToday} of {todaysTasks.length} tasks completed today.</p>
            </Card>

            <Card data-dashboard-card className="p-5">
                <div className="flex items-center justify-between"><div><h3 className="font-display text-sm font-bold text-foreground">{new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(calendarDate)}</h3><p className="mt-0.5 text-[9px] text-muted">Select a date to view its task count</p></div><div className="flex"><IconButton size="sm" aria-label="Previous month" onClick={() => changeMonth(-1)}><ChevronLeft className="size-3.5" /></IconButton><IconButton size="sm" aria-label="Next month" onClick={() => changeMonth(1)}><ChevronRight className="size-3.5" /></IconButton></div></div>
                <div className="mt-4 grid grid-cols-7 text-center text-[9px] font-semibold text-muted">{'SMTWTFS'.split('').map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
                <div ref={calendarGridRef} className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px]">
                    {calendarCells.map((day, index) => {
                        if (!day) return <span key={`empty-${index}`} />
                        const value = toDateKey(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day))
                        const hasTask = tasks.some((task) => task.dueDate === value && !task.archived)
                        const isSelected = value === selectedDate
                        return <button key={value} type="button" aria-label={`Show tasks due ${value}`} aria-pressed={isSelected} onClick={() => onSelectDate(value)} className={`relative grid aspect-square place-items-center rounded-md transition hover:bg-control-muted ${isSelected ? 'bg-primary font-bold text-white hover:bg-primary' : value === today ? 'ring-1 ring-primary text-primary' : 'text-body'}`}>{day}{hasTask && !isSelected && <i className="absolute bottom-0.5 size-1 rounded-full bg-primary" />}</button>
                    })}
                </div>
                <div className="mt-4 rounded-lg bg-control p-3"><p className="text-[10px] font-semibold text-muted">{formatTaskDate(selectedDate)}</p><p className="mt-1 text-xs text-body"><strong className="text-foreground">{selectedTasks.length}</strong> task{selectedTasks.length === 1 ? '' : 's'} due · {selectedCompleted} completed</p></div>
            </Card>

            <Card data-dashboard-card className="p-5">
                <h3 className="font-display text-sm font-bold text-foreground">Recent activity</h3>
                {activity.length ? <ul className="mt-4 space-y-3">{activity.map((task) => <li key={task.id} className="flex gap-2.5 text-[11px]"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{task.completed ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}</span><p className="min-w-0 text-muted">{task.completed ? 'Completed' : 'Updated'} <strong className="block truncate text-foreground">{task.title}</strong></p></li>)}</ul> : <p className="mt-4 text-xs text-muted">Task changes will appear here.</p>}
            </Card>
        </aside>
    )
}

export default InsightsPanel
