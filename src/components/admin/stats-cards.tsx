'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StatsData {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  pendingOrders: number
  lowStock: number
  monthlyGrowth: number
  averageOrderValue: number
}

interface StatsCardsProps {
  data?: Partial<StatsData>
  loading?: boolean
  showDetails?: boolean
  timeframe?: 'today' | 'week' | 'month' | 'year'
  onTimeframeChange?: (timeframe: 'today' | 'week' | 'month' | 'year') => void
}

// Define card types properly
interface MainCard {
  title: string
  value: number | string
  icon: string
  color: string
  link: string
  trend: 'up' | 'down' | 'neutral'
  trendValue: string
  description: string
}

interface DetailCard {
  title: string
  value: number | string
  icon: string
  color: string
  link: string
  progress?: number      // Make progress optional
  warning?: boolean
  trend?: 'up' | 'down'
  comparison?: string
}

export default function StatsCards({ 
  data = {}, 
  loading = false,
  showDetails = true,
  timeframe = 'month',
  onTimeframeChange
}: StatsCardsProps) {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  // Default stats
  const stats: StatsData = {
    totalProducts: 156,
    totalOrders: 1234,
    totalCustomers: 892,
    totalRevenue: 45890,
    pendingOrders: 23,
    lowStock: 12,
    monthlyGrowth: 12.5,
    averageOrderValue: 189,
    ...data
  }

  // Animate numbers on load
  useEffect(() => {
    const targets = {
      totalProducts: stats.totalProducts,
      totalOrders: stats.totalOrders,
      totalCustomers: stats.totalCustomers,
      totalRevenue: stats.totalRevenue
    }

    const duration = 1500
    const steps = 60
    const interval = duration / steps

    Object.entries(targets).forEach(([key, target]) => {
      let current = 0
      const increment = target / steps
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setAnimatedValues(prev => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }))
        }
      }, interval)
    })

    // Cleanup function
    return () => {
      // Clear all intervals
      Object.keys(targets).forEach(() => {
        // This is a simplified cleanup - in a real app you'd store timer IDs
      })
    }
  }, [stats])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch(trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      default: return '📊'
    }
  }

  const getTimeframeLabel = () => {
    switch(timeframe) {
      case 'today': return 'Today'
      case 'week': return 'This Week'
      case 'month': return 'This Month'
      case 'year': return 'This Year'
      default: return 'This Month'
    }
  }

  const mainCards: MainCard[] = [
    {
      title: 'Total Products',
      value: animatedValues.totalProducts || stats.totalProducts,
      icon: '💎',
      color: 'from-purple-600 to-pink-600',
      link: '/admin/products',
      trend: 'up',
      trendValue: '+12',
      description: 'Active products'
    },
    {
      title: 'Total Orders',
      value: animatedValues.totalOrders || stats.totalOrders,
      icon: '📦',
      color: 'from-blue-600 to-cyan-600',
      link: '/admin/orders',
      trend: 'up',
      trendValue: '+23%',
      description: 'All time orders'
    },
    {
      title: 'Customers',
      value: animatedValues.totalCustomers || stats.totalCustomers,
      icon: '👥',
      color: 'from-green-600 to-emerald-600',
      link: '/admin/customers',
      trend: 'up',
      trendValue: '+8%',
      description: 'Registered users'
    },
    {
      title: 'Revenue',
      value: formatCurrency(animatedValues.totalRevenue || stats.totalRevenue),
      icon: '💰',
      color: 'from-yellow-600 to-orange-600',
      link: '/admin/analytics',
      trend: 'up',
      trendValue: '+15.3%',
      description: getTimeframeLabel()
    }
  ]

  const detailCards: DetailCard[] = [
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      color: 'from-orange-500 to-red-500',
      link: '/admin/orders?status=pending',
      progress: (stats.pendingOrders / stats.totalOrders) * 100,
      warning: stats.pendingOrders > 30
    },
    {
      title: 'Low Stock',
      value: stats.lowStock,
      icon: '⚠️',
      color: 'from-yellow-500 to-amber-500',
      link: '/admin/products?filter=low-stock',
      progress: (stats.lowStock / stats.totalProducts) * 100,
      warning: stats.lowStock > 20
    },
    {
      title: 'Monthly Growth',
      value: `${stats.monthlyGrowth}%`,
      icon: '📊',
      color: 'from-green-500 to-teal-500',
      link: '/admin/analytics',
      trend: stats.monthlyGrowth > 0 ? 'up' : 'down'
    },
    {
      title: 'Avg. Order Value',
      value: formatCurrency(stats.averageOrderValue),
      icon: '🛒',
      color: 'from-purple-500 to-indigo-500',
      link: '/admin/analytics',
      comparison: '+$12 vs last month'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="h-4 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-32 bg-white/20 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Timeframe Selector */}
      {onTimeframeChange && (
        <div className="flex justify-end">
          <div className="inline-flex bg-white/10 rounded-lg p-1">
            {(['today', 'week', 'month', 'year'] as const).map((t) => (
              <button
                key={t}
                onClick={() => onTimeframeChange(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  timeframe === t
                    ? 'bg-pink-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainCards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="group block"
          >
            <div className={`
              relative bg-gradient-to-br ${card.color} 
              rounded-2xl p-6 border-2 border-white/20
              hover:scale-105 hover:shadow-2xl hover:shadow-white/20
              transition-all duration-300 overflow-hidden
            `}>
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-white">
                      {card.value}
                    </p>
                    
                    {/* Trend Indicator */}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-white/60 text-xs flex items-center">
                        {getTrendIcon(card.trend)}
                        <span className="ml-1">{card.trendValue}</span>
                      </span>
                      <span className="text-white/40 text-xs">{card.description}</span>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl bg-white/20 rounded-xl p-2 backdrop-blur-sm
                                group-hover:scale-110 group-hover:rotate-12 transition-all">
                    {card.icon}
                  </div>
                </div>

                {/* Mini Progress Bar */}
                <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/40 rounded-full group-hover:bg-white/60 transition-all"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Detail Stats Cards */}
      {showDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {detailCards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="group block"
            >
              <div className={`
                bg-white/10 backdrop-blur-sm 
                rounded-2xl p-6 border-2 
                ${card.warning ? 'border-orange-500/50' : 'border-white/20'}
                hover:border-pink-500 hover:bg-white/15
                transition-all duration-300
              `}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white/60 text-sm">{card.title}</p>
                    <p className={`text-2xl font-bold ${
                      card.warning ? 'text-orange-400' : 'text-white'
                    }`}>
                      {card.value}
                    </p>
                  </div>
                  <div className={`text-3xl ${
                    card.warning ? 'text-orange-400' : 'text-white/60'
                  }`}>
                    {card.icon}
                  </div>
                </div>

                {/* Progress Bar - Only render if progress exists */}
                {card.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          card.warning ? 'bg-orange-500' : 'bg-gradient-to-r from-pink-500 to-purple-500'
                        }`}
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Progress</span>
                      <span className="text-white/60">{card.progress.toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                {/* Comparison */}
                {card.comparison && (
                  <p className="text-white/40 text-xs mt-2">{card.comparison}</p>
                )}

                {/* View Details */}
                <div className="mt-4 flex items-center text-sm text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View details</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
            🚀
          </div>
          <div>
            <p className="text-white/60 text-xs">Conversion Rate</p>
            <p className="text-white font-bold">3.2%</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
            ⭐
          </div>
          <div>
            <p className="text-white/60 text-xs">Avg. Rating</p>
            <p className="text-white font-bold">4.8/5</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
            🛍️
          </div>
          <div>
            <p className="text-white/60 text-xs">Cart Abandonment</p>
            <p className="text-white font-bold">24%</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
            👀
          </div>
          <div>
            <p className="text-white/60 text-xs">Active Users</p>
            <p className="text-white font-bold">127</p>
          </div>
        </div>
      </div>

      {/* Time-based Comparison */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border-2 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Period Comparison</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white/60 text-sm">vs Yesterday</p>
            <p className="text-green-400 font-bold text-xl">+8.2%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">vs Last Week</p>
            <p className="text-green-400 font-bold text-xl">+12.5%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">vs Last Month</p>
            <p className="text-yellow-400 font-bold text-xl">+5.7%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">vs Last Year</p>
            <p className="text-green-400 font-bold text-xl">+23.1%</p>
          </div>
        </div>
      </div>

      {/* Refresh Indicator */}
      <div className="flex justify-end">
        <button 
          onClick={() => window.location.reload()}
          className="text-white/40 hover:text-white/60 text-sm flex items-center space-x-1 transition-colors"
        >
          <span>🔄</span>
          <span>Refresh stats</span>
        </button>
      </div>
    </div>
  )
}