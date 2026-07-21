import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'

const SearchField = ({
    type = 'search',
    className,
    placeholder = 'Search Tasks',
    ...searchProps
}) => {
    return (
        <div
            className={cn(
                'flex h-9.5 items-center gap-2 rounded-lg border border-border bg-control px-2.5 text-foreground',
                'transition-[border-color,box-shadow,background-color] duration-200',
                'focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10',
                className,
            )}
        >
            <Search className="size-4 shrink-0 text-muted" />

            <input
                className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted"
                type={type}
                placeholder={placeholder}
                {...searchProps}
            />
        </div>
    )
}

export default SearchField