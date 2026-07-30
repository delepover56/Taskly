import { useState } from 'react'
import { Bell, CalendarClock, Check, CheckCircle2, Sparkles } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'

const initialNotifications = [
    { id: 'due', title: 'Tasks due today', message: 'Review your Today list before the day ends.', time: '12 min ago', icon: CalendarClock, read: false },
    { id: 'progress', title: 'Progress saved', message: 'Your latest task updates are stored locally.', time: '1 hour ago', icon: CheckCircle2, read: false },
    { id: 'tip', title: 'Planning tip', message: 'Choose one high-priority task before adding more.', time: 'Yesterday', icon: Sparkles, read: true },
]

const NotificationMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState(initialNotifications)
    const unread = notifications.filter((item) => !item.read).length

    const markRead = (id) => setNotifications((current) => current.map((item) => item.id === id ? { ...item, read: true } : item))
    const markAllRead = () => setNotifications((current) => current.map((item) => ({ ...item, read: true })))

    return (
        <div className="relative">
            <IconButton aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} aria-haspopup="menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
                <Bell className="size-4.5" />
                {unread > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full border-2 border-surface bg-danger" />}
            </IconButton>
            {isOpen && (
                <>
                    <button className="fixed inset-0 z-30 cursor-default" type="button" aria-label="Close notifications" onClick={() => setIsOpen(false)} />
                    <section className="absolute top-full right-0 z-40 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-card shadow-card" aria-label="Notifications">
                        <header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-bold text-foreground">Notifications</h2><p className="text-[10px] text-muted">{unread ? `${unread} unread update${unread === 1 ? '' : 's'}` : 'You are all caught up'}</p></div>{unread > 0 && <button className="text-[11px] font-semibold text-primary" type="button" onClick={markAllRead}>Mark all read</button>}</header>
                        <div className="p-2">
                            {notifications.map((item) => {
                                const Icon = item.icon
                                return <button key={item.id} className={`flex w-full gap-3 rounded-lg p-3 text-left transition hover:bg-control-muted ${item.read ? '' : 'bg-primary/5'}`} type="button" onClick={() => markRead(item.id)}><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><strong className="flex items-center gap-2 text-xs text-foreground">{item.title}{item.read && <Check className="size-3 text-success" />}</strong><span className="mt-1 block text-[11px] leading-4 text-muted">{item.message}</span><time className="mt-1 block text-[9px] text-muted">{item.time}</time></span></button>
                            })}
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

export default NotificationMenu
