import { cn } from '@/lib/cn'

const PageContainer = ({
    children,
    className,
    ...PageContainerProps
}) => {
  return (
<div
    className={cn(
        'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8',
        className,
    )}
    {...PageContainerProps}
>
    {children}
</div>
  )
}

export default PageContainer
