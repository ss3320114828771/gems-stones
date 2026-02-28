'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
  }
  items: number
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  date: string
}

interface OrderTableProps {
  orders?: Order[]
  showFilters?: boolean
  onStatusChange?: (orderId: string, newStatus: string) => void
}

export default function OrderTable({ 
  orders: propOrders, 
  showFilters = true,
  onStatusChange 
}: OrderTableProps) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  // Default orders if none provided
  const defaultOrders: Order[] = [
    {
      id: '1',
      orderNumber: '#ORD-1001',
      customer: { name: 'John Doe', email: 'john@email.com' },
      items: 2,
      total: 599,
      status: 'completed',
      paymentStatus: 'paid',
      date: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: '#ORD-1002',
      customer: { name: 'Jane Smith', email: 'jane@email.com' },
      items: 3,
      total: 899,
      status: 'processing',
      paymentStatus: 'paid',
      date: '2024-01-14'
    },
    {
      id: '3',
      orderNumber: '#ORD-1003',
      customer: { name: 'Bob Wilson', email: 'bob@email.com' },
      items: 1,
      total: 299,
      status: 'pending',
      paymentStatus: 'unpaid',
      date: '2024-01-14'
    },
    {
      id: '4',
      orderNumber: '#ORD-1004',
      customer: { name: 'Alice Brown', email: 'alice@email.com' },
      items: 4,
      total: 1299,
      status: 'completed',
      paymentStatus: 'paid',
      date: '2024-01-13'
    },
    {
      id: '5',
      orderNumber: '#ORD-1005',
      customer: { name: 'Charlie Lee', email: 'charlie@email.com' },
      items: 2,
      total: 449,
      status: 'processing',
      paymentStatus: 'paid',
      date: '2024-01-13'
    },
    {
      id: '6',
      orderNumber: '#ORD-1006',
      customer: { name: 'Diana Prince', email: 'diana@email.com' },
      items: 2,
      total: 799,
      status: 'cancelled',
      paymentStatus: 'refunded',
      date: '2024-01-12'
    },
    {
      id: '7',
      orderNumber: '#ORD-1007',
      customer: { name: 'Bruce Wayne', email: 'bruce@email.com' },
      items: 5,
      total: 2499,
      status: 'pending',
      paymentStatus: 'unpaid',
      date: '2024-01-12'
    }
  ]

  const orders = propOrders || defaultOrders

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (filter !== 'all' && order.status !== filter) return false
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower)
      )
    }
    
    return true
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
    if (sortConfig.key === 'customer') {
      return sortConfig.direction === 'asc'
        ? a.customer.name.localeCompare(b.customer.name)
        : b.customer.name.localeCompare(a.customer.name)
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue
    }
    
    return 0
  })

  const requestSort = (key: keyof Order) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch(status) {
      case 'paid': return 'text-green-400'
      case 'unpaid': return 'text-yellow-400'
      case 'refunded': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id)
        ? prev.filter(orderId => orderId !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action: string) => {
    if (selectedOrders.length === 0) return
    
    switch(action) {
      case 'process':
        alert(`Processing ${selectedOrders.length} orders`)
        break
      case 'complete':
        alert(`Completing ${selectedOrders.length} orders`)
        break
      case 'cancel':
        if (confirm(`Cancel ${selectedOrders.length} orders?`)) {
          alert('Orders cancelled')
        }
        break
      default:
        break
    }
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-yellow-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Pending</p>
          <p className="text-2xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="bg-blue-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Processing</p>
          <p className="text-2xl font-bold text-white">{stats.processing}</p>
        </div>
        <div className="bg-green-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Completed</p>
          <p className="text-2xl font-bold text-white">{stats.completed}</p>
        </div>
        <div className="bg-red-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Cancelled</p>
          <p className="text-2xl font-bold text-white">{stats.cancelled}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-4">
          <p className="text-white/80 text-xs">Revenue</p>
          <p className="text-xl font-bold text-white">${stats.revenue}</p>
        </div>
      </div>

      {/* Filters and Search */}
      {showFilters && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-white/80 text-sm mb-2">Filter by Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-white/80 text-sm mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order #, customer name or email..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none"
              />
            </div>

            {/* Bulk Actions */}
            {selectedOrders.length > 0 && (
              <div className="flex-1">
                <label className="block text-white/80 text-sm mb-2">
                  Bulk Actions ({selectedOrders.length} selected)
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('process')}
                    className="flex-1 px-4 py-3 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30"
                  >
                    Process
                  </button>
                  <button
                    onClick={() => handleBulkAction('complete')}
                    className="flex-1 px-4 py-3 bg-green-500/20 text-green-300 rounded-xl hover:bg-green-500/30"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleBulkAction('cancel')}
                    className="flex-1 px-4 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-3 w-8">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-pink-500"
                />
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('orderNumber')}>
                Order # {sortConfig.key === 'orderNumber' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('customer')}>
                Customer {sortConfig.key === 'customer' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('items')}>
                Items {sortConfig.key === 'items' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('total')}>
                Total {sortConfig.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('status')}>
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3">Payment</th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('date')}>
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {sortedOrders.map((order) => (
              <tr key={order.id} className="text-white hover:bg-white/5">
                <td className="py-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    className="w-4 h-4 accent-pink-500"
                  />
                </td>
                <td className="py-3 font-mono font-bold">{order.orderNumber}</td>
                <td className="py-3">
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-white/60 text-sm">{order.customer.email}</p>
                  </div>
                </td>
                <td className="py-3 text-center">{order.items}</td>
                <td className="py-3 text-yellow-300 font-bold">{formatCurrency(order.total)}</td>
                <td className="py-3">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange?.(order.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(order.status)} border-0 cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3">
                  <span className={`font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3 text-white/60">{formatDate(order.date)}</td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => alert(`Invoice for ${order.orderNumber}`)}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 text-sm"
                    >
                      Invoice
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No results */}
        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-white/60 text-lg">No orders found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-white/60 text-sm">
          Showing {sortedOrders.length} of {orders.length} orders
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            1
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            2
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            3
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}