import { useState } from 'react'
import { LogIn, LogOut, Moon, Settings, Sun, UserPlus, UserRound } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'

const ProfileMenu = ({ avatarSrc, isAuthenticated = false, themeData, onOpenProfile, onOpenLogin, onOpenSignUp, onOpenSettings, onToggleTheme, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false)
    const isDarkMode = themeData === 'dark'
    const handleMenuAction = (callback) => {
        callback?.()
        setIsOpen(false)
    }
    const itemClassName = cn('flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold text-body', 'transition-colors hover:bg-control-muted hover:text-foreground')

    return (
        <div className="relative">
            <IconButton className="overflow-hidden rounded-full bg-control-muted text-muted hover:text-foreground" aria-label="Open profile menu" aria-haspopup="menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
                {avatarSrc ? <img className="size-full object-cover" src={avatarSrc} alt="" /> : <UserRound className="size-[18px]" />}
            </IconButton>
            {isOpen && (
                <>
                    <button className="fixed inset-0 z-30 cursor-default" type="button" aria-label="Close profile menu" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 z-40 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-card" role="menu">
                        <div className="border-b border-border px-3 py-2.5">
                            <p className="text-xs font-semibold text-foreground">{isAuthenticated ? 'Taha Ahmed' : 'Welcome to Taskly'}</p>
                            <p className="mt-0.5 text-[11px] text-muted">{isAuthenticated ? 'taha@example.com' : 'Your focused workspace'}</p>
                        </div>
                        <div className="py-1">
                            {isAuthenticated ? (
                                <button className={itemClassName} type="button" role="menuitem" onClick={() => handleMenuAction(onOpenProfile)}><UserRound className="size-4" /> Profile</button>
                            ) : (
                                <>
                                    <button className={itemClassName} type="button" role="menuitem" onClick={() => handleMenuAction(onOpenLogin)}><LogIn className="size-4" /> Log in</button>
                                    <button className={itemClassName} type="button" role="menuitem" onClick={() => handleMenuAction(onOpenSignUp)}><UserPlus className="size-4" /> Sign up</button>
                                </>
                            )}
                            <button className={itemClassName} type="button" role="menuitem" onClick={() => handleMenuAction(onOpenSettings)}><Settings className="size-4" /> Settings</button>
                            <button className={cn(itemClassName, 'justify-between')} type="button" role="menuitem" onClick={() => handleMenuAction(onToggleTheme)}>
                                <span>Theme</span>{isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                            </button>
                        </div>
                        {isAuthenticated && <button className={cn(itemClassName, 'border-t border-border text-danger')} type="button" role="menuitem" onClick={() => handleMenuAction(onLogout)}><LogOut className="size-4" /> Log out</button>}
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfileMenu
