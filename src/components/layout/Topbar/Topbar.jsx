import { Menu, Plus } from 'lucide-react'
import NotificationMenu from '@/components/layout/NotificationMenu'
import PageContainer from '@/components/layout/PageContainer'
import ProfileMenu from '@/components/layout/ProfileMenu'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'

const Topbar = ({ className, onMenuOpen, themeData, onToggleTheme, onAddTask, onOpenSettings, user, tasks, onOpenProfile, onOpenLogin, onOpenSignUp, onLogout, ...topbarProps }) => {
    return (
        <header className={cn('sticky top-0 z-20 h-18 border-b border-border bg-surface/95 backdrop-blur-xl', className)} {...topbarProps}>
            <PageContainer className="flex h-full items-center gap-3 py-0">
                <IconButton className="lg:hidden" aria-label="Open navigation" onClick={onMenuOpen}><Menu className="size-5" /></IconButton>
                <div className="ml-auto flex items-center gap-2">
                    <NotificationMenu tasks={tasks} />
                    <Button className="hidden lg:inline-flex" onClick={onAddTask}><Plus className="size-4" />New Task</Button>
                    <ProfileMenu avatarSrc={user?.avatarSrc} userName={user?.name} userUsername={user?.username} userEmail={user?.email} isAuthenticated={Boolean(user)} themeData={themeData} onToggleTheme={onToggleTheme} onOpenSettings={onOpenSettings} onOpenProfile={onOpenProfile} onOpenLogin={onOpenLogin} onOpenSignUp={onOpenSignUp} onLogout={onLogout} />
                </div>
            </PageContainer>
        </header>
    )
}

export default Topbar
