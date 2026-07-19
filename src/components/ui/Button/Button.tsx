import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-linear-to-br from-primary to-primary-strong text-white shadow-primary hover:-translate-y-px hover:shadow-primary-hover',
  secondary:
    'bg-control-muted text-body hover:text-foreground',
  ghost:
    'bg-transparent text-body hover:bg-control-muted hover:text-foreground',
  danger:
    'bg-danger text-white hover:bg-danger-strong',
}

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-[38px] px-3.5 text-[13px]',
  lg: 'h-11 px-5 text-sm',
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...ButtonProps
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-[transform,box-shadow,background-color,color] duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...ButtonProps}
    >
      {children}
    </button>
  )
}

export default Button