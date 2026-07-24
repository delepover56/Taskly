import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const sizes = {
    sm: 'size-8',
    md: 'size-[38px]',
    lg: 'size-11',
}


const IconButton = ({
    children,
    size = 'md',
    variant = 'ghost',
    className,
    ...IconButtonProps
}) => {
    return (
        <Button
            variant={variant}
            className={cn(
                'shrink-0 p-0',
                sizes[size],
                className,
            )}
            {...IconButtonProps}
        >
            {children}
        </Button>
    )
}

export default IconButton
