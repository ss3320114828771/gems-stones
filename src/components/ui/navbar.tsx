'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  logo?: React.ReactNode
  brandName?: string
  menuItems?: NavItem[]
  rightItems?: NavItem[]
  showSearch?: boolean
  showCart?: boolean
  showWishlist?: boolean
  showAuth?: boolean
  sticky?: boolean
  transparent?: boolean
  variant?: 'light' | 'dark' | 'gradient' | 'glass'
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onSearch?: (query: string) => void
  cartCount?: number
  wishlistCount?: number
  user?: { name?: string; avatar?: string } | null
  onLogin?: () => void
  onLogout?: () => void
}

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: number | string
  children?: NavItem[]
  onClick?: () => void
}

export default function Navbar({
  logo,
  brandName = 'GEMS & STONES',
  menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Directions', href: '/directions' }
  ],
  rightItems = [],
  showSearch = true,
  showCart = true,
  showWishlist = true,
  showAuth = true,
  sticky = true,
  transparent = false,
  variant = 'gradient',
  mobileBreakpoint = 'lg',
  className = '',
  onSearch,
  cartCount = 0,
  wishlistCount = 0,
  user = null,
  onLogin,
  onLogout
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getVariantClasses = () => {
    if (transparent && !scrolled) {
      return 'bg-transparent'
    }

    switch(variant) {
      case 'light':
        return 'bg-white/90 text-gray-900'
      case 'dark':
        return 'bg-gray-900/95 text-white'
      case 'gradient':
        return 'bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-red-900/95 text-white'
      case 'glass':
        return 'bg-white/10 backdrop-blur-md text-white'
      default:
        return 'bg-gradient-to-r from-purple-900/95 to-pink-900/95 text-white'
    }
  }

  const getStickyClasses = () => {
    if (!sticky) return ''
    return `fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'shadow-2xl' : ''
    }`
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname?.startsWith(href) || false
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const getMobileBreakpointClass = () => {
    switch(mobileBreakpoint) {
      case 'sm': return 'sm:hidden'
      case 'md': return 'md:hidden'
      case 'lg': return 'lg:hidden'
      case 'xl': return 'xl:hidden'
      default: return 'lg:hidden'
    }
  }

  const getDesktopBreakpointClass = () => {
    switch(mobileBreakpoint) {
      case 'sm': return 'hidden sm:flex'
      case 'md': return 'hidden md:flex'
      case 'lg': return 'hidden lg:flex'
      case 'xl': return 'hidden xl:flex'
      default: return 'hidden lg:flex'
    }
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <nav className={`${getStickyClasses()} ${getVariantClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              {logo || (
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  💎
                </span>
              )}
              <span className="text-xl font-bold text-white hidden sm:block">
                {brandName}
              </span>
            </Link>

            {/* Desktop Menu Items */}
            <div className={`${getDesktopBreakpointClass()} items-center space-x-1 ml-6`}>
              {menuItems.map((item) => (
                <div key={item.href} className="relative dropdown-container">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-all
                          flex items-center space-x-1
                          ${isActive(item.href) 
                            ? 'bg-white/20 text-white' 
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }
                        `}
                      >
                        <span>{item.icon && <span className="mr-1">{item.icon}</span>}</span>
                        <span>{item.label}</span>
                        <span className="text-xs ml-1">▼</span>
                      </button>

                      {/* Dropdown */}
                      {activeDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-gradient-to-b from-gray-900 to-purple-900 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden z-50">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center space-x-2 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.icon && <span>{child.icon}</span>}
                              <span className="flex-1">{child.label}</span>
                              {child.badge && (
                                <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all
                        flex items-center space-x-1
                        ${isActive(item.href) 
                          ? 'bg-white/20 text-white shadow-lg' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-1 px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-2">
            {/* Search Bar */}
            {showSearch && (
              <form onSubmit={handleSearch} className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gems..."
                    className="w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-500 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    🔍
                  </button>
                </div>
              </form>
            )}

            {/* Wishlist */}
            {showWishlist && (
              <Link
                href="/wishlist"
                className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <span className="text-xl">❤️</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            {showCart && (
              <Link
                href="/cart"
                className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth */}
            {showAuth && (
              <div className="relative dropdown-container">
                {user ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                      className="flex items-center space-x-2 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user.name?.charAt(0) || 'U'
                        )}
                      </div>
                    </button>

                    {/* User Dropdown */}
                    {activeDropdown === 'user' && (
                      <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-gray-900 to-purple-900 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white font-medium">{user.name || 'User'}</p>
                          <p className="text-white/60 text-xs">Account</p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            setActiveDropdown(null)
                            onLogout?.()
                          }}
                          className="w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/20 transition-all"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={onLogin}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-yellow-500 transition-all text-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${getMobileBreakpointClass()} p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all`}
              aria-label="Toggle menu"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`${getMobileBreakpointClass()} py-4 border-t border-white/10`}>
            {/* Mobile Search */}
            {showSearch && (
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gems..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    🔍
                  </button>
                </div>
              </form>
            )}

            {/* Mobile Menu Items */}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.label}</span>
                        </div>
                        <span>{activeDropdown === item.label ? '−' : '+'}</span>
                      </button>

                      {activeDropdown === item.label && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center space-x-3 px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.icon && <span>{child.icon}</span>}
                              <span className="flex-1">{child.label}</span>
                              {child.badge && (
                                <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive(item.href)
                          ? 'bg-pink-500 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Auth */}
              {showAuth && !user && (
                <button
                  onClick={() => {
                    setIsOpen(false)
                    onLogin?.()
                  }}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Mega Menu Navbar
export function MegaMenuNavbar() {
  const megaMenuItems = [
    {
      label: 'Gems',
      href: '/products',
      children: [
        {
          label: 'Precious Gems',
          href: '/products?category=precious',
          icon: '💎',
          description: 'Diamonds, Rubies, Sapphires'
        },
        {
          label: 'Semi-Precious',
          href: '/products?category=semi',
          icon: '✨',
          description: 'Amethyst, Topaz, Garnet'
        },
        {
          label: 'Rare Collectibles',
          href: '/products?category=rare',
          icon: '👑',
          description: 'Unique and rare specimens'
        },
        {
          label: 'Healing Crystals',
          href: '/products?category=crystals',
          icon: '🌟',
          description: 'Quartz, Obsidian, Turquoise'
        }
      ]
    },
    {
      label: 'Jewelry',
      href: '/jewelry',
      children: [
        {
          label: 'Rings',
          href: '/jewelry/rings',
          icon: '💍',
          description: 'Engagement & Fashion Rings'
        },
        {
          label: 'Necklaces',
          href: '/jewelry/necklaces',
          icon: '📿',
          description: 'Pendants & Chains'
        },
        {
          label: 'Earrings',
          href: '/jewelry/earrings',
          icon: '👂',
          description: 'Studs & Drops'
        },
        {
          label: 'Bracelets',
          href: '/jewelry/bracelets',
          icon: '🔗',
          description: 'Bangles & Cuffs'
        }
      ]
    }
  ]

  return (
    <Navbar
      menuItems={megaMenuItems}
      showSearch={true}
      showCart={true}
      variant="gradient"
    />
  )
}

// Transparent Navbar
export function TransparentNavbar() {
  return (
    <Navbar
      transparent={true}
      variant="glass"
      menuItems={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'About', href: '/about' }
      ]}
    />
  )
}

// E-commerce Navbar
export function EcommerceNavbar() {
  const [cartCount, setCartCount] = useState(3)
  const [wishlistCount, setWishlistCount] = useState(5)

  return (
    <Navbar
      menuItems={[
        { label: 'Home', href: '/' },
        { 
          label: 'Shop', 
          href: '/products',
          children: [
            { label: 'All Products', href: '/products' },
            { label: 'New Arrivals', href: '/products?sort=new', badge: 'New' },
            { label: 'Best Sellers', href: '/products?sort=bestseller' },
            { label: 'Sale', href: '/products?sort=sale', badge: '-20%' }
          ]
        },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ]}
      showSearch={true}
      showCart={true}
      showWishlist={true}
      cartCount={cartCount}
      wishlistCount={wishlistCount}
      user={{ name: 'Hafiz Sajid' }}
      onLogin={() => console.log('Login')}
      onLogout={() => console.log('Logout')}
    />
  )
}

// Minimal Navbar
export function MinimalNavbar() {
  return (
    <Navbar
      variant="glass"
      menuItems={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ]}
      showSearch={false}
      showCart={false}
      showAuth={false}
    />
  )
}