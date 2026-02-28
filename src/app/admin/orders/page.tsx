'use client'

import { useState } from 'react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    { id: '#1001', customer: 'John Doe', email: 'john@email.com', amount: 599, status: 'completed', items: 2, date: '2024-01-15' },
    { id: '#1002', customer: 'Jane Smith', email: 'jane@email.com', amount: 899, status: 'processing', items: 3, date: '2024-01-14' },
    { id: '#1003', customer: 'Bob Wilson', email: 'bob@email.com', amount: 299, status: 'pending', items: 1, date: '2024-01-14' },
    { id: '#1004', customer: 'Alice Brown', email: 'alice@email.com', amount: 1299, status: 'completed', items: 4, date: '2024-01-13' },
    { id: '#1005', customer: 'Charlie Lee', email: 'charlie@email.com', amount: 449, status: 'processing', items: 2, date: '2024-01-13' },
    { id: '#1006', customer: 'Diana Prince', email: 'diana@email.com', amount: 799, status: 'cancelled', items: 2, date: '2024-01-12' },
  ])

  const [filter, setFilter] = useState('all')

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
          Orders Management
        </span>
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full capitalize ${
              filter === status
                ? 'bg-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            } transition-all`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="text-white hover:bg-white/5">
                <td className="py-3 font-bold">{order.id}</td>
                <td className="py-3">{order.customer}</td>
                <td className="py-3 text-white/60">{order.email}</td>
                <td className="py-3">{order.items}</td>
                <td className="py-3 text-yellow-300 font-bold">${order.amount}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-white/60">{order.date}</td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30">View</button>
                    <button className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30">Update</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-white">$43,234</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white">156</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Pending</p>
          <p className="text-2xl font-bold text-white">23</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Completed</p>
          <p className="text-2xl font-bold text-white">98</p>
        </div>
      </div>
    </div>
  )
}