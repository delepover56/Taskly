import PageContainer from '@/components/layout/PageContainer'
import IconButton from '@/components/ui/IconButton'
import SearchField from '@/components/ui/SearchField'
import Button from '@/components/ui/Button'
import { Menu, Moon, Sun, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

const Topbar = ({
    className,
    searchData,
    onSearchChange,
    onMenuOpen,
    themeData,
    onToggleTheme,
    onAddTask,
    ...topbarProps
}) => {

    const isDarkMode = themeData === "dark"

    return (
        <header
            className={cn(
                'h-18 border-b border-border bg-surface',
                className
            )}
            {...topbarProps}
        >
            <PageContainer className='flex h-full items-center gap-3 py-0'>
                <IconButton
                    className="lg:hidden"
                    aria-label="Open Navigation"
                    onClick={onMenuOpen}
                >
                    <Menu className="size-5" />
                </IconButton>

                <div className="hidden w-full max-w-sm sm:block">
                    <SearchField
                        aria-label="Search all tasks"
                        placeholder="Search all tasks"
                        value={searchData}
                        onChange={onSearchChange}
                    />
                </div>

                <div className='ml-auto flex items-center gap-2'>
                    <IconButton
                        onClick={onToggleTheme}
                        aria-label={
                            isDarkMode
                                ? 'Switch to light mode'
                                : 'Switch to dark mode'
                        }
                    >
                        {
                            isDarkMode
                                ? <Sun className="size-4.5" />
                                : <Moon className="size-4.5" />
                        }
                    </IconButton>
                    <Button onClick={onAddTask}>
                        <Plus className="size-4" />
                        <span className="hidden sm:inline">
                            New Task
                        </span>
                    </Button>
                </div>

            </PageContainer>
        </header>
    )
}

export default Topbar
