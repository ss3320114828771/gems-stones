'use client'

import { Component, ReactNode, ErrorInfo } from 'react'
import Link from 'next/link'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: any[]
  showError?: boolean
  showStack?: boolean
  showReload?: boolean
  showHome?: boolean
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo
    })

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error state if resetKeys change
    if (this.state.hasError && this.props.resetKeys) {
      const hasKeyChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      )
      if (hasKeyChanged) {
        this.reset()
      }
    }
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback, showError = true, showStack = false, showReload = true, showHome = true, className = '' } = this.props

    if (hasError) {
      // Custom fallback render
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error!, this.reset)
        }
        return fallback
      }

      // Default error UI
      return (
        <div className={`min-h-[400px] flex items-center justify-center p-4 ${className}`}>
          <div className="max-w-2xl w-full bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border-2 border-red-500/30 p-8 text-center">
            {/* Error Icon */}
            <div className="relative mb-6">
              <div className="text-7xl animate-bounce">⚠️</div>
              <div className="absolute inset-0 animate-ping opacity-20 text-7xl">⚠️</div>
            </div>

            {/* Error Title */}
            <h2 className="text-3xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Something Went Wrong
              </span>
            </h2>

            {/* Error Message */}
            {showError && error && (
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 font-mono text-sm">
                    {error.name}: {error.message}
                  </p>
                </div>
              </div>
            )}

            {/* Error Stack (Development Only) */}
            {showStack && errorInfo && process.env.NODE_ENV === 'development' && (
              <div className="mb-6 text-left">
                <p className="text-white/60 text-sm mb-2">Component Stack:</p>
                <pre className="p-4 bg-black/50 rounded-lg overflow-auto max-h-40 text-xs text-white/40 font-mono">
                  {errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {showReload && (
                <button
                  onClick={this.handleReload}
                  className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>🔄</span>
                  <span>Reload Page</span>
                </button>
              )}

              {showHome && (
                <Link
                  href="/"
                  className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>🏠</span>
                  <span>Go Home</span>
                </Link>
              )}

              <button
                onClick={this.reset}
                className="px-6 py-3 bg-purple-500/20 text-purple-300 font-bold rounded-xl hover:bg-purple-500/30 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Try Again</span>
              </button>
            </div>

            {/* Error ID */}
            <p className="text-white/20 text-xs mt-6">
              Error ID: {Date.now().toString(36)}
            </p>
          </div>
        </div>
      )
    }

    return children
  }
}

// Higher-Order Component for function components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.FC<P> {
  const WithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WithErrorBoundary.displayName = `WithErrorBoundary(${Component.displayName || Component.name || 'Component'})`

  return WithErrorBoundary
}

// Hook for error handling within components
export function useErrorHandler() {
  const [, setError] = useState<Error | null>(null)

  const handleError = (error: Error | unknown) => {
    if (error instanceof Error) {
      setError(() => {
        throw error
      })
    } else {
      setError(() => {
        throw new Error(String(error))
      })
    }
  }

  return handleError
}

// Async Error Boundary for data fetching
interface AsyncErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  loading?: ReactNode
  error?: ReactNode
  onReset?: () => void
}

interface AsyncErrorBoundaryState {
  status: 'idle' | 'pending' | 'success' | 'error'
  error: Error | null
}

export class AsyncErrorBoundary extends Component<AsyncErrorBoundaryProps, AsyncErrorBoundaryState> {
  constructor(props: AsyncErrorBoundaryProps) {
    super(props)
    this.state = {
      status: 'idle',
      error: null
    }
  }

  componentDidCatch(error: Error) {
    this.setState({
      status: 'error',
      error
    })
  }

  reset = () => {
    this.setState({
      status: 'idle',
      error: null
    })
    this.props.onReset?.()
  }

  render() {
    const { status, error } = this.state
    const { children, fallback, loading, error: errorFallback } = this.props

    if (status === 'error') {
      if (errorFallback) {
        return <>{errorFallback}</>
      }
      return (
        <div className="text-center p-8">
          <div className="text-5xl mb-4">❌</div>
          <h3 className="text-xl text-white mb-2">Failed to load</h3>
          <p className="text-white/60 mb-4">{error?.message}</p>
          <button
            onClick={this.reset}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Try Again
          </button>
        </div>
      )
    }

    if (status === 'pending') {
      return <>{loading || <div className="text-center p-8">Loading...</div>}</>
    }

    return <>{children}</>
  }
}

// Route Error Boundary for Next.js App Router
export function RouteErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border-2 border-red-500/30 p-8 text-center">
        <div className="text-7xl mb-6 animate-bounce">🚨</div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Route Error
          </span>
        </h1>
        
        <div className="mb-6">
          <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 font-mono">{error.message}</p>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 text-left">
            <p className="text-white/60 text-sm mb-2">Stack Trace:</p>
            <pre className="p-4 bg-black/50 rounded-lg overflow-auto max-h-60 text-xs text-white/40 font-mono">
              {error.stack}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// Global Error Boundary for app-wide error handling
export class GlobalErrorBoundary extends Component<{ children: ReactNode }> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // Send to analytics
      console.error('Global error:', error, errorInfo)
    }
  }

  render() {
    return this.props.children
  }
}

// Network Error Boundary for API errors
interface NetworkErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface NetworkErrorBoundaryState {
  hasError: boolean
  error: Error | null
  isNetworkError: boolean
}

export class NetworkErrorBoundary extends Component<NetworkErrorBoundaryProps, NetworkErrorBoundaryState> {
  constructor(props: NetworkErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      isNetworkError: false
    }
  }

  static getDerivedStateFromError(error: Error): Partial<NetworkErrorBoundaryState> {
    const isNetworkError = 
      error.message.includes('network') ||
      error.message.includes('fetch') ||
      error.message.includes('Failed to fetch') ||
      error.name === 'NetworkError'

    return {
      hasError: true,
      error,
      isNetworkError
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      isNetworkError: false
    })
  }

  render() {
    const { hasError, isNetworkError, error } = this.state
    const { children, fallback } = this.props

    if (hasError) {
      if (fallback) {
        return <>{fallback}</>
      }

      return (
        <div className="text-center p-8 bg-white/10 rounded-2xl border-2 border-white/20">
          <div className="text-6xl mb-4">
            {isNetworkError ? '📡' : '❌'}
          </div>
          
          <h3 className="text-2xl text-white mb-2">
            {isNetworkError ? 'Network Error' : 'Something Went Wrong'}
          </h3>
          
          <p className="text-white/60 mb-6">
            {isNetworkError 
              ? 'Please check your internet connection and try again.'
              : error?.message || 'An unexpected error occurred.'}
          </p>

          <button
            onClick={this.handleRetry}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
          >
            Try Again
          </button>
        </div>
      )
    }

    return children
  }
}

// Import useState for the hook
import { useState } from 'react'

// Add CSS animations
const styles = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce {
    animation: bounce 1s ease-in-out infinite;
  }
  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }
  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`

// Add styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}