import { useState } from 'react'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import { taskCategorySchema, taskPrioritySchema, taskSchema, taskTagSchema } from '@/features/tasks/model/taskSchema'
import { toDateKey } from '@/lib/date'
import { cn } from '@/lib/cn'

const TaskFormDialog = ({ task, defaults, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        title: task?.title ?? '',
        description: task?.description ?? '',
        category: task?.category ?? defaults?.category ?? 'Work',
        priority: task?.priority ?? defaults?.priority ?? 'Medium',
        dueDate: task?.dueDate ?? toDateKey(),
        tags: task?.tags ?? ['Desk'],
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))
    const toggleTag = (tag) => {
        setForm((current) => {
            const selected = current.tags.includes(tag)
            if (!selected && current.tags.length >= 3) return current
            return { ...current, tags: selected ? current.tags.filter((item) => item !== tag) : [...current.tags, tag] }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const timestamp = new Date().toISOString()
        const result = taskSchema.safeParse({
            ...task,
            ...form,
            id: task?.id ?? crypto.randomUUID(),
            createdAt: task?.createdAt ?? timestamp,
            updatedAt: timestamp,
        })

        if (!result.success) {
            setError(result.error.issues[0]?.message ?? 'Please check the form.')
            return
        }

        setError('')
        setIsSubmitting(true)
        try {
            await onSubmit(form)
            onClose()
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open onClose={onClose} title={task ? 'Edit task' : 'Create a new task'} description="Plan the work, set its priority, and give it useful context." footer={(
            <><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form="task-form" disabled={isSubmitting}><Check className="size-4" />{isSubmitting ? 'Saving...' : task ? 'Save changes' : 'Create task'}</Button></>
        )}>
            <form id="task-form" className="grid gap-4" onSubmit={handleSubmit}>
                <label className="grid gap-1.5 text-xs font-semibold text-body">Task title<Input autoFocus value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="What needs to be done?" /></label>
                <label className="grid gap-1.5 text-xs font-semibold text-body">Description<Textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Add context, links, or details..." /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-xs font-semibold text-body">Category<Select value={form.category} onChange={(event) => updateField('category', event.target.value)}>{taskCategorySchema.options.map((category) => <option key={category}>{category}</option>)}</Select></label>
                    <label className="grid gap-1.5 text-xs font-semibold text-body">Priority<Select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>{taskPrioritySchema.options.map((priority) => <option key={priority}>{priority}</option>)}</Select></label>
                </div>
                <label className="grid gap-1.5 text-xs font-semibold text-body">Due date<Input type="date" value={form.dueDate} onChange={(event) => updateField('dueDate', event.target.value)} /></label>
                <fieldset>
                    <legend className="mb-2 text-xs font-semibold text-body">Tags <span className="font-normal text-muted">(choose 1–3)</span></legend>
                    <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto">
                        {taskTagSchema.options.map((tag) => (
                            <button key={tag} type="button" className={cn('rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted', form.tags.includes(tag) && 'border-primary bg-primary/10 text-primary')} onClick={() => toggleTag(tag)}>{tag.replace('_', ' ')}</button>
                        ))}
                    </div>
                </fieldset>
                {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs font-semibold text-danger" role="alert">{error}</p>}
            </form>
        </Dialog>
    )
}

export default TaskFormDialog

