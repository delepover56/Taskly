import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Plus, Trash2 } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import MobileDrawer from '@/components/layout/MobileDrawer'
import SettingsDialog from '@/components/layout/SettingsDialog'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import TaskFormDialog from '@/components/tasks/TaskFormDialog'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useTaskStore } from '@/features/tasks/store/useTaskStore'

const readPreference = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback } catch { return fallback }
}

const AppLayout = () => {
    const navigate = useNavigate()
    const [globalQuery, setGlobalQuery] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)
    const [formState, setFormState] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [theme, setTheme] = useState(() => readPreference('taskly-theme', 'dark'))
    const [density, setDensity] = useState(() => readPreference('taskly-density', 'comfortable'))

    const store = useTaskStore()
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('taskly-theme', theme)
    }, [theme])

    useEffect(() => {
        document.documentElement.dataset.density = density
        localStorage.setItem('taskly-density', density)
    }, [density])

    useEffect(() => {
        const handleKeys = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                document.querySelector('[aria-label="Search all tasks"]')?.focus()
            }
            if (event.key.toLowerCase() === 'n' && !event.target.matches('input, textarea, select')) setFormState({ mode: 'create', task: null })
        }
        document.addEventListener('keydown', handleKeys)
        return () => {
            document.removeEventListener('keydown', handleKeys)
        }
    }, [])

    const openCreate = () => setFormState({ mode: 'create', task: null })
    const openEdit = (task) => setFormState({ mode: 'edit', task })
    const saveTask = (data) => {
        if (formState?.task) {
            store.updateTask(formState.task.id, data)
            toast.success('Task changes saved.')
        } else {
            store.addTask(data)
            toast.success('New task added.')
        }
    }
    const deleteTargetId = deleteTarget?.id
    const deleteTargetTitle = deleteTarget?.title

    const confirmDelete = () => {
        if (!deleteTargetId) return

        store.deleteTask(deleteTargetId)
        toast.success(`"${deleteTargetTitle}" deleted.`)
        setDeleteTarget(null)
    }
    const archiveTask = (id) => { store.archiveTask(id); toast.success('Task archived.') }
    const restoreTask = (id) => { store.restoreTask(id); toast.success('Task restored.') }

    const outletContext = {
        tasks: store.tasks,
        globalQuery,
        openCreate,
        openEdit,
        toggleTask: store.toggleTask,
        archiveTask,
        restoreTask,
        requestDelete: setDeleteTarget,
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar className="sticky top-0 hidden h-screen lg:flex" />
            <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className="min-w-0 flex-1">
                <Topbar searchData={globalQuery} onSearchChange={(event) => setGlobalQuery(event.target.value)} onMenuOpen={() => setMobileOpen(true)} themeData={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} onAddTask={openCreate} onOpenSettings={() => setSettingsOpen(true)} user={user} onOpenProfile={() => navigate('/profile')} onOpenLogin={() => navigate('/login')} onOpenSignUp={() => navigate('/signup')} onLogout={() => { logout(); navigate('/login'); toast.success('You have been logged out.') }} />
                <Outlet context={outletContext} />
            </div>

            <Button className="fixed right-5 bottom-5 z-20 size-12 rounded-full p-0 shadow-primary lg:hidden" aria-label="Add task" onClick={openCreate}><Plus className="size-5" /></Button>

            {formState && <TaskFormDialog key={formState.task?.id ?? 'new-task'} task={formState.task} onClose={() => setFormState(null)} onSubmit={saveTask} />}
            <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete this task?" description="This permanently removes the task from your workspace." footer={<><Button variant="secondary" onClick={() => setDeleteTarget(null)}>Keep task</Button><Button variant="danger" onClick={confirmDelete}><Trash2 className="size-4" />Delete task</Button></>}><p className="text-sm text-body">{deleteTarget?.title}</p></Dialog>
            <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} theme={theme} onThemeChange={setTheme} density={density} onDensityChange={setDensity} onResetTasks={() => { store.resetTasks(); toast.success('Demo tasks restored.') }} />
            <Toaster richColors position="bottom-right" theme={theme} />
        </div>
    )
}

export default AppLayout
