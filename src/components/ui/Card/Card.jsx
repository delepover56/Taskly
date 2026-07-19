import { cn } from '@/lib/cn'

const Card = ({ children, className, ...CardProps }) => {
    return (
        <div className={cn(
            'rounded-card border border-border bg-surface shadow-card backdrop-blur-lg',
            className,
        )}
            {...CardProps}>
            {children}

        </div>
    )
}

export default Card
