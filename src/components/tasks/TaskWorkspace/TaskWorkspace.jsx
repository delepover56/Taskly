import { useMemo, useState } from 'react'
import { LayoutGrid, List, Plus, SearchX } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SearchField from '@/components/ui/SearchField'
import Select from '@/components/ui/Select'
import TaskItem from '@/components/tasks/TaskItem'
import { taskCategorySchema } from '@/features/tasks/model/taskSchema'

const priorityWeight = { High: 0, Medium: 1, Low: 2 }

const TaskWorkspace = ({ title, description, tasks, globalQuery, allowCompletedToggle = false, onAddTask, onToggle, onEdit, onArchive, onRestore, onDelete }) => {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const [sort, setSort] = useState('due')
    const [showCompleted, setShowCompleted] = useState(false)

    const filteredTasks = useMemo(() => {
        const search = (globalQuery || query).trim().toLowerCase()
        return [...tasks]
            .filter((task) => (showCompleted || !allowCompletedToggle || !task.completed))
            .filter((task) => category === 'All' || task.category === category)
            .filter((task) => !search || `${task.title} ${task.description} ${task.category} ${task.tags.join(' ')}`.toLowerCase().includes(search))
            .sort((a, b) => {
                if (sort === 'priority') return priorityWeight[a.priority] - priorityWeight[b.priority]
                if (sort === 'title') return a.title.localeCompare(b.title)
                if (sort === 'created') return b.createdAt.localeCompare(a.createdAt)
                return a.dueDate.localeCompare(b.dueDate)
            })
    }, [allowCompletedToggle, category, globalQuery, query, showCompleted, sort, tasks])

    return (
        <Card className="overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
                <div><h2 className="font-display text-base font-bold text-foreground">{title}</h2><p className="mt-1 text-xs text-muted">{description ?? `${filteredTasks.length} tasks in this view`}</p></div>
                {allowCompletedToggle && <button className="text-xs font-semibold text-primary" type="button" onClick={() => setShowCompleted((value) => !value)}>{showCompleted ? 'Hide completed' : 'Show completed'}</button>}
            </div>
            <div className="grid gap-2 border-b border-border p-3 sm:grid-cols-[minmax(180px,1fr)_150px_145px_auto] sm:px-5">
                <SearchField placeholder="Search this view" value={query} onChange={(event) => setQuery(event.target.value)} />
                <Select aria-label="Filter category" value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{taskCategorySchema.options.map((item) => <option key={item}>{item}</option>)}</Select>
                <Select aria-label="Sort tasks" value={sort} onChange={(event) => setSort(event.target.value)}><option value="due">Due date</option><option value="priority">Priority</option><option value="created">Created date</option><option value="title">Alphabetical</option></Select>
                <div className="hidden items-center gap-1 sm:flex"><span className="rounded-lg bg-primary/15 p-2 text-primary"><List className="size-4" /></span><span className="p-2 text-muted"><LayoutGrid className="size-4" /></span></div>
            </div>
            <div className="divide-y divide-border/60 p-2 sm:p-3">
                {filteredTasks.length ? filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onArchive={onArchive} onRestore={onRestore} onDelete={onDelete} />
                )) : (
                    <div className="flex min-h-60 flex-col items-center justify-center px-5 text-center">
                        <span className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary"><SearchX className="size-7" /></span>
                        <h3 className="font-display font-bold text-foreground">Nothing on this list</h3>
                        <p className="mt-1 max-w-xs text-xs leading-5 text-muted">Enjoy the calm, adjust your filters, or add your next great idea.</p>
                        <Button className="mt-4" onClick={onAddTask}><Plus className="size-4" />Add a task</Button>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default TaskWorkspace
