'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check if email already exists (mock)
      if (formData.email === 'sajid.syed@gmail.com' || formData.email === 'john@example.com') {
        setError('Email already registered')
        setLoading(false)
        return
      }

      // Success
      setSuccess(true)
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
      
    } catch {
      setError('Registration failed. Please try again.')
      setLoading(false)
    }
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Bismillah */}
          <div className="text-center mb-8">
            <p className="text-3xl text-white mb-2">بسم اللہ الرحمن الرحیم</p>
          </div>

          {/* Success Card */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-500/30 text-center">
            <div className="text-7xl mb-6 animate-bounce">✅</div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Registration Successful!
            </h2>
            <p className="text-white/60 mb-6">
              Your account has been created successfully.
            </p>
            <div className="w-16 h-16 mx-auto border-4 border-t-pink-500 border-white/20 rounded-full animate-spin mb-4"></div>
            <p className="text-white/40 text-sm">Redirecting to login page...</p>
          </div>

          {/* Admin Info */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">Hafiz Sajid Syed - Administrator</p>
          </div>
        </div>
      </div>
    )
  }

  // Register form
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-3xl text-white mb-2">بسم اللہ الرحمن الرحیم</p>
        </div>

        {/* Register Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
                Create Account
              </span>
            </h1>
            <p className="text-white/60">Join our precious gems community</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white/80 text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white/80 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:outline-none transition-colors"
                required
              />
              <p className="text-white/40 text-xs mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 accent-pink-500"
                required
              />
              <label htmlFor="terms" className="text-white/60 text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-pink-300 hover:text-pink-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-pink-300 hover:text-pink-200">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  <span>Creating Account...</span>
                </span>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-pink-300 hover:text-pink-200 font-medium">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <p className="text-white/40 text-xs text-center">
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">Hafiz Sajid Syed - Administrator</p>
          <p className="text-white/30 text-xs mt-1">sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}