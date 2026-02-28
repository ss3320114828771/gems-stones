'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  })

  const [recentOrders, setRecentOrders] = useState([
    { id: '#1001', customer: 'John Doe', amount: 599, status: 'completed', date: '2024-01-15' },
    { id: '#1002', customer: 'Jane Smith', amount: 899, status: 'processing', date: '2024-01-14' },
    { id: '#1003', customer: 'Bob Wilson', amount: 299, status: 'pending', date: '2024-01-14' },
    { id: '#1004', customer: 'Alice Brown', amount: 1299, status: 'completed', date: '2024-01-13' },
    { id: '#1005', customer: 'Charlie Lee', amount: 449, status: 'processing', date: '2024-01-13' },
  ])

  // Simulate loading stats
  useEffect(() => {
    setStats({
      totalProducts: 156,
      totalOrders: 89,
      totalUsers: 234,
      revenue: 45890
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-white/60">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 border-2 border-white/20 transform hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm">Total Products</p>
              <p className="text-4xl font-bold text-white mt-2">{stats.totalProducts}</p>
            </div>
            <div className="text-4xl">💎</div>
          </div>
          <Link href="/admin/products" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
            View all →
          </Link>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 border-2 border-white/20 transform hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm">Total Orders</p>
              <p className="text-4xl font-bold text-white mt-2">{stats.totalOrders}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <Link href="/admin/orders" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
            View all →
          </Link>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 border-2 border-white/20 transform hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm">Total Users</p>
              <p className="text-4xl font-bold text-white mt-2">{stats.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
          <Link href="/admin/users" className="mt-4 inline-block text-white/60 hover:text-white text-sm">
            View all →
          </Link>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-6 border-2 border-white/20 transform hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm">Revenue</p>
              <p className="text-4xl font-bold text-white mt-2">${stats.revenue.toLocaleString()}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <p className="mt-4 text-white/60 text-sm">+12.5% from last month</p>
        </div>
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
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentOrders.map((order) => (
                <tr key={order.id} className="text-white hover:bg-white/5">
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 font-bold text-yellow-300">${order.amount}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)} text-white`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-white/60">{order.date}</td>
                  <td className="py-3">
                    <button className="text-pink-300 hover:text-pink-200">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-2xl text-white font-bold hover:scale-105 transition-all border-2 border-white/20">
          ➕ Add New Product
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white font-bold hover:scale-105 transition-all border-2 border-white/20">
          📦 Process Orders
        </button>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl text-white font-bold hover:scale-105 transition-all border-2 border-white/20">
          📊 Generate Report
        </button>
      </div>

      {/* Admin Info */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-white/20 text-center">
        <p className="text-white">
          Logged in as <span className="text-yellow-300 font-bold">Hafiz Sajid Syed</span> (Administrator)
        </p>
        <p className="text-white/60 text-sm mt-2">sajid.syed@gmail.com | hafizsajid@gmail.com</p>
      </div>
    </div>
  )
}