import { useState } from 'react'
import { UserRound } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'

const ProfileMenu = ({
    avatarSrc,
    isAuthenticated =  false,
    themeData,
    onOpenProfile,
    onOpenLogin,
    onOpenSignUp,
    onOpenSettings,
    onToggleTheme,
    onLogout
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const isDarkMode = themeData === 'dark'

    const toggleMenu = () => {
        setIsOpen((currentValue) => !currentValue)
    }

    return (
        <div className="relative">
            <IconButton
                className="overflow-hidden rounded-full bg-control-muted text-muted hover:text-foreground"
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={toggleMenu}
            >
                {avatarSrc ? (
                    <img
                        className="size-full object-cover"
                        src={avatarSrc}
                        alt=""
                    />
                ) : (
                    <UserRound className="size-[18px]" />
                )}
            </IconButton>
        </div>
    )
}

export default ProfileMenu