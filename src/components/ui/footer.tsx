'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FooterProps {
  logo?: React.ReactNode
  brandName?: string
  brandDescription?: string
  showNewsletter?: boolean
  showSocial?: boolean
  showPayment?: boolean
  showLanguage?: boolean
  columns?: FooterColumn[]
  bottomLinks?: FooterLink[]
  copyright?: string
  className?: string
  variant?: 'default' | 'dark' | 'gradient' | 'minimal'
  onNewsletterSubmit?: (email: string) => void
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterLink {
  label: string
  href: string
  icon?: React.ReactNode
  external?: boolean
  badge?: string
}

export default function Footer({
  logo,
  brandName = 'GEMS & STONES',
  brandDescription = 'Your trusted source for premium gemstones and precious stones since 2005.',
  showNewsletter = true,
  showSocial = true,
  showPayment = true,
  showLanguage = true,
  columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Precious Gems', href: '/products?category=precious' },
        { label: 'Semi-Precious', href: '/products?category=semi' },
        { label: 'New Arrivals', href: '/products?sort=new' },
        { label: 'Sale', href: '/products?sort=sale', badge: '-20%' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Directions', href: '/directions' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Shipping', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Size Guide', href: '/size-guide' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Sitemap', href: '/sitemap' }
      ]
    }
  ],
  bottomLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' }
  ],
  copyright = `© ${new Date().getFullYear()} GEMS & STONES. All rights reserved.`,
  className = '',
  variant = 'gradient',
  onNewsletterSubmit
}: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true)
      setLoading(false)
      setEmail('')
      onNewsletterSubmit?.(email)
    }, 1000)
  }

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { name: 'Pinterest', icon: '📌', href: 'https://pinterest.com', color: 'hover:bg-red-600' },
    { name: 'YouTube', icon: '▶️', href: 'https://youtube.com', color: 'hover:bg-red-600' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com', color: 'hover:bg-blue-700' }
  ]

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'American Express', icon: '💳' },
    { name: 'PayPal', icon: '📱' },
    { name: 'Apple Pay', icon: '🍎' },
    { name: 'Google Pay', icon: '📱' },
    { name: 'Bitcoin', icon: '₿' },
    { name: 'Bank Transfer', icon: '🏦' }
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ]

  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const getVariantClasses = () => {
    switch(variant) {
      case 'dark':
        return 'bg-gray-900 border-gray-800'
      case 'gradient':
        return 'bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 border-purple-800/30'
      case 'minimal':
        return 'bg-transparent border-white/10'
      default:
        return 'bg-gray-900 border-gray-800'
    }
  }

  return (
    <footer className={`w-full border-t ${getVariantClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {logo ? (
                logo
              ) : (
                <span className="text-3xl">💎</span>
              )}
              <span className="text-2xl font-bold text-white">
                {brandName}
              </span>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {brandDescription}
            </p>

            {/* Admin Info */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white/80 text-sm font-medium">Administrator</p>
              <p className="text-yellow-300 font-bold">Hafiz Sajid Syed</p>
              <p className="text-white/40 text-xs mt-1">sajid.syed@gmail.com</p>
            </div>

            {/* Newsletter */}
            {showNewsletter && (
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Subscribe to Newsletter</h3>
                {subscribed ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-400 text-sm flex items-center space-x-2">
                      <span>✓</span>
                      <span>Thanks for subscribing!</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none pr-24"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-1 top-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm rounded-lg hover:from-green-400 hover:to-blue-500 transition-all disabled:opacity-50"
                      >
                        {loading ? '...' : 'Subscribe'}
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs">{error}</p>
                    )}
                    <p className="text-white/30 text-xs">
                      Get 10% off your first order
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-white font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-white/60 hover:text-pink-300 text-sm transition-colors flex items-center space-x-1 group"
                      >
                        {link.icon && (
                          <span className="text-lg group-hover:scale-110 transition-transform">
                            {link.icon}
                          </span>
                        )}
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="ml-2 px-2 py-0.5 bg-pink-500/20 text-pink-300 text-xs rounded-full">
                            {link.badge}
                          </span>
                        )}
                        {link.external && (
                          <span className="ml-1 text-xs">↗</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-white/40 text-sm text-center lg:text-left">
              {copyright}
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/40 hover:text-pink-300 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info Row */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mt-6 pt-6 border-t border-white/10">
            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center space-x-4">
                <span className="text-white/40 text-sm">Follow us:</span>
                <div className="flex space-x-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all ${social.color}`}
                      title={social.name}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {showPayment && (
              <div className="flex items-center space-x-4">
                <span className="text-white/40 text-sm">We accept:</span>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="px-2 py-1 bg-white/5 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-colors"
                      title={method.name}
                    >
                      {method.icon}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Selector */}
            {showLanguage && (
              <div className="flex items-center space-x-2">
                <span className="text-white/40 text-sm">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:border-pink-500 outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-white/40 text-xs">
              <span>🔒</span>
              <span>Secure SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40 text-xs">
              <span>🛡️</span>
              <span>Buyer Protection</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40 text-xs">
              <span>💰</span>
              <span>Price Match Guarantee</span>
            </div>
            <div className="flex items-center space-x-2 text-white/40 text-xs">
              <span>⭐</span>
              <span>4.9/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all z-50"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  )
}

// Compact Footer Variant
export function CompactFooter({
  className = ''
}: {
  className?: string
}) {
  return (
    <footer className={`bg-gradient-to-b from-gray-900 to-purple-900 border-t border-white/10 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💎</span>
            <span className="text-white font-bold">GEMS & STONES</span>
          </div>
          
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-white/40 hover:text-pink-300 text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-pink-300 text-sm">
              Terms
            </Link>
            <Link href="/contact" className="text-white/40 hover:text-pink-300 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Minimal Footer Variant
export function MinimalFooter({
  className = ''
}: {
  className?: string
}) {
  return (
    <footer className={`bg-transparent border-t border-white/10 py-6 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} GEMS & STONES. Created by{' '}
          <span className="text-pink-300">Hafiz Sajid Syed</span>
        </p>
      </div>
    </footer>
  )
}

// E-commerce Footer with Shopping Features
export function EcommerceFooter({
  className = ''
}: {
  className?: string
}) {
  const [showChat, setShowChat] = useState(false)

  return (
    <footer className={`bg-gradient-to-b from-gray-900 to-purple-900 border-t border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-white/60 hover:text-pink-300 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white/60 hover:text-pink-300 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/60 hover:text-pink-300 text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/60 hover:text-pink-300 text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-white/60 hover:text-pink-300 text-sm">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-white/60 hover:text-pink-300 text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-white/60 hover:text-pink-300 text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-white/60 hover:text-pink-300 text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-white/60 hover:text-pink-300 text-sm">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/60 hover:text-pink-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/60 hover:text-pink-300 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-pink-300 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-white/60 hover:text-pink-300 text-sm">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-white/60 text-sm">
                <span className="text-pink-300">📍</span>
                <span>123 Gem Street, New York, NY 10001</span>
              </li>
              <li className="flex items-start space-x-3 text-white/60 text-sm">
                <span className="text-pink-300">📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-white/60 text-sm">
                <span className="text-pink-300">✉️</span>
                <span>info@gems.com</span>
              </li>
              <li className="flex items-start space-x-3 text-white/60 text-sm">
                <span className="text-pink-300">⏰</span>
                <span>Mon-Fri: 9am - 6pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Live Chat Button */}
        <div className="fixed bottom-24 right-6">
          <button
            onClick={() => setShowChat(!showChat)}
            className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all"
          >
            💬
          </button>
        </div>

        {showChat && (
          <div className="fixed bottom-40 right-6 w-80 bg-gradient-to-b from-gray-900 to-purple-900 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600">
              <h4 className="text-white font-bold">Live Chat</h4>
            </div>
            <div className="p-4">
              <p className="text-white/80 text-sm mb-4">
                How can we help you today?
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg">
                Start Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}