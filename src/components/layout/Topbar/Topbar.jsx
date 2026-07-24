import { Bell, Menu, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import SearchField from '@/components/ui/SearchField'
import PageContainer from '@/components/layout/PageContainer'
import { cn } from '@/lib/cn'

const Topbar = ({
    className,
    searchValue,
    onSearchChange,
    onMenuOpen,
    onAddTask,
    ...TopbarProps
}) => {
    return (
        <header
            className={cn(
                'h-18 border-b border-border bg-surface',
                className,
            )}
            {...TopbarProps}
        >
            <PageContainer className="flex h-full items-center gap-3 py-0">
                <IconButton
                    className="lg:hidden"
                    aria-label="Open navigation"
                    onClick={onMenuOpen}
                >
                    <Menu className="size-5" />
                </IconButton>

                <div className="hidden w-full max-w-sm sm:block">
                    <SearchField
                        aria-label="Search all tasks"
                        placeholder="Search all tasks"
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <IconButton aria-label="Notifications">
                        <Bell className="size-[18px]" />
                    </IconButton>

                    <Button onClick={onAddTask}>
                        <Plus className="size-4" />

                        <span className="hidden sm:inline">
                            New task
                        </span>
                    </Button>
                </div>
            </PageContainer>
        </header>
    )
}

export default Topbar