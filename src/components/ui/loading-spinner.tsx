'use client'

import { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white' | 'gradient'
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'circle' | 'ring' | 'ripple' | 'hourglass'
  text?: string
  fullScreen?: boolean
  overlay?: boolean
  backdrop?: boolean
  progress?: number
  showProgress?: boolean
  indeterminate?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  textClassName?: string
}

export default function LoadingSpinner({
  size = 'md',
  color = 'gradient',
  variant = 'spinner',
  text,
  fullScreen = false,
  overlay = false,
  backdrop = false,
  progress = 0,
  showProgress = false,
  indeterminate = true,
  speed = 'normal',
  className = '',
  textClassName = ''
}: LoadingSpinnerProps) {
  const [progressValue, setProgressValue] = useState(progress)

  // Animate progress if indeterminate
  useEffect(() => {
    if (!indeterminate) {
      setProgressValue(progress)
      return
    }

    let animationFrame: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      
      // Create a smooth back-and-forth animation
      const value = (Math.sin(elapsed / 500) + 1) / 2 * 100
      setProgressValue(value)
      
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [indeterminate, progress])

  const getSizeClass = () => {
    switch(size) {
      case 'xs': return 'w-4 h-4 border-2'
      case 'sm': return 'w-6 h-6 border-2'
      case 'md': return 'w-8 h-8 border-3'
      case 'lg': return 'w-12 h-12 border-4'
      case 'xl': return 'w-16 h-16 border-4'
      default: return 'w-8 h-8 border-3'
    }
  }

  const getColorClass = () => {
    switch(color) {
      case 'primary':
        return 'border-pink-500 border-t-transparent'
      case 'secondary':
        return 'border-purple-500 border-t-transparent'
      case 'success':
        return 'border-green-500 border-t-transparent'
      case 'warning':
        return 'border-yellow-500 border-t-transparent'
      case 'danger':
        return 'border-red-500 border-t-transparent'
      case 'white':
        return 'border-white border-t-transparent'
      case 'gradient':
        return 'border-gradient'
      default:
        return 'border-pink-500 border-t-transparent'
    }
  }

  const getSpeedClass = () => {
    switch(speed) {
      case 'slow': return 'animate-spin-slow'
      case 'normal': return 'animate-spin'
      case 'fast': return 'animate-spin-fast'
      default: return 'animate-spin'
    }
  }

  const renderSpinner = () => {
    switch(variant) {
      case 'spinner':
        return (
          <div
            className={`
              rounded-full
              ${getSizeClass()}
              ${getColorClass()}
              ${getSpeedClass()}
              ${color === 'gradient' ? 'gradient-spinner' : ''}
            `}
          />
        )

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`
                  rounded-full bg-gradient-to-r from-pink-500 to-purple-500
                  ${size === 'xs' ? 'w-1 h-1' : ''}
                  ${size === 'sm' ? 'w-2 h-2' : ''}
                  ${size === 'md' ? 'w-3 h-3' : ''}
                  ${size === 'lg' ? 'w-4 h-4' : ''}
                  ${size === 'xl' ? 'w-5 h-5' : ''}
                  animate-bounce
                `}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <div
            className={`
              rounded-full bg-gradient-to-r from-pink-500 to-purple-500
              ${getSizeClass()}
              animate-pulse
            `}
          />
        )

      case 'bars':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`
                  bg-gradient-to-r from-pink-500 to-purple-500
                  ${size === 'xs' ? 'w-0.5 h-3' : ''}
                  ${size === 'sm' ? 'w-1 h-4' : ''}
                  ${size === 'md' ? 'w-1 h-6' : ''}
                  ${size === 'lg' ? 'w-1.5 h-8' : ''}
                  ${size === 'xl' ? 'w-2 h-10' : ''}
                  animate-pulse
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )

      case 'circle':
        return (
          <svg
            className={`animate-spin ${getSizeClass()}`}
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <circle
              className="opacity-75"
              cx="12"
              cy="12"
              r="10"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="30 70"
              strokeDashoffset="0"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        )

      case 'ring':
        return (
          <div className="relative">
            <div
              className={`
                rounded-full border-2 border-pink-500/20
                ${getSizeClass()}
              `}
            />
            <div
              className={`
                absolute top-0 left-0 rounded-full border-2 border-pink-500
                ${getSizeClass()}
                ${getSpeedClass()}
                border-t-transparent
              `}
            />
          </div>
        )

      case 'ripple':
        return (
          <div className="relative">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`
                  absolute top-0 left-0 rounded-full border-2 border-pink-500
                  ${getSizeClass()}
                  animate-ping
                `}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
            <div
              className={`
                rounded-full bg-gradient-to-r from-pink-500 to-purple-500
                ${getSizeClass()}
              `}
            />
          </div>
        )

      case 'hourglass':
        return (
          <div className="relative">
            <div
              className={`
                border-4 border-pink-500 border-t-transparent
                ${size === 'xs' ? 'w-4 h-4' : ''}
                ${size === 'sm' ? 'w-6 h-6' : ''}
                ${size === 'md' ? 'w-8 h-8' : ''}
                ${size === 'lg' ? 'w-12 h-12' : ''}
                ${size === 'xl' ? 'w-16 h-16' : ''}
                rounded-full animate-spin
              `}
            />
            <div
              className={`
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-1 h-1 bg-pink-500 rounded-full animate-pulse
              `}
            />
          </div>
        )

      default:
        return null
    }
  }

  const renderProgress = () => (
    <div className="w-full max-w-xs">
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progressValue}%` }}
        />
      </div>
      {showProgress && (
        <p className="text-white/60 text-sm text-center mt-2">
          {Math.round(progressValue)}%
        </p>
      )}
    </div>
  )

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {renderSpinner()}
      {showProgress && renderProgress()}
      {text && (
        <p className={`text-white/80 text-sm animate-pulse ${textClassName}`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {backdrop && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        )}
        <div className="relative">
          {content}
        </div>
      </div>
    )
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
        {content}
      </div>
    )
  }

  return content
}

