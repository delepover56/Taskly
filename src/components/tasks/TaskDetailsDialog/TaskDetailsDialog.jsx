import { useState } from 'react'
import { Archive, CalendarDays, CheckCircle2, Clock3 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { formatDateTime, formatTaskDate, toDateKey } from '@/lib/date'

const priorityVariant = { High: 'danger', Medium: 'warning', Low: 'success' }

const TaskDetailsDialog = ({ task, onClose }) => {
    const [isOpen, setIsOpen] = useState(true)
    const handleClose = () => setIsOpen(false)
    const isOverdue = !task.completed && task.dueDate < toDateKey()

    return (
        <Dialog open={isOpen} onClose={handleClose} onAfterClose={onClose} title={task.title} description="Task details" footer={<Button onClick={handleClose}>Close</Button>}>
            <div className="grid gap-5">
                <div className="flex flex-wrap gap-2">
                    <Badge varient={task.completed ? 'success' : 'primary'}>{task.completed ? 'Completed' : 'Open'}</Badge>
                    {task.archived && <Badge>Archived</Badge>}
                    <Badge varient={priorityVariant[task.priority]}>{task.priority} priority</Badge>
                    {isOverdue && <Badge varient="danger">Overdue</Badge>}
                </div>

                <section>
                    <h3 className="text-xs font-bold tracking-wide text-muted uppercase">Description</h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-body">{task.description}</p>
                </section>

                <dl className="grid gap-3 rounded-xl border border-border bg-control/60 p-4 sm:grid-cols-2">
                    <div><dt className="text-[11px] font-semibold text-muted">Due date</dt><dd className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground"><CalendarDays className="size-4 text-primary" />{formatTaskDate(task.dueDate)}</dd></div>
                    <div><dt className="text-[11px] font-semibold text-muted">Category</dt><dd className="mt-1 text-sm font-semibold text-foreground">{task.category}</dd></div>
                    <div><dt className="text-[11px] font-semibold text-muted">Created</dt><dd className="mt-1 flex items-center gap-1.5 text-xs text-body"><Clock3 className="size-3.5" />{formatDateTime(task.createdAt)}</dd></div>
                    <div><dt className="text-[11px] font-semibold text-muted">Last updated</dt><dd className="mt-1 flex items-center gap-1.5 text-xs text-body"><Clock3 className="size-3.5" />{formatDateTime(task.updatedAt)}</dd></div>
                    {task.completedAt && <div><dt className="text-[11px] font-semibold text-muted">Completed</dt><dd className="mt-1 flex items-center gap-1.5 text-xs text-body"><CheckCircle2 className="size-3.5 text-success" />{formatDateTime(task.completedAt)}</dd></div>}
                    {task.archivedAt && <div><dt className="text-[11px] font-semibold text-muted">Archived</dt><dd className="mt-1 flex items-center gap-1.5 text-xs text-body"><Archive className="size-3.5" />{formatDateTime(task.archivedAt)}</dd></div>}
                </dl>

                <section>
                    <h3 className="text-xs font-bold tracking-wide text-muted uppercase">Tags</h3>
                    <div className="mt-2 flex flex-wrap gap-2">{task.tags.map((tag) => <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">#{tag.replace('_', ' ')}</span>)}</div>
                </section>
            </div>
        </Dialog>
    )
}

export default TaskDetailsDialog