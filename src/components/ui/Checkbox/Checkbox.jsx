import { cn } from '@/lib/cn'

const Checkbox = ({ className, ...CheckboxProps }) => {
    return (
        <input
            className={cn(
                'size-[18px] shrink-0 cursor-pointer rounded border-border bg-control accent-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...CheckboxProps}
            type="checkbox"
        />
    )
}

export default Checkbox