// Page Loading Spinner
export function PageLoader({ text = 'Loading page...' }: { text?: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner
        size="lg"
        variant="ripple"
        text={text}
      />
    </div>
  )
}

// Section Loading Spinner
export function SectionLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="py-12 flex items-center justify-center">
      <LoadingSpinner
        size="md"
        variant="dots"
        text={text}
      />
    </div>
  )
}

// Button Loading Spinner
export function ButtonLoader({ size = 'sm' }: { size?: 'xs' | 'sm' | 'md' }) {
  return (
    <LoadingSpinner
      size={size}
      variant="spinner"
      color="white"
    />
  )
}

// Infinite Scroll Loader
export function InfiniteLoader({ text = 'Loading more...' }: { text?: string }) {
  return (
    <div className="py-4 flex items-center justify-center space-x-3">
      <LoadingSpinner
        size="sm"
        variant="dots"
      />
      <span className="text-white/60 text-sm">{text}</span>
    </div>
  )
}

// Skeleton Loader
export function SkeletonLoader({
  type = 'card',
  count = 1
}: {
  type?: 'card' | 'text' | 'image' | 'profile'
  count?: number
}) {
  const renderSkeleton = () => {
    switch(type) {
      case 'card':
        return (
          <div className="bg-white/10 rounded-2xl p-4 space-y-3">
            <div className="h-48 bg-white/20 rounded-xl animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse" />
            <div className="h-10 bg-white/20 rounded animate-pulse" />
          </div>
        )
      case 'text':
        return (
          <div className="space-y-2">
            <div className="h-4 bg-white/20 rounded w-full animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-4/6 animate-pulse" />
          </div>
        )
      case 'image':
        return (
          <div className="h-48 bg-white/20 rounded-xl animate-pulse" />
        )
      case 'profile':
        return (
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-white/20 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </>
  )
}

// Progress Bar
export function ProgressBar({
  progress,
  showLabel = true,
  size = 'md',
  color = 'gradient',
  indeterminate = false
}: {
  progress: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'gradient'
  indeterminate?: boolean
}) {
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'h-1'
      case 'md': return 'h-2'
      case 'lg': return 'h-3'
      default: return 'h-2'
    }
  }

  const getColorClass = () => {
    switch(color) {
      case 'primary':
        return 'bg-pink-500'
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'danger':
        return 'bg-red-500'
      case 'gradient':
        return 'bg-gradient-to-r from-pink-500 to-purple-500'
      default:
        return 'bg-pink-500'
    }
  }

  return (
    <div className="w-full">
      <div className={`relative w-full bg-white/10 rounded-full overflow-hidden ${getSizeClass()}`}>
        <div
          className={`absolute left-0 top-0 h-full ${getColorClass()} transition-all duration-300 ${
            indeterminate ? 'animate-progress' : ''
          }`}
          style={{ width: indeterminate ? '50%' : `${progress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-white/60 text-sm text-center mt-2">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  )
}

// Add custom animations
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-fast {
    from { transform: rotate(0deg); }
    to { transform: rotate(720deg); }
  }
  @keyframes progress {
    0% { left: -50%; }
    100% { left: 100%; }
  }

  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }
  .animate-spin-fast {
    animation: spin-fast 0.8s linear infinite;
  }
  .animate-progress {
    animation: progress 1.5s ease-in-out infinite;
  }

  .gradient-spinner {
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #ec4899, #a855f7);
    border-image-slice: 1;
  }

  .border-gradient {
    border: 3px solid;
    border-image: linear-gradient(to right, #ec4899, #a855f7);
    border-image-slice: 1;
    border-top-color: transparent;
  }
`

// Add styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}