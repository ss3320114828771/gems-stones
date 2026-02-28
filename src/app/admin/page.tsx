'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Simple auth check
const checkAuth = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('admin-logged-in') === 'true'
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authorized = checkAuth()
    if (!authorized) {
      router.push('/admin/login')
    } else {
      setIsAuthorized(true)
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-pink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">💎</div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Admin Navigation */}
      <nav className="bg-gradient-to-r from-purple-800 to-pink-800 shadow-2xl fixed top-16 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">👑</span>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('admin-logged-in')
                router.push('/')
              }}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Administrator
              </span>
            </h1>
            <p className="text-white/60">Manage your store, products, and orders from one place.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 border-2 border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-white">156</p>
                </div>
                <span className="text-3xl">💎</span>
              </div>
              <Link href="/admin/products" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
                Manage Products →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 border-2 border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-white">89</p>
                </div>
                <span className="text-3xl">📦</span>
              </div>
              <Link href="/admin/orders" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
                Manage Orders →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 border-2 border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-white">234</p>
                </div>
                <span className="text-3xl">👥</span>
              </div>
              <Link href="/admin/users" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
                Manage Users →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-6 border-2 border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm">Revenue</p>
                  <p className="text-3xl font-bold text-white">$45.8k</p>
                </div>
                <span className="text-3xl">💰</span>
              </div>
              <Link href="/admin/analytics" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
                View Analytics →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/admin/products/create"
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-center hover:scale-105 transition-all border-2 border-white/20"
            >
              <div className="text-4xl mb-2">➕</div>
              <h3 className="text-white font-bold text-lg">Add New Product</h3>
              <p className="text-white/60 text-sm mt-2">Create a new product listing</p>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-center hover:scale-105 transition-all border-2 border-white/20"
            >
              <div className="text-4xl mb-2">📦</div>
              <h3 className="text-white font-bold text-lg">Process Orders</h3>
              <p className="text-white/60 text-sm mt-2">View and update orders</p>
            </Link>

            <Link
              href="/admin/users"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-center hover:scale-105 transition-all border-2 border-white/20"
            >
              <div className="text-4xl mb-2">👥</div>
              <h3 className="text-white font-bold text-lg">Manage Users</h3>
              <p className="text-white/60 text-sm mt-2">View and manage customers</p>
            </Link>
          </div>

          {/* Recent Orders */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
              <Link href="/admin/orders" className="text-pink-300 hover:text-pink-200">
                View All →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/60 border-b border-white/10">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="text-white hover:bg-white/5">
                      <td className="py-3">#ORD-100{i}</td>
                      <td className="py-3">John Doe</td>
                      <td className="py-3 text-yellow-300">${(299 + i * 100)}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          i === 1 ? 'bg-green-500' : 
                          i === 2 ? 'bg-blue-500' : 
                          i === 3 ? 'bg-yellow-500' : 
                          i === 4 ? 'bg-purple-500' : 'bg-red-500'
                        } text-white`}>
                          {i === 1 ? 'Completed' : 
                           i === 2 ? 'Processing' : 
                           i === 3 ? 'Pending' : 
                           i === 4 ? 'Shipped' : 'Cancelled'}
                        </span>
                      </td>
                      <td className="py-3 text-white/60">2024-01-{15 - i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admin Info */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Logged in as <span className="text-yellow-300">Hafiz Sajid Syed</span>
            </p>
            <p className="text-white/40 text-xs mt-1">sajid.syed@gmail.com</p>
          </div>
        </div>
      </main>
    </div>
  )
}