import {
    Archive,
    CalendarDays,
    CheckCircle2,
    LayoutDashboard,
    PanelLeftClose,
    Star,
    Sun,
} from 'lucide-react'
import { NavLink } from 'react-router'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'
import tasklyLogo from '@/assets/logos/Taskly-Logo.svg'

const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
    { label: 'Today', to: '/today', icon: Sun },
    { label: 'Upcoming', to: '/upcoming', icon: CalendarDays },
    { label: 'Important', to: '/important', icon: Star },
    { label: 'Completed', to: '/completed', icon: CheckCircle2 },
    { label: 'Archived', to: '/archived', icon: Archive },
]

const Sidebar = ({
    className,
    onNavigate,
    collapsible = false,
    collapsed = false,
    onCollapsedChange,
    ...asideProps
}) => {
    const isCollapsed = collapsible && collapsed

    return (
        <aside
            className={cn(
                'flex h-full shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200',
                isCollapsed ? 'w-20' : 'w-64',
                className,
            )}
            {...asideProps}
        >
            <div className={cn('flex h-18 items-center border-b border-border', isCollapsed ? 'justify-center px-2' : 'gap-3 px-5')}>
                {isCollapsed ? (
                    <button className="grid size-11 place-items-center rounded-xl transition hover:bg-control-muted" type="button" aria-label="Expand sidebar" title="Expand sidebar" onClick={() => onCollapsedChange?.(false)}>
                        <img className="size-9" src={tasklyLogo} alt="" />
                    </button>
                ) : (
                    <>
                        <img className="size-9" src={tasklyLogo} alt="" />
                        <span className="min-w-0 flex-1 font-display text-xl font-bold text-foreground">Taskly</span>
                        {collapsible && (
                            <IconButton size="sm" aria-label="Minimize sidebar" title="Minimize sidebar" onClick={() => onCollapsedChange?.(true)}>
                                <PanelLeftClose className="size-4" />
                            </IconButton>
                        )}
                    </>
                )}
            </div>

            <nav className={cn('flex-1 space-y-1 py-5', isCollapsed ? 'px-2' : 'px-3')} aria-label="Main navigation">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            end={item.end}
                            title={isCollapsed ? item.label : undefined}
                            aria-label={isCollapsed ? item.label : undefined}
                            onClick={onNavigate}
                            className={({ isActive }) => cn(
                                'flex h-11 items-center rounded-lg text-sm font-semibold text-body transition-colors',
                                isCollapsed ? 'justify-center px-0' : 'gap-3 px-3',
                                'hover:bg-control-muted hover:text-foreground',
                                isActive && 'bg-primary/10 text-primary',
                            )}
                        >
                            <Icon className="size-4.5 shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
