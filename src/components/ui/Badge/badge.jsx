import { cn } from "@/lib/cn"

const varients = {
    neutral: 'bg-control-muted text-body',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
}

const Badge = ({
    children,
    varient = "neutral",
    className,
    ...BadgeProps
}) => {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
            varients[varient],
            className,
        )}
            {...BadgeProps}
        >
            {children}
        </span>
    )
}

export default Badge