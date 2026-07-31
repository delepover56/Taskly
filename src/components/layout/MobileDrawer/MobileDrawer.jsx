import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import IconButton from '@/components/ui/IconButton'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const MobileDrawer = ({ open, onClose }) => {
    const drawerRef = useRef(null)
    const backdropRef = useRef(null)
    const panelRef = useRef(null)
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!open) return undefined

        const previousOverflow = document.documentElement.style.overflow
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        document.documentElement.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.documentElement.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open, onClose])

    useGSAP(() => {
        if (!backdropRef.current || !panelRef.current) return

        if (prefersReducedMotion()) {
            gsap.set(backdropRef.current, { autoAlpha: open ? 1 : 0 })
            gsap.set(panelRef.current, { xPercent: open ? 0 : -100 })
            if (open) closeButtonRef.current?.focus()
            return
        }

        if (open) {
            gsap.timeline({ onComplete: () => closeButtonRef.current?.focus() })
                .to(backdropRef.current, { autoAlpha: 1, duration: 0.24, ease: 'power2.out' })
                .to(panelRef.current, { xPercent: 0, duration: 0.34, ease: 'power3.out' }, '<')
            return
        }

        gsap.timeline()
            .to(panelRef.current, { xPercent: -100, duration: 0.24, ease: 'power2.in' })
            .to(backdropRef.current, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, '<')
    }, { scope: drawerRef, dependencies: [open] })

    return (
        <div ref={drawerRef} className={`fixed inset-0 z-50 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} role="dialog" aria-modal="true" aria-label="Main navigation" aria-hidden={!open} inert={!open}>
            <button ref={backdropRef} className="invisible absolute inset-0 bg-slate-950/65 opacity-0 backdrop-blur-sm" type="button" aria-label="Close navigation" onClick={onClose} />
            <div ref={panelRef} className="relative z-10 h-full w-64 max-w-[85vw] -translate-x-full shadow-2xl">
                <Sidebar className="h-full" onNavigate={onClose} />
                <IconButton ref={closeButtonRef} className="absolute top-5 right-3 z-20 bg-control/85 shadow-card" size="sm" aria-label="Close navigation" title="Close navigation" onClick={onClose}>
                    <X className="size-4" />
                </IconButton>
            </div>
        </div>
    )
}

export default MobileDrawer