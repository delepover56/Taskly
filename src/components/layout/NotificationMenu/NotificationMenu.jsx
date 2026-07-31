import { useState } from 'react'
import { AlertTriangle, Bell, CalendarClock, CheckCircle2 } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import IconButton from '@/components/ui/IconButton'
import { toDateKey } from '@/lib/date'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const NotificationMenu = ({ tasks = [] }) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const panelRef = useRef(null)
    const [readIds, setReadIds] = useState([])
    const notifications = useMemo(() => {
        const today = toDateKey()
        const activeTasks = tasks.filter((task) => !task.archived)
        const overdue = activeTasks.filter((task) => !task.completed && task.dueDate < today)
        const dueToday = activeTasks.filter((task) => !task.completed && task.dueDate === today)
        const recentlyCompleted = activeTasks
            .filter((task) => task.completed)
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .slice(0, 3)
        const items = []

        if (overdue.length) items.push({ id: `overdue-${overdue.length}`, title: `${overdue.length} overdue task${overdue.length === 1 ? '' : 's'}`, message: 'Review overdue work and update its due date or status.', time: 'Needs attention', icon: AlertTriangle })
        if (dueToday.length) items.push({ id: `today-${today}-${dueToday.length}`, title: `${dueToday.length} task${dueToday.length === 1 ? '' : 's'} due today`, message: 'Open the Today page to review what remains.', time: 'Due today', icon: CalendarClock })
        recentlyCompleted.forEach((task) => items.push({ id: `completed-${task.id}-${task.updatedAt}`, title: 'Task completed', message: task.title, time: 'Recently updated', icon: CheckCircle2 }))
        return items
    }, [tasks])
    const unreadNotifications = notifications.filter((item) => !readIds.includes(item.id))
    const unread = unreadNotifications.length

    const markRead = (id) => setReadIds((current) => current.includes(id) ? current : [...current, id])
    const markAllRead = () => setReadIds((current) => [...new Set([...current, ...notifications.map((item) => item.id)])])

    useEffect(() => {
        if (!isOpen) return

        const closeOutside = (event) => {
            if (!menuRef.current?.contains(event.target)) setIsOpen(false)
        }
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setIsOpen(false)
        }

        document.addEventListener('pointerdown', closeOutside)
        document.addEventListener('keydown', closeOnEscape)
        return () => {
            document.removeEventListener('pointerdown', closeOutside)
            document.removeEventListener('keydown', closeOnEscape)
        }
    }, [isOpen])

    useGSAP(() => {
        const panel = panelRef.current
        if (!panel) return

        if (prefersReducedMotion()) {
            gsap.set(panel, { autoAlpha: isOpen ? 1 : 0, y: 0, scale: 1 })
            return
        }

        gsap.to(panel, {
            autoAlpha: isOpen ? 1 : 0,
            y: isOpen ? 0 : -6,
            scale: isOpen ? 1 : 0.98,
            duration: isOpen ? 0.22 : 0.16,
            ease: isOpen ? 'power2.out' : 'power2.in',
            transformOrigin: 'top right',
            overwrite: true,
        })
    }, { scope: menuRef, dependencies: [isOpen] })

    return (
        <div ref={menuRef} className="relative">
            <IconButton aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} aria-haspopup="menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
                <Bell className="size-4.5" />
                {unread > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full border-2 border-surface bg-danger" />}
            </IconButton>
            <section ref={panelRef} className="invisible fixed top-18 right-3 left-3 z-40 max-h-[calc(100dvh-5.25rem)] w-auto overflow-y-auto rounded-xl border border-border bg-card opacity-0 shadow-card sm:absolute sm:top-full sm:right-0 sm:left-auto sm:mt-2 sm:max-h-[calc(100dvh-6rem)] sm:w-88" aria-label="Notifications" aria-hidden={!isOpen} inert={!isOpen}>
                        <header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-bold text-foreground">Notifications</h2><p className="text-[10px] text-muted">{unread ? `${unread} unread update${unread === 1 ? '' : 's'}` : 'Nothing needs your attention'}</p></div>{unread > 0 && <button className="text-[11px] font-semibold text-primary" type="button" onClick={markAllRead}>Mark all as read</button>}</header>
                        {unread > 0 ? (
                            <div className="p-2">
                                {unreadNotifications.map((item) => {
                                    const Icon = item.icon
                                    return <button key={item.id} className="flex w-full gap-3 rounded-lg bg-primary/5 p-3 text-left transition hover:bg-control-muted" type="button" onClick={() => markRead(item.id)}><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><strong className="text-xs text-foreground">{item.title}</strong><span className="mt-1 block text-[11px] leading-4 text-muted">{item.message}</span><time className="mt-1 block text-[9px] text-muted">{item.time}</time></span></button>
                                })}
                            </div>
                        ) : (
                            <div className="grid min-h-52 place-items-center px-6 py-8 text-center">
                                <div><span className="text-5xl" aria-hidden="true">&#128524;</span><h3 className="mt-4 font-display text-sm font-bold text-foreground">All clear</h3><p className="mt-1 text-xs leading-5 text-muted">You have read every notification. Enjoy the quiet.</p></div>
                            </div>
                        )}
            </section>
        </div>
    )
}

export default NotificationMenu
