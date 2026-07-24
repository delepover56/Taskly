import { cn } from '@/lib/cn'

const Textarea = ({ className, ...TextareaProps }) => {
    return (
        <textarea
            className={cn(
                'min-h-24 w-full resize-y rounded-lg border border-border bg-control px-2.5 py-2 text-[13px] text-foreground outline-none',
                'placeholder:text-muted',
                'transition-[border-color,box-shadow,background-color] duration-200',
                'focus:border-primary focus:ring-3 focus:ring-primary/10',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'aria-invalid:border-danger aria-invalid:focus:border-danger aria-invalid:focus:ring-danger/10',
                className,
            )}
            {...TextareaProps}
        />
    )
}

export default Textarea
