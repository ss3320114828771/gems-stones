'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import Link from 'next/link'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right' | 'center'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  offset?: number
  closeOnClick?: boolean
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  triggerClassName?: string
  contentClassName?: string
  disabled?: boolean
  hoverToOpen?: boolean
  delay?: number
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  icon?: ReactNode
  shortcut?: string
  disabled?: boolean
  divider?: boolean
  active?: boolean
  className?: string
  as?: 'button' | 'a' | 'div'
  target?: string
  rel?: string
}

interface DropdownHeaderProps {
  children: ReactNode
  className?: string
}

interface DropdownDividerProps {
  className?: string
}

interface DropdownGroupProps {
  children: ReactNode
  label?: string
  className?: string
}

export default function Dropdown({
  trigger,
  children,
  align = 'left',
  width = 'md',
  offset = 8,
  closeOnClick = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  open: controlledOpen,
  onOpenChange,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  disabled = false,
  hoverToOpen = false,
  delay = 200
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : isOpen

  const getWidthClass = () => {
    switch(width) {
      case 'sm': return 'w-48'
      case 'md': return 'w-56'
      case 'lg': return 'w-64'
      case 'xl': return 'w-72'
      case 'full': return 'w-full'
      default: return 'w-56'
    }
  }

  const getAlignmentClass = () => {
    switch(align) {
      case 'left': return 'left-0'
      case 'right': return 'right-0'
      case 'center': return 'left-1/2 -translate-x-1/2'
      default: return 'left-0'
    }
  }

  const handleOpen = () => {
    if (disabled) return
    if (isControlled) {
      onOpenChange?.(true)
    } else {
      setIsOpen(true)
    }
  }

  const handleClose = () => {
    if (disabled) return
    if (isControlled) {
      onOpenChange?.(false)
    } else {
      setIsOpen(false)
    }
  }

  const handleToggle = () => {
    if (disabled) return
    if (open) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  const handleMouseEnter = () => {
    if (!hoverToOpen || disabled) return
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setHoverTimeout(setTimeout(handleOpen, delay))
  }

  const handleMouseLeave = () => {
    if (!hoverToOpen || disabled) return
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setHoverTimeout(setTimeout(handleClose, delay))
  }

  // Handle click outside
  useEffect(() => {
    if (!closeOnOutsideClick || !open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, closeOnOutsideClick])

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !open) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, closeOnEscape])

  // Handle scroll to maintain position
  useEffect(() => {
    if (!open) return

    const updatePosition = () => {
      if (dropdownRef.current && triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        dropdownRef.current.style.top = `${triggerRect.bottom + offset}px`
        
        if (align === 'left') {
          dropdownRef.current.style.left = `${triggerRect.left}px`
        } else if (align === 'right') {
          dropdownRef.current.style.left = `${triggerRect.right - dropdownRef.current.offsetWidth}px`
        }
      }
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open, align, offset])

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={handleToggle}
        className={`cursor-pointer ${triggerClassName} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {trigger}
      </div>

      {/* Dropdown Content */}
      {open && (
        <div
          ref={dropdownRef}
          className={`
            fixed z-50 mt-1
            ${getWidthClass()}
            ${getAlignmentClass()}
            bg-gradient-to-b from-gray-900 to-purple-900
            backdrop-blur-xl
            rounded-xl
            border-2 border-white/20
            shadow-2xl
            overflow-hidden
            animate-in fade-in slide-in-from-top-2
            ${contentClassName}
          `}
          style={{ top: '100%' }}
        >
          <div className="py-1 max-h-96 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export function DropdownItem({
  children,
  onClick,
  href,
  icon,
  shortcut,
  disabled = false,
  divider = false,
  active = false,
  className = '',
  as = 'button',
  target,
  rel
}: DropdownItemProps) {
  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  const baseClasses = `
    flex items-center gap-3 w-full px-4 py-2.5
    text-sm transition-all duration-200
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/10'}
    ${active ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300' : 'text-white/80 hover:text-white'}
    ${divider ? 'border-b border-white/10' : ''}
    ${className}
  `

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={handleClick}
        target={target}
        rel={rel}
        aria-disabled={disabled}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span className="flex-1 text-left">{children}</span>
        {shortcut && <span className="text-xs text-white/40">{shortcut}</span>}
      </Link>
    )
  }

  const Component = as as any

  return (
    <Component
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="text-xs text-white/40">{shortcut}</span>}
    </Component>
  )
}

export function DropdownHeader({
  children,
  className = ''
}: DropdownHeaderProps) {
  return (
    <div className={`px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider ${className}`}>
      {children}
    </div>
  )
}

export function DropdownDivider({
  className = ''
}: DropdownDividerProps) {
  return (
    <div className={`my-1 border-t border-white/10 ${className}`} />
  )
}

export function DropdownGroup({
  children,
  label,
  className = ''
}: DropdownGroupProps) {
  return (
    <div className={className}>
      {label && <DropdownHeader>{label}</DropdownHeader>}
      {children}
    </div>
  )
}

// Compound component pattern
Dropdown.Item = DropdownItem
Dropdown.Header = DropdownHeader
Dropdown.Divider = DropdownDivider
Dropdown.Group = DropdownGroup

// Add animations
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fadeIn 0.2s ease-out;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

// Add styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}