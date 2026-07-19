import { cn } from '@/lib/cn'

const Card = ({ children, className, ...props }) => {
    return (
        <div className={cn(
            'rounded-card border border-border bg-surface shadow-card backdrop-blur-lg',
            className,
        )}
            {...props}>
            {children}

        </div>
    )
}

export default Card
