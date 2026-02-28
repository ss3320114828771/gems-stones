'use client'

import { useState, useEffect, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  showOverlay?: boolean
  overlayBlur?: boolean
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  duration?: number
  className?: string
  overlayClassName?: string
  contentClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  onOpen?: () => void
  onCloseComplete?: () => void
  preventScroll?: boolean
  destroyOnClose?: boolean
}

interface ModalHeaderProps {
  children?: ReactNode
  title?: string
  subtitle?: string
  showClose?: boolean
  onClose?: () => void
  className?: string
}

interface ModalBodyProps {
  children: ReactNode
  className?: string
  scrollable?: boolean
}

interface ModalFooterProps {
  children: ReactNode
  className?: string
  divider?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  position = 'center',
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
  showOverlay = true,
  overlayBlur = true,
  animation = 'scale',
  duration = 300,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  onOpen,
  onCloseComplete,
  preventScroll = true,
  destroyOnClose = false
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    }
  }, [isOpen, onOpen])

  // Handle escape key
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeOnEsc])

  // Prevent body scroll
  useEffect(() => {
    if (!preventScroll || !mounted) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px' // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen, preventScroll, mounted])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
      onCloseComplete?.()
    }, duration)
  }

  const handleOverlayClick = () => {
    if (closeOnClickOutside) {
      handleClose()
    }
  }

  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'max-w-md'
      case 'md': return 'max-w-lg'
      case 'lg': return 'max-w-2xl'
      case 'xl': return 'max-w-4xl'
      case 'full': return 'max-w-[95vw] w-full'
      default: return 'max-w-lg'
    }
  }

  const getPositionClass = () => {
    switch(position) {
      case 'center':
        return 'items-center justify-center'
      case 'top':
        return 'items-start justify-center pt-16'
      case 'bottom':
        return 'items-end justify-center pb-16'
      case 'left':
        return 'items-center justify-start pl-16'
      case 'right':
        return 'items-center justify-end pr-16'
      default:
        return 'items-center justify-center'
    }
  }

  const getAnimationClass = () => {
    if (isClosing) {
      switch(animation) {
        case 'fade': return 'opacity-0'
        case 'slide': return 'translate-y-4 opacity-0'
        case 'scale': return 'scale-95 opacity-0'
        default: return ''
      }
    }

    switch(animation) {
      case 'fade': return 'animate-fade-in'
      case 'slide': return 'animate-slide-in'
      case 'scale': return 'animate-scale-in'
      default: return ''
    }
  }

  const getOverlayAnimationClass = () => {
    if (isClosing) return 'opacity-0'
    return 'animate-fade-in'
  }

  if (!mounted || (!isOpen && !isClosing && destroyOnClose)) {
    return null
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex ${getPositionClass()}
        ${isOpen || isClosing ? 'visible' : 'invisible'}
        ${className}
      `}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      {showOverlay && (
        <div
          className={`
            absolute inset-0 bg-black/60
            ${overlayBlur ? 'backdrop-blur-sm' : ''}
            transition-opacity duration-${duration}
            ${getOverlayAnimationClass()}
            ${overlayClassName}
          `}
          onClick={handleOverlayClick}
        />
      )}

      {/* Modal Content */}
      <div
        className={`
          relative bg-gradient-to-b from-gray-900 to-purple-900
          rounded-2xl shadow-2xl border-2 border-white/20
          w-full ${getSizeClass()}
          transition-all duration-${duration}
          ${getAnimationClass()}
          ${contentClassName}
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`
            flex items-center justify-between p-6 border-b border-white/10
            ${headerClassName}
          `}>
            {title && (
              <h3 className="text-2xl font-bold text-white">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center"
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`
          p-6
          ${bodyClassName}
        `}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function ModalHeader({
  children,
  title,
  subtitle,
  showClose = true,
  onClose,
  className = ''
}: ModalHeaderProps) {
  return (
    <div className={`flex items-start justify-between p-6 border-b border-white/10 ${className}`}>
      <div>
        {title && <h3 className="text-2xl font-bold text-white">{title}</h3>}
        {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
        {children}
      </div>
      {showClose && onClose && (
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export function ModalBody({
  children,
  className = '',
  scrollable = false
}: ModalBodyProps) {
  return (
    <div className={`
      p-6
      ${scrollable ? 'max-h-[60vh] overflow-y-auto custom-scrollbar' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}

export function ModalFooter({
  children,
  className = '',
  divider = true
}: ModalFooterProps) {
  return (
    <div className={`
      p-6
      ${divider ? 'border-t border-white/10' : ''}
      ${className}
    `}>
      <div className="flex justify-end space-x-3">
        {children}
      </div>
    </div>
  )
}

// Confirmation Modal
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'success' | 'danger' | 'warning'
  loading?: boolean
}) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'primary':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-pink-500'
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      default:
        return 'bg-gradient-to-r from-red-500 to-pink-500'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="text-5xl mb-4">
          {variant === 'danger' && '⚠️'}
          {variant === 'success' && '✅'}
          {variant === 'warning' && '⚠️'}
          {variant === 'primary' && 'ℹ️'}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/60 mb-6">{message}</p>
      </div>

      <ModalFooter>
        <button
          onClick={onClose}
          disabled={loading}
          className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`px-6 py-3 ${getVariantClasses()} text-white font-bold rounded-lg hover:scale-105 transition-all disabled:opacity-50 flex items-center space-x-2`}
        >
          {loading && <span className="animate-spin">⏳</span>}
          <span>{confirmText}</span>
        </button>
      </ModalFooter>
    </Modal>
  )
}

// Alert Modal
export function AlertModal({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  type = 'info'
}: {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
}) {
  const getIcon = () => {
    switch(type) {
      case 'info': return 'ℹ️'
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      default: return 'ℹ️'
    }
  }

  const getColor = () => {
    switch(type) {
      case 'info': return 'from-blue-500 to-cyan-500'
      case 'success': return 'from-green-500 to-emerald-500'
      case 'warning': return 'from-yellow-500 to-orange-500'
      case 'error': return 'from-red-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`text-5xl mb-4 bg-gradient-to-r ${getColor()} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto`}>
          {getIcon()}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/60 mb-6">{message}</p>
      </div>

      <ModalFooter>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
        >
          OK
        </button>
      </ModalFooter>
    </Modal>
  )
}

// Form Modal
export function FormModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  loading = false
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  submitText?: string
  cancelText?: string
  loading?: boolean
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader title={title} onClose={onClose} />
      <form onSubmit={onSubmit}>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            {loading && <span className="animate-spin">⏳</span>}
            <span>{submitText}</span>
          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

// Image Modal
export function ImageModal({
  isOpen,
  onClose,
  src,
  alt
}: {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      position="center"
      showCloseButton={true}
      overlayBlur={true}
      className="flex items-center justify-center"
    >
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </Modal>
  )
}

// Drawer Modal (Side Panel)
export function DrawerModal({
  isOpen,
  onClose,
  children,
  title,
  position = 'right',
  size = 'md'
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  position?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'w-80'
      case 'md': return 'w-96'
      case 'lg': return 'w-[32rem]'
      case 'xl': return 'w-[48rem]'
      default: return 'w-96'
    }
  }

  const getPositionClass = () => {
    return position === 'left' ? 'justify-start' : 'justify-end'
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      size="full"
      animation="slide"
      className={`flex ${getPositionClass()}`}
    >
      <div className={`h-full ${getSizeClass()} bg-gradient-to-b from-gray-900 to-purple-900`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          {title && <h3 className="text-2xl font-bold text-white">{title}</h3>}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </Modal>
  )
}

// Add custom animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
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