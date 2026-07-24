import {
    Archive,
    CalendarDays,
    CheckCircle2,
    LayoutDashboard,
    Moon,
    Settings,
    Star,
    Sun,
} from 'lucide-react';

import { NavLink } from "react-router"
import tasklyLogo from '@/assets/logos/Taskly-Logo.svg'
import { cn } from "@/lib/cn"

const navItems = [
    {
        label: "Dashboard",
        to: "/",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: 'Today',
        to: '/today',
        icon: Sun,
    },
    {
        label: 'Upcoming',
        to: '/upcoming',
        icon: CalendarDays,
    },
    {
        label: 'Important',
        to: '/important',
        icon: Star,
    },
    {
        label: 'Completed',
        to: '/completed',
        icon: CheckCircle2,
    },
    {
        label: 'Archived',
        to: '/archived',
        icon: Archive,
    },
]

const Sidebar = ({
    className,
    onNavigate,
    onOpenSettings,
    onToggleTheme,
    ...sidebarProps
}) => {
    return (
        <aside
            className={cn(
                'flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface',
                className,
            )}
            {...sidebarProps}
        >
            <div className="flex h-18 items-center gap-3 border-b border-border px-5">
                <img
                    className="size-9"
                    src={tasklyLogo}
                    alt="Taskly Logo"
                />
                <span className="font-display text-xl font-bold text-foreground">
                    Taskly
                </span>
            </div>

            <nav
                className="flex-1 space-y-1 px-3 py-5"
                aria-label="Main navigation"
            >
                {navItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                cn(
                                    'flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-body transition-colors',
                                    'hover:bg-control-muted hover:text-foreground',
                                    isActive &&
                                        'bg-primary/10 text-primary',
                                )
                            }
                        >
                            <Icon className="size-[18px] shrink-0" />
                            <span>{item.label}</span>
                        </NavLink>
                    )
                })}
            </nav>

            <div className="space-y-1 border-t border-border p-3">
                <button
                    className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-body hover:bg-control-muted hover:text-foreground"
                    type="button"
                    onClick={onOpenSettings}
                >
                    <Settings className="size-[18px]" />
                    Settings
                </button>

                <button
                    className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-body hover:bg-control-muted hover:text-foreground"
                    type="button"
                    onClick={onToggleTheme}
                >
                    <Moon className="size-[18px]" />
                    Dark mode
                </button>
            </div>
        </aside>
    )
}

export default Sidebar