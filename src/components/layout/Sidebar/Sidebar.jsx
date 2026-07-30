import {
    Archive,
    CalendarDays,
    CheckCircle2,
    LayoutDashboard,
    Star,
    Sun,
} from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'
import tasklyLogo from '@/assets/logos/Taskly-Logo.svg'

const navItems = [
    {
        label: "Dashboard",
        to: "/",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: "Today",
        to: "/today",
        icon: Sun,
    },
    {
        label: "Upcoming",
        to: "/upcoming",
        icon: CalendarDays
    },
    {
        label: "Important",
        to: "/important",
        icon: Star,
    },
    {
        label: "Completed",
        to: "/completed",
        icon: CheckCircle2,
    },
    {
        label: "Archived",
        to: "/archived",
        icon: Archive,
    }
]

const Sidebar = ({
    className,
    onNavigate,
    ...asideProps
}) => {
    return (
        <aside
            className={cn(
                'flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface',
                className,
            )}
            {...asideProps}
        >
            <div className="flex h-18 items-center gap-3 border-b border-border px-5">
                <img
                    className="size-9"
                    src={tasklyLogo}
                    alt=""
                />

                <span className="font-display text-xl font-bold text-foreground">
                    Taskly
                </span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Main navigation">
                {
                    navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.label}
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
                                <Icon className="size-4.5 shrink-0" />
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })
                }
            </nav>
        </aside>
    )
}

export default Sidebar
