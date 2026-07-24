import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'

const Dialog = ({
    open,
    onClose,
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

    useEffect(() => {
        const dialog = dialogRef.current

        if (!dialog) return

        if (open && !dialog.open) {
            dialog.showModal()
        }

        if (!open && dialog.open) {
            dialog.close()
        }
    }, [open])

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
            className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg border-0 bg-transparent p-0 text-foreground backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
            onCancel={handleCancel}
            onClick={handleBackdropClick}
            {...DialogProps}
        >
            <div
                className={cn(
                    'overflow-hidden rounded-card border border-border bg-card shadow-card',
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

                <div className="px-5 py-4">
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
