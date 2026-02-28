'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [adminInfo, setAdminInfo] = useState({
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    role: 'Administrator'
  })
  
  const pathname = usePathname()
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '💎' },
    { name: 'Orders', href: '/admin/orders', icon: '📦' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/')
  }

  const handleSignOut = () => {
    // Clear any stored session data
    localStorage.removeItem('admin-session')
    sessionStorage.removeItem('admin-session')
    
    // Redirect to home
    router.push('/')
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString()
  }

  const [currentTime, setCurrentTime] = useState(getCurrentTime())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-md shadow-2xl' 
          : 'bg-gradient-to-r from-purple-800 to-pink-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section - Logo and title */}
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <span className="text-2xl">👑</span>
                <span className="text-xl font-bold text-white hidden sm:block">
                  Admin Panel
                </span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-white/60">
                <span>/</span>
                <span className="capitalize">
                  {pathname.split('/').pop() || 'dashboard'}
                </span>
              </div>
            </div>

            {/* Right section - Admin info and actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-white/20"></div>

              {/* Admin Profile Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {adminInfo.name.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">
                      {adminInfo.name}
                    </p>
                    <p className="text-xs text-white/60">{adminInfo.role}</p>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-purple-900 to-pink-900 rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50">
                    {/* Admin Info */}
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-bold">{adminInfo.name}</p>
                      <p className="text-white/60 text-sm">{adminInfo.email}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                        {adminInfo.role}
                      </span>
                    </div>

                    {/* Quick Links */}
                    <div className="p-2">
                      <Link
                        href="/admin/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-all w-full text-left"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span>👤</span>
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-all w-full text-left"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span>⚙️</span>
                        <span>Settings</span>
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center space-x-3 px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-all w-full text-left"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span>🏠</span>
                        <span>View Store</span>
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="p-2 border-t border-white/10">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <span>🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Admin Info */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {adminInfo.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{adminInfo.name}</p>
                    <p className="text-white/60 text-sm">{adminInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Quick Stats Bar */}
      <div className="fixed top-32 left-0 right-0 z-30 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">📦</span>
                <span className="text-white/80 hidden sm:inline">Today's Orders:</span>
                <span className="text-white font-bold">12</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">💰</span>
                <span className="text-white/80 hidden sm:inline">Revenue:</span>
                <span className="text-white font-bold">$2,450</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-300">👥</span>
                <span className="text-white/80 hidden sm:inline">Users:</span>
                <span className="text-white font-bold">234</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-300">⏰</span>
              <span className="text-white/60">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}