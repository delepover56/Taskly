import { useEffect, useRef, useState } from 'react'
import { LogIn, LogOut, Moon, Settings, Sun, UserPlus, UserRound } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const ProfileMenu = ({ avatarSrc, userName, userUsername, userEmail, isAuthenticated = false, themeData, onOpenProfile, onOpenLogin, onOpenSignUp, onOpenSettings, onToggleTheme, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const panelRef = useRef(null)
    const isDarkMode = themeData === 'dark'
    const handleMenuAction = (callback) => {
        callback?.()
        setIsOpen(false)
    }
    const itemClassName = cn('flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold text-body', 'transition-colors hover:bg-control-muted hover:text-foreground')

    useEffect(() => {
        if (!isOpen) return

        const closeOutside = (event) => {
            if (!menuRef.current?.contains(event.target)) setIsOpen(false)
        }
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setIsOpen(false)
        }

        document.addEventListener('pointerdown', closeOutside)
        document.addEventListener('keydown', closeOnEscape)
        return () => {
            document.removeEventListener('pointerdown', closeOutside)
            document.removeEventListener('keydown', closeOnEscape)
        }
    }, [isOpen])

    useGSAP(() => {
        const panel = panelRef.current
        if (!panel) return

        if (prefersReducedMotion()) {
            gsap.set(panel, { autoAlpha: isOpen ? 1 : 0, y: 0, scale: 1 })
            return
        }

        gsap.to(panel, {
            autoAlpha: isOpen ? 1 : 0,
            y: isOpen ? 0 : -6,
            scale: isOpen ? 1 : 0.98,
            duration: isOpen ? 0.22 : 0.16,
            ease: isOpen ? 'power2.out' : 'power2.in',
            transformOrigin: 'top right',
            overwrite: true,
        })
    }, { scope: menuRef, dependencies: [isOpen] })

    return (
        <div ref={menuRef} className="relative">
            <IconButton className="overflow-hidden rounded-full bg-control-muted text-muted hover:text-foreground" aria-label="Open profile menu" aria-haspopup="menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
                {avatarSrc ? <img className="size-full object-cover" src={avatarSrc} alt="" /> : <UserRound className="size-[18px]" />}
            </IconButton>
            <div ref={panelRef} className="invisible absolute top-full right-0 z-40 mt-2 w-56 rounded-xl border border-border bg-card p-2 opacity-0 shadow-card" role="menu" aria-hidden={!isOpen} inert={!isOpen}>
                        <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
                            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-control-muted text-muted">
                                {avatarSrc ? <img className="size-full object-cover" src={avatarSrc} alt="" /> : <UserRound className="size-5" />}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-foreground">{isAuthenticated ? userName : 'Taskly account'}</p>
                                {isAuthenticated && <p className="mt-0.5 truncate text-[11px] font-semibold text-primary">@{userUsername}</p>}
                                <p className="mt-0.5 truncate text-[11px] text-muted">{isAuthenticated ? userEmail : 'Log in or create an account'}</p>
                            </div>
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
        </div>
    )
}

export default ProfileMenu
