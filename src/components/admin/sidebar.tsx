'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  className?: string
}

export default function AdminSidebar({ className = '' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileOpen])

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: '📊', color: 'from-blue-500 to-cyan-500' },
        { name: 'Products', href: '/admin/products', icon: '💎', color: 'from-purple-500 to-pink-500' },
        { name: 'Orders', href: '/admin/orders', icon: '📦', color: 'from-green-500 to-emerald-500' },
        { name: 'Customers', href: '/admin/customers', icon: '👥', color: 'from-yellow-500 to-orange-500' },
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { name: 'Categories', href: '/admin/categories', icon: '📑', color: 'from-indigo-500 to-purple-500' },
        { name: 'Inventory', href: '/admin/inventory', icon: '📊', color: 'from-teal-500 to-green-500' },
        { name: 'Reviews', href: '/admin/reviews', icon: '⭐', color: 'from-yellow-500 to-amber-500' },
        { name: 'Discounts', href: '/admin/discounts', icon: '🏷️', color: 'from-red-500 to-pink-500' },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'Settings', href: '/admin/settings', icon: '⚙️', color: 'from-gray-500 to-slate-500' },
        { name: 'Analytics', href: '/admin/analytics', icon: '📈', color: 'from-blue-500 to-indigo-500' },
        { name: 'Reports', href: '/admin/reports', icon: '📋', color: 'from-purple-500 to-violet-500' },
      ]
    }
  ]

  const quickActions = [
    { name: 'Add Product', href: '/admin/products/create', icon: '➕', color: 'green' },
    { name: 'New Order', href: '/admin/orders/create', icon: '📝', color: 'blue' },
    { name: 'View Store', href: '/', icon: '🏠', color: 'purple', external: true },
  ]

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href
    }
    return pathname?.startsWith(href) || false
  }

  const getItemClass = (href: string) => {
    const baseClass = 'flex items-center rounded-xl transition-all duration-200 '
    if (isCollapsed) {
      return baseClass + 'justify-center p-3'
    }
    return baseClass + 'px-4 py-3 space-x-3'
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform"
      >
        {isMobileOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-48 left-0 bottom-0 z-40
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900
        border-r border-white/10
        overflow-y-auto overflow-x-hidden
        custom-scrollbar
        ${className}
      `}>
        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl items-center justify-center text-white text-sm hover:scale-110 transition-transform z-10"
        >
          {isCollapsed ? '→' : '←'}
        </button>

        <div className="p-4 space-y-6">
          {/* Logo/Brand */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-2'}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              👑
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-white font-bold">Admin Panel</h2>
                <p className="text-white/40 text-xs">v2.0.0</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="space-y-2">
              <p className="text-white/40 text-xs px-2">QUICK ACTIONS</p>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    className="flex flex-col items-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all group"
                    title={action.name}
                  >
                    <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{action.icon}</span>
                    <span className="text-white/60 text-[10px]">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Menu Sections */}
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-2">
              {!isCollapsed && (
                <p className="text-white/40 text-xs px-2">{section.title}</p>
              )}
              
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      ${getItemClass(item.href)}
                      ${active 
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }
                      ${isCollapsed ? 'tooltip-left' : ''}
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <span className={`text-xl ${active ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 font-medium">{item.name}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}

          {/* User Info Section */}
          {!isCollapsed && (
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  H
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">Hafiz Sajid</p>
                  <p className="text-white/40 text-xs">Administrator</p>
                </div>
              </div>

              {/* Storage Indicator */}
              <div className="mt-3 px-2">
                <div className="flex justify-between text-white/40 text-xs mb-1">
                  <span>Storage</span>
                  <span>45%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* Collapsed User Icon */}
          {isCollapsed && (
            <div className="pt-4 mt-4 border-t border-white/10 flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                H
              </div>
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
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
        
        .tooltip-left {
          position: relative;
        }
        .tooltip-left:hover::after {
          content: attr(title);
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          margin-left: 8px;
          z-index: 50;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  )
}