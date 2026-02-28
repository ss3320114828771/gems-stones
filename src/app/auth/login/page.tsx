'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simple hardcoded check for demo
      if (email === 'sajid.syed@gmail.com' && password === 'admin123') {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          name: 'Hafiz Sajid Syed',
          email: 'sajid.syed@gmail.com',
          isAdmin: true
        }))
        router.push('/admin/dashboard')
      } 
      else if (email === 'john@example.com' && password === 'user123') {
        localStorage.setItem('user', JSON.stringify({
          id: '2',
          name: 'John Doe',
          email: 'john@example.com',
          isAdmin: false
        }))
        router.push('/')
      }
      else {
        setError('Invalid email or password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-3xl text-white mb-2">بسم اللہ الرحمن الرحیم</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-white/60">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white/80 text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 accent-pink-500" />
                <span className="text-white/60 text-sm">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-pink-300 hover:text-pink-200 text-sm">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-pink-300 hover:text-pink-200 font-medium">
                Register here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl">
            <p className="text-white/60 text-sm mb-2 text-center">Demo Credentials</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/40">Admin:</span>
                <span className="text-white">sajid.syed@gmail.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">User:</span>
                <span className="text-white">john@example.com / user123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">Hafiz Sajid Syed - Administrator</p>
        </div>
      </div>
    </div>
  )
}