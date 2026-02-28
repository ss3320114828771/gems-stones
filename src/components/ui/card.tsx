'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean | 'scale' | 'glow' | 'lift' | 'border'
  border?: boolean
  fullWidth?: boolean
  role?: string
  ariaLabel?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
  divider?: boolean
}

interface CardBodyProps {
  children: ReactNode
  className?: string
  scrollable?: boolean
  maxHeight?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
  divider?: boolean
  align?: 'left' | 'center' | 'right' | 'between'
}

interface CardImageProps {
  src: string
  alt: string
  className?: string
  height?: string
  overlay?: boolean
  overlayContent?: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right' | 'full'
}

interface CardBadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  className = '',
  onClick,
  href,
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  shadow = 'md',
  hover = false,
  border = true,
  fullWidth = false,
  role = 'article',
  ariaLabel
}: CardProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'elevated':
        return 'bg-gradient-to-br from-white/15 to-white/5'
      case 'outlined':
        return 'bg-transparent border-2 border-white/30'
      case 'glass':
        return 'bg-white/10 backdrop-blur-md'
      case 'gradient':
        return 'bg-gradient-to-br from-purple-600/20 to-pink-600/20'
      default:
        return 'bg-white/10'
    }
  }

  const getPaddingClasses = () => {
    switch(padding) {
      case 'none': return 'p-0'
      case 'sm': return 'p-3'
      case 'md': return 'p-4 md:p-5'
      case 'lg': return 'p-5 md:p-6'
      case 'xl': return 'p-6 md:p-8'
      default: return 'p-4 md:p-5'
    }
  }

  const getRadiusClasses = () => {
    switch(radius) {
      case 'none': return 'rounded-none'
      case 'sm': return 'rounded-lg'
      case 'md': return 'rounded-xl'
      case 'lg': return 'rounded-2xl'
      case 'xl': return 'rounded-3xl'
      case 'full': return 'rounded-full'
      default: return 'rounded-2xl'
    }
  }

  const getShadowClasses = () => {
    switch(shadow) {
      case 'none': return ''
      case 'sm': return 'shadow-md'
      case 'md': return 'shadow-xl'
      case 'lg': return 'shadow-2xl'
      case 'xl': return 'shadow-2xl shadow-black/50'
      default: return 'shadow-xl'
    }
  }

  const getHoverClasses = () => {
    if (!hover) return ''
    
    switch(hover) {
      case 'scale':
        return 'hover:scale-105 transition-transform duration-300 cursor-pointer'
      case 'glow':
        return 'hover:shadow-[0_0_30px_rgba(255,105,180,0.5)] transition-shadow duration-300 cursor-pointer'
      case 'lift':
        return 'hover:-translate-y-2 transition-transform duration-300 cursor-pointer'
      case 'border':
        return 'hover:border-pink-500 transition-colors duration-300 cursor-pointer'
      default:
        return 'hover:shadow-xl transition-all duration-300 cursor-pointer'
    }
  }

  const baseClasses = `
    ${getVariantClasses()}
    ${getPaddingClasses()}
    ${getRadiusClasses()}
    ${getShadowClasses()}
    ${getHoverClasses()}
    ${border ? 'border-2 border-white/20' : ''}
    ${fullWidth ? 'w-full' : ''}
    transition-all duration-300
    ${className}
  `

  const content = (
    <div 
      className={baseClasses}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

export function CardHeader({ 
  children, 
  className = '',
  title,
  subtitle,
  icon,
  action,
  divider = true
}: CardHeaderProps) {
  return (
    <>
      <div className={`flex items-start justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-2xl text-white/80">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-white/60 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
        {children}
      </div>
      {divider && (
        <div className="border-b border-white/10 my-3" />
      )}
    </>
  )
}

export function CardBody({ 
  children, 
  className = '',
  scrollable = false,
  maxHeight
}: CardBodyProps) {
  return (
    <div 
      className={`
        ${scrollable ? 'overflow-y-auto custom-scrollbar' : ''}
        ${className}
      `}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {children}
    </div>
  )
}

export function CardFooter({ 
  children, 
  className = '',
  divider = true,
  align = 'left'
}: CardFooterProps) {
  const getAlignClasses = () => {
    switch(align) {
      case 'center': return 'justify-center'
      case 'right': return 'justify-end'
      case 'between': return 'justify-between'
      default: return 'justify-start'
    }
  }

  return (
    <>
      {divider && (
        <div className="border-t border-white/10 my-3" />
      )}
      <div className={`flex items-center ${getAlignClasses()} gap-3 ${className}`}>
        {children}
      </div>
    </>
  )
}

export function CardImage({ 
  src, 
  alt, 
  className = '',
  height = 'h-48',
  overlay = false,
  overlayContent,
  position = 'top'
}: CardImageProps) {
  const getPositionClasses = () => {
    switch(position) {
      case 'top': return 'rounded-t-2xl'
      case 'bottom': return 'rounded-b-2xl'
      case 'left': return 'rounded-l-2xl'
      case 'right': return 'rounded-r-2xl'
      case 'full': return 'rounded-2xl'
      default: return 'rounded-t-2xl'
    }
  }

  return (
    <div className={`relative ${height} ${getPositionClasses()} overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {overlayContent && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {overlayContent}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function CardBadge({ 
  children, 
  variant = 'default',
  position = 'top-right',
  size = 'md'
}: CardBadgeProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'primary':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-pink-500'
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      default:
        return 'bg-white/20 backdrop-blur-sm'
    }
  }

  const getPositionClasses = () => {
    switch(position) {
      case 'top-left':
        return 'top-2 left-2'
      case 'top-right':
        return 'top-2 right-2'
      case 'bottom-left':
        return 'bottom-2 left-2'
      case 'bottom-right':
        return 'bottom-2 right-2'
      default:
        return 'top-2 right-2'
    }
  }

  const getSizeClasses = () => {
    switch(size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs'
      case 'md':
        return 'px-3 py-1 text-sm'
      case 'lg':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1 text-sm'
    }
  }

  return (
    <span className={`
      absolute ${getPositionClasses()}
      ${getVariantClasses()}
      ${getSizeClasses()}
      text-white font-medium rounded-full
      shadow-lg z-10
    `}>
      {children}
    </span>
  )
}

export function CardGroup({
  children,
  columns = 3,
  gap = 'md',
  className = ''
}: {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 5
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const getColumnsClass = () => {
    switch(columns) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 sm:grid-cols-2'
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 5: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  const getGapClass = () => {
    switch(gap) {
      case 'sm': return 'gap-3'
      case 'md': return 'gap-6'
      case 'lg': return 'gap-8'
      default: return 'gap-6'
    }
  }

  return (
    <div className={`grid ${getColumnsClass()} ${getGapClass()} ${className}`}>
      {children}
    </div>
  )
}

export function CardDivider({
  className = '',
  spacing = 'md'
}: {
  className?: string
  spacing?: 'sm' | 'md' | 'lg'
}) {
  const getSpacingClass = () => {
    switch(spacing) {
      case 'sm': return 'my-2'
      case 'md': return 'my-3'
      case 'lg': return 'my-4'
      default: return 'my-3'
    }
  }

  return (
    <div className={`border-t border-white/10 ${getSpacingClass()} ${className}`} />
  )
}

// Add custom scrollbar styles
const styles = `
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