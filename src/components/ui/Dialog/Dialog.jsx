import { useId, useRef } from 'react'
import { X } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const Dialog = ({
    open,
    onClose,
    onAfterClose,
    title,
    description,
    children,
    footer,
    className,
    ...DialogProps
}) => {
    const dialogRef = useRef(null)
    const titleId = useId()
    const descriptionId = useId()

    useGSAP(() => {
        const dialog = dialogRef.current
        const panel = dialog?.firstElementChild

        if (!dialog || !panel) return

        if (open) {
            if (prefersReducedMotion()) {
                if (!dialog.open) dialog.showModal()
                gsap.set([dialog, panel], { autoAlpha: 1, y: 0, scale: 1 })
                return
            }

            gsap.set(dialog, { autoAlpha: 0 })
            gsap.set(panel, { autoAlpha: 0, y: 24, scale: 0.94 })
            if (!dialog.open) dialog.showModal()

            gsap.timeline({ delay: 0.03 })
                .to(dialog, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' })
                .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, ease: 'back.out(1.25)' }, '<')
            return
        }

        if (!open && dialog.open) {
            const finishClose = () => {
                dialog.close()
                onAfterClose?.()
            }

            if (prefersReducedMotion()) {
                finishClose()
                return
            }

            gsap.timeline({ onComplete: finishClose })
                .to(panel, { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.24, ease: 'power2.in' })
                .to(dialog, { autoAlpha: 0, duration: 0.22, ease: 'power2.in' }, '<')
        }
    }, { scope: dialogRef, dependencies: [open] })

    const handleCancel = (event) => {
        event.preventDefault()
        onClose?.()
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose?.()
        }
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            className="fixed inset-0 m-auto max-h-none w-[calc(100%-2rem)] max-w-lg overflow-visible border-0 bg-transparent p-0 text-foreground backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
            onCancel={handleCancel}
            onClick={handleBackdropClick}
            {...DialogProps}
        >
            <div
                className={cn(
                    'flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-card border border-border bg-card shadow-card',
                    className,
                )}
            >
                <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                    <div>
                        <h2
                            id={titleId}
                            className="font-display text-lg font-bold text-foreground"
                        >
                            {title}
                        </h2>

                        {description && (
                            <p id={descriptionId} className="mt-1 text-sm text-muted">
                                {description}
                            </p>
                        )}
                    </div>

                    <IconButton
                        aria-label="Close dialog"
                        size="sm"
                        type="button"
                        onClick={onClose}
                    >
                        <X className="size-4" />
                    </IconButton>
                </header>

                <div className="overflow-y-auto px-5 py-4">
                    {children}
                </div>

                {footer && (
                    <footer className="flex justify-end gap-3 border-t border-border px-5 py-4">
                        {footer}
                    </footer>
                )}
            </div>
        </dialog>
    )
}

export default Dialog
