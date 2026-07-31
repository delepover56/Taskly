import { Download, LayoutTemplate, ListTodo } from 'lucide-react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Select from '@/components/ui/Select'
import { taskCategorySchema, taskPrioritySchema } from '@/features/tasks/model/taskSchema'

const SettingsDialog = ({
    open,
    onClose,
    density,
    onDensityChange,
    defaultCategory,
    onDefaultCategoryChange,
    defaultPriority,
    onDefaultPriorityChange,
    onExportTasks,
}) => {
    return (
        <Dialog open={open} onClose={onClose} title="Workspace settings" description="Set defaults for new tasks and manage your workspace." className="max-w-2xl" footer={<Button onClick={onClose}>Done</Button>}>
            <div className="grid gap-3 sm:grid-cols-2">
                <section className="rounded-xl border border-border bg-control/60 p-4 sm:col-span-2">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary/10 p-2 text-primary"><ListTodo className="size-4" /></span>
                        <div><h3 className="text-sm font-bold text-foreground">New task defaults</h3><p className="text-[11px] text-muted">Prefill the choices you use most often.</p></div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <label className="grid gap-1.5 text-xs font-semibold text-body">Default category<Select value={defaultCategory} onChange={(event) => onDefaultCategoryChange(event.target.value)}>{taskCategorySchema.options.map((category) => <option key={category}>{category}</option>)}</Select></label>
                        <label className="grid gap-1.5 text-xs font-semibold text-body">Default priority<Select value={defaultPriority} onChange={(event) => onDefaultPriorityChange(event.target.value)}>{taskPrioritySchema.options.map((priority) => <option key={priority}>{priority}</option>)}</Select></label>
                    </div>
                </section>

                <section className="rounded-xl border border-border bg-control/60 p-4">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary/10 p-2 text-primary"><LayoutTemplate className="size-4" /></span>
                        <div><h3 className="text-sm font-bold text-foreground">Task layout</h3><p className="text-[11px] text-muted">Choose how much detail task rows show.</p></div>
                    </div>
                    <label className="mt-4 grid gap-1.5 text-xs font-semibold text-body">Task density<Select value={density} onChange={(event) => onDensityChange(event.target.value)}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></Select></label>
                </section>

                <section className="flex flex-col rounded-xl border border-border bg-control/60 p-4">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-success/10 p-2 text-success"><Download className="size-4" /></span>
                        <div><h3 className="text-sm font-bold text-foreground">Export task data</h3><p className="text-[11px] text-muted">Download a JSON backup of your current tasks.</p></div>
                    </div>
                    <Button className="mt-4 self-start" variant="secondary" size="sm" onClick={onExportTasks}><Download className="size-3.5" />Export JSON</Button>
                </section>
            </div>
        </Dialog>
    )
}

export default SettingsDialog
