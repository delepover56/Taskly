import { useEffect } from 'react'
import { X } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import Sidebar from '@/components/layout/Sidebar'

const MobileDrawer = ({
    open,
    onClose,
    onOpenSettings,
    onToggleTheme,
}) => {
    useEffect(() => {
        if (!open) return

        const previousOverflow = document.body.style.overflow

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open, onClose])

    if (!open) {
        return null
    }

    return (
        <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
        >
            <button
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
            />

            <div className="relative h-full w-[min(20rem,85vw)] shadow-2xl">
                <IconButton
                    className="absolute top-4 right-4 z-10"
                    aria-label="Close navigation"
                    onClick={onClose}
                >
                    <X className="size-5" />
                </IconButton>

                <Sidebar
                    className="w-full border-r-0"
                    onNavigate={onClose}
                    onOpenSettings={onOpenSettings}
                    onToggleTheme={onToggleTheme}
                />
            </div>
        </div>
    )
}

export default MobileDrawer