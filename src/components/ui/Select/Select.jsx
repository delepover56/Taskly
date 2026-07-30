import { Children, isValidElement, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const Select = ({ children, className, value, defaultValue, onChange, disabled = false, name, ...buttonProps }) => {
    const options = Children.toArray(children)
        .filter((child) => isValidElement(child) && child.type === 'option')
        .map((option) => ({ value: String(option.props.value ?? option.props.children), label: option.props.children, disabled: Boolean(option.props.disabled) }))
    const [internalValue, setInternalValue] = useState(() => String(defaultValue ?? options[0]?.value ?? ''))
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [menuPosition, setMenuPosition] = useState(null)
    const [portalTarget, setPortalTarget] = useState(null)
    const buttonRef = useRef(null)
    const menuRef = useRef(null)
    const selectId = useId()
    const selectedValue = String(value ?? internalValue)
    const selectedIndex = Math.max(0, options.findIndex((option) => option.value === selectedValue))
    const selectedOption = options[selectedIndex]

    const closeMenu = () => setIsOpen(false)
    const openMenu = () => {
        if (disabled || !buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const desiredHeight = Math.min(options.length * 40 + 8, 248)
        const spaceBelow = window.innerHeight - rect.bottom - 8
        const openAbove = spaceBelow < desiredHeight && rect.top > spaceBelow
        setMenuPosition({ left: rect.left, top: openAbove ? Math.max(8, rect.top - desiredHeight - 4) : rect.bottom + 4, width: rect.width, maxHeight: openAbove ? Math.min(desiredHeight, rect.top - 12) : Math.min(desiredHeight, spaceBelow) })
        setPortalTarget(buttonRef.current.closest('dialog') ?? document.body)
        setActiveIndex(selectedIndex)
        setIsOpen(true)
    }

    const selectOption = (option) => {
        if (option.disabled) return
        if (value === undefined) setInternalValue(option.value)
        onChange?.({ target: { value: option.value, name } })
        closeMenu()
        buttonRef.current?.focus()
    }

    const moveActive = (direction) => {
        let nextIndex = activeIndex
        do { nextIndex = (nextIndex + direction + options.length) % options.length } while (options[nextIndex]?.disabled && nextIndex !== activeIndex)
        setActiveIndex(nextIndex)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            if (!isOpen) openMenu()
            else moveActive(event.key === 'ArrowDown' ? 1 : -1)
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            if (isOpen) selectOption(options[activeIndex])
            else openMenu()
        } else if (event.key === 'Escape' && isOpen) {
            event.preventDefault()
            closeMenu()
        }
    }

    useGSAP(() => {
        if (!isOpen || !menuRef.current || prefersReducedMotion()) return
        gsap.fromTo(menuRef.current, { autoAlpha: 0, y: -5, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out', transformOrigin: 'top' })
    }, { dependencies: [isOpen] })

    useGSAP(() => {
        if (!isOpen) return
        const closeOutside = (event) => {
            if (!buttonRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) closeMenu()
        }
        const closeOnResize = () => closeMenu()
        const closeOnOutsideScroll = (event) => {
            if (!menuRef.current?.contains(event.target)) closeMenu()
        }
        document.addEventListener('pointerdown', closeOutside)
        window.addEventListener('resize', closeOnResize)
        window.addEventListener('scroll', closeOnOutsideScroll, true)
        return () => {
            document.removeEventListener('pointerdown', closeOutside)
            window.removeEventListener('resize', closeOnResize)
            window.removeEventListener('scroll', closeOnOutsideScroll, true)
        }
    }, { dependencies: [isOpen] })

    const menu = isOpen && portalTarget && menuPosition ? createPortal(
        <div ref={menuRef} id={`${selectId}-menu`} role="listbox" aria-activedescendant={`${selectId}-option-${activeIndex}`} className="fixed z-[100] overflow-y-auto rounded-lg border border-border bg-card p-1 shadow-card" style={menuPosition}>
            {options.map((option, index) => (
                <button id={`${selectId}-option-${index}`} key={option.value} className={cn('flex h-9 w-full items-center justify-between gap-3 rounded-md px-2.5 text-left text-[13px] text-body transition-colors', index === activeIndex && 'bg-control-muted text-foreground', option.value === selectedValue && 'font-semibold text-primary', option.disabled && 'cursor-not-allowed opacity-50')} type="button" role="option" aria-selected={option.value === selectedValue} disabled={option.disabled} onPointerMove={() => setActiveIndex(index)} onClick={() => selectOption(option)}>
                    <span className="truncate">{option.label}</span>
                    {option.value === selectedValue && <Check className="size-3.5 shrink-0" />}
                </button>
            ))}
        </div>, portalTarget,
    ) : null

    return (
        <span className="relative block w-full">
            <button ref={buttonRef} className={cn('flex h-[38px] w-full items-center justify-between gap-3 rounded-lg border border-border bg-control py-0 pl-2.5 pr-3 text-left text-[13px] text-foreground outline-none', 'transition-[border-color,box-shadow,background-color] duration-200', 'focus:border-primary focus:ring-3 focus:ring-primary/10', 'disabled:cursor-not-allowed disabled:opacity-50', 'aria-invalid:border-danger aria-invalid:focus:border-danger aria-invalid:focus:ring-danger/10', className)} type="button" role="combobox" aria-controls={isOpen ? `${selectId}-menu` : undefined} aria-expanded={isOpen} aria-haspopup="listbox" disabled={disabled} onClick={() => isOpen ? closeMenu() : openMenu()} onKeyDown={handleKeyDown} {...buttonProps}>
                <span className="truncate">{selectedOption?.label}</span>
                <ChevronDown className={cn('size-4 shrink-0 text-muted transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
            </button>
            {name && <input type="hidden" name={name} value={selectedValue} />}
            {menu}
        </span>
    )
}

export default Select
