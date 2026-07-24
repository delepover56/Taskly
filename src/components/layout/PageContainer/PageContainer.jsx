import { cn } from '@/lib/cn'

const PageContainer = ({
    children,
    className,
    ...ContainerProps
}) => {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8',
                className,
            )}
            {...ContainerProps}
        >
            {children}
        </div>
    )
}

export default PageContainer
