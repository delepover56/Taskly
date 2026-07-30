import { BellRing, Database, LayoutTemplate, Palette } from 'lucide-react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Select from '@/components/ui/Select'

const SettingsDialog = ({ open, onClose, theme, onThemeChange, density, onDensityChange, onResetTasks }) => {
    return (
        <Dialog open={open} onClose={onClose} title="Workspace settings" description="Personalize how Taskly looks and behaves." className="max-w-2xl" footer={<Button onClick={onClose}>Done</Button>}>
            <div className="grid gap-3 sm:grid-cols-2">
                <section className="rounded-xl border border-border bg-control/60 p-4">
                    <div className="flex items-center gap-3"><span className="rounded-lg bg-primary/10 p-2 text-primary"><Palette className="size-4" /></span><div><h3 className="text-sm font-bold text-foreground">Appearance</h3><p className="text-[11px] text-muted">Choose your workspace theme.</p></div></div>
                    <label className="mt-4 grid gap-1.5 text-xs font-semibold text-body">Color theme<Select value={theme} onChange={(event) => onThemeChange(event.target.value)}><option value="dark">Dark</option><option value="light">Light</option></Select></label>
                </section>
                <section className="rounded-xl border border-border bg-control/60 p-4">
                    <div className="flex items-center gap-3"><span className="rounded-lg bg-primary/10 p-2 text-primary"><LayoutTemplate className="size-4" /></span><div><h3 className="text-sm font-bold text-foreground">Layout</h3><p className="text-[11px] text-muted">Control information density.</p></div></div>
                    <label className="mt-4 grid gap-1.5 text-xs font-semibold text-body">Task density<Select value={density} onChange={(event) => onDensityChange(event.target.value)}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></Select></label>
                </section>
                <section className="rounded-xl border border-border bg-control/60 p-4">
                    <div className="flex items-center gap-3"><span className="rounded-lg bg-success/10 p-2 text-success"><BellRing className="size-4" /></span><div><h3 className="text-sm font-bold text-foreground">Task alerts</h3><p className="text-[11px] text-muted">Built from your current task data.</p></div></div>
                    <p className="mt-4 text-xs leading-5 text-muted">The notification menu highlights overdue work, tasks due today, and recent completions.</p>
                </section>
                <section className="rounded-xl border border-border bg-control/60 p-4">
                    <div className="flex items-center gap-3"><span className="rounded-lg bg-warning/10 p-2 text-warning"><Database className="size-4" /></span><div><h3 className="text-sm font-bold text-foreground">Task data</h3><p className="text-[11px] text-muted">Restore Taskly&apos;s starter task set.</p></div></div>
                    <Button className="mt-4" variant="secondary" size="sm" onClick={onResetTasks}>Restore starter tasks</Button>
                </section>
            </div>
        </Dialog>
    )
}

export default SettingsDialog
