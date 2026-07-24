import { cn } from '@/lib/cn'

const Skeleton = ({ className, ...SkeletonProps }) => {
    return (
        <div
            aria-hidden="true"
            className={cn('animate-pulse rounded-lg bg-control-muted', className)}
            {...SkeletonProps}
        />
    )
}

export default Skeleton
