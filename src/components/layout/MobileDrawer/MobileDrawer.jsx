import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import IconButton from '@/components/ui/IconButton'

const MobileDrawer = ({ open, onClose }) => {
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!open) return undefined

        const previousOverflow = document.documentElement.style.overflow
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        document.documentElement.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)
        const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 320)

        return () => {
            document.documentElement.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
            window.clearTimeout(focusTimer)
        }
    }, [open, onClose])

    return (
        <div className={`fixed inset-0 z-50 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} role="dialog" aria-modal="true" aria-label="Main navigation" aria-hidden={!open} inert={!open}>
            <button
                className={`absolute inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
            />
            <div
                className="relative z-10 h-full w-64 max-w-[85vw] shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none"
                style={{ transform: open ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)' }}
            >
                <Sidebar className="h-full" onNavigate={onClose} />
                <IconButton ref={closeButtonRef} className="absolute top-5 right-3 z-20 bg-control/85 shadow-card" size="sm" aria-label="Close navigation" title="Close navigation" onClick={onClose}>
                    <X className="size-4" />
                </IconButton>
            </div>
        </div>
    )
}

export default MobileDrawer
