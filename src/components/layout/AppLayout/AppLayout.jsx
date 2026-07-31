import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Plus, Trash2 } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import MobileDrawer from '@/components/layout/MobileDrawer'
import SettingsDialog from '@/components/layout/SettingsDialog'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import TaskDetailsDialog from '@/components/tasks/TaskDetailsDialog'
import TaskFormDialog from '@/components/tasks/TaskFormDialog'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useTaskStore } from '@/features/tasks/store/useTaskStore'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const readPreference = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback } catch { return fallback }
}

const AppLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const routeRef = useRef(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => readPreference('taskly-sidebar-collapsed', 'false') === 'true')
    const [formState, setFormState] = useState(null)
    const [viewTarget, setViewTarget] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [theme, setTheme] = useState(() => readPreference('taskly-theme', 'dark'))
    const [density, setDensity] = useState(() => readPreference('taskly-density', 'comfortable'))
    const [defaultCategory, setDefaultCategory] = useState(() => readPreference('taskly-default-category', 'Work'))
    const [defaultPriority, setDefaultPriority] = useState(() => readPreference('taskly-default-priority', 'Medium'))

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
        localStorage.setItem('taskly-default-category', defaultCategory)
    }, [defaultCategory])

    useEffect(() => {
        localStorage.setItem('taskly-default-priority', defaultPriority)
    }, [defaultPriority])

    useEffect(() => {
        localStorage.setItem('taskly-sidebar-collapsed', String(sidebarCollapsed))
    }, [sidebarCollapsed])

    useEffect(() => {
        const handleKeys = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                document.querySelector('[aria-label="Search tasks"]')?.focus()
            }
            if (event.key.toLowerCase() === 'n' && !event.target.matches('input, textarea, select')) setFormState({ mode: 'create', task: null })
        }
        document.addEventListener('keydown', handleKeys)
        return () => {
            document.removeEventListener('keydown', handleKeys)
        }
    }, [])

    useGSAP(() => {
        if (prefersReducedMotion()) return
        gsap.fromTo(routeRef.current, { autoAlpha: 0, scale: 0.995 }, { autoAlpha: 1, scale: 1, duration: 0.32, ease: 'power2.out', transformOrigin: 'top center', clearProps: 'opacity,visibility,transform' })
    }, { scope: routeRef, dependencies: [location.pathname], revertOnUpdate: true })

    const openCreate = () => setFormState({ mode: 'create', task: null })
    const openView = (task) => setViewTarget(task)
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
    const exportTasks = () => {
        const backup = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), tasks: store.tasks }, null, 2)
        const downloadUrl = URL.createObjectURL(new Blob([backup], { type: 'application/json' }))
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = `taskly-tasks-${new Date().toISOString().slice(0, 10)}.json`
        link.click()
        URL.revokeObjectURL(downloadUrl)
        toast.success('Task backup downloaded.')
    }

    const outletContext = {
        tasks: store.tasks,
        openCreate,
        openView,
        openEdit,
        toggleTask: store.toggleTask,
        archiveTask,
        restoreTask,
        requestDelete: setDeleteTarget,
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar className="sticky top-0 hidden h-screen lg:flex" collapsible collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
            <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className="min-w-0 flex-1">
                <Topbar onMenuOpen={() => setMobileOpen(true)} themeData={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} onAddTask={openCreate} onOpenSettings={() => setSettingsOpen(true)} user={user} tasks={store.tasks} onOpenProfile={() => navigate('/profile')} onOpenLogin={() => navigate('/login')} onOpenSignUp={() => navigate('/signup')} onLogout={() => { logout(); navigate('/login'); toast.success('You have been logged out.') }} />
                <div ref={routeRef}>
                    <Outlet context={outletContext} />
                </div>
            </div>

            <Button className="fixed right-5 bottom-5 z-20 size-12 rounded-full p-0 shadow-primary lg:hidden" aria-label="Add task" onClick={openCreate}><Plus className="size-5" /></Button>

            {viewTarget && <TaskDetailsDialog task={viewTarget} onClose={() => setViewTarget(null)} />}
            {formState && <TaskFormDialog key={formState.task?.id ?? 'new-task'} task={formState.task} defaults={{ category: defaultCategory, priority: defaultPriority }} onClose={() => setFormState(null)} onSubmit={saveTask} />}
            <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete this task?" description="This permanently removes the task from your workspace." footer={<><Button variant="secondary" onClick={() => setDeleteTarget(null)}>Keep task</Button><Button variant="danger" onClick={confirmDelete}><Trash2 className="size-4" />Delete task</Button></>}><p className="text-sm text-body">{deleteTarget?.title}</p></Dialog>
            <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} density={density} onDensityChange={setDensity} defaultCategory={defaultCategory} onDefaultCategoryChange={setDefaultCategory} defaultPriority={defaultPriority} onDefaultPriorityChange={setDefaultPriority} onExportTasks={exportTasks} />
            <Toaster richColors position="bottom-right" theme={theme} />
        </div>
    )
}

export default AppLayout
