import { Archive, CalendarDays, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Checkbox from '@/components/ui/Checkbox'
import IconButton from '@/components/ui/IconButton'
import { formatTaskDate, toDateKey } from '@/lib/date'

const priorityVariant = { High: 'danger', Medium: 'warning', Low: 'success' }

const TaskItem = ({ task, onToggle, onEdit, onArchive, onRestore, onDelete }) => {
    const isOverdue = !task.completed && task.dueDate < toDateKey()

    return (
        <article className="group flex gap-3 rounded-xl border border-transparent px-3 py-3 transition hover:border-border hover:bg-control/70">
            {!task.archived && <Checkbox aria-label={`${task.completed ? 'Uncomplete' : 'Complete'} ${task.title}`} checked={task.completed} onChange={() => onToggle(task.id)} />}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-sm font-semibold text-foreground ${task.completed ? 'text-muted line-through' : ''}`}>{task.title}</h3>
                    <Badge varient={priorityVariant[task.priority]}>{task.priority}</Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{task.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                    <Badge>{task.category}</Badge>
                    <span className={isOverdue ? 'flex items-center gap-1 font-semibold text-danger' : 'flex items-center gap-1'}>
                        <CalendarDays className="size-3.5" />{isOverdue && 'Overdue · '}{formatTaskDate(task.dueDate)}
                    </span>
                    {task.tags.map((tag) => <span key={tag} className="rounded-md bg-primary/10 px-1.5 py-0.5 font-semibold text-primary">#{tag.replace('_', ' ')}</span>)}
                </div>
            </div>
            <div className="flex shrink-0 items-start gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                {task.archived ? (
                    <IconButton size="sm" aria-label={`Restore ${task.title}`} onClick={() => onRestore(task.id)}><RotateCcw className="size-3.5" /></IconButton>
                ) : (
                    <>
                        <IconButton size="sm" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Pencil className="size-3.5" /></IconButton>
                        <IconButton size="sm" aria-label={`Archive ${task.title}`} onClick={() => onArchive(task.id)}><Archive className="size-3.5" /></IconButton>
                    </>
                )}
                <IconButton size="sm" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}><Trash2 className="size-3.5" /></IconButton>
            </div>
        </article>
    )
}

export default TaskItem
