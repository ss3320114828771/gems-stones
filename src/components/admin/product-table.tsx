'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string | number
  name: string
  price: number
  stock: number
  category: string
  image: string
  status: 'active' | 'inactive' | 'draft'
  featured?: boolean
  sku?: string
  createdAt?: string
}

interface ProductTableProps {
  products?: Product[]
  onEdit?: (product: Product) => void
  onDelete?: (productId: string | number) => void
  onStatusChange?: (productId: string | number, newStatus: string) => void
  showFilters?: boolean
  showBulkActions?: boolean
}

export default function ProductTable({ 
  products: propProducts,
  onEdit,
  onDelete,
  onStatusChange,
  showFilters = true,
  showBulkActions = true
}: ProductTableProps) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Default products if none provided
  const defaultProducts: Product[] = [
    { 
      id: 1, 
      name: 'Ruby Stone', 
      price: 299, 
      stock: 15, 
      category: 'Precious', 
      image: '/n1.jpeg', 
      status: 'active',
      featured: true,
      sku: 'RUB-001',
      createdAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Sapphire', 
      price: 399, 
      stock: 8, 
      category: 'Precious', 
      image: '/n2.jpeg', 
      status: 'active',
      featured: true,
      sku: 'SAP-002',
      createdAt: '2024-01-14'
    },
    { 
      id: 3, 
      name: 'Emerald', 
      price: 499, 
      stock: 12, 
      category: 'Precious', 
      image: '/n3.jpeg', 
      status: 'active',
      featured: false,
      sku: 'EMR-003',
      createdAt: '2024-01-14'
    },
    { 
      id: 4, 
      name: 'Diamond', 
      price: 999, 
      stock: 5, 
      category: 'Precious', 
      image: '/n4.jpeg', 
      status: 'active',
      featured: true,
      sku: 'DIA-004',
      createdAt: '2024-01-13'
    },
    { 
      id: 5, 
      name: 'Amethyst', 
      price: 199, 
      stock: 20, 
      category: 'Semi-Precious', 
      image: '/n5.jpeg', 
      status: 'inactive',
      featured: false,
      sku: 'AME-005',
      createdAt: '2024-01-13'
    },
    { 
      id: 6, 
      name: 'Topaz', 
      price: 249, 
      stock: 18, 
      category: 'Semi-Precious', 
      image: '/n6.jpeg', 
      status: 'active',
      featured: false,
      sku: 'TOP-006',
      createdAt: '2024-01-12'
    },
    { 
      id: 7, 
      name: 'Garnet', 
      price: 179, 
      stock: 25, 
      category: 'Semi-Precious', 
      image: '/n1.jpeg', 
      status: 'draft',
      featured: false,
      sku: 'GAR-007',
      createdAt: '2024-01-12'
    },
    { 
      id: 8, 
      name: 'Opal', 
      price: 349, 
      stock: 7, 
      category: 'Precious', 
      image: '/n2.jpeg', 
      status: 'active',
      featured: true,
      sku: 'OPA-008',
      createdAt: '2024-01-11'
    },
    { 
      id: 9, 
      name: 'Aquamarine', 
      price: 449, 
      stock: 6, 
      category: 'Precious', 
      image: '/n3.jpeg', 
      status: 'active',
      featured: false,
      sku: 'AQU-009',
      createdAt: '2024-01-11'
    },
    { 
      id: 10, 
      name: 'Citrine', 
      price: 159, 
      stock: 22, 
      category: 'Semi-Precious', 
      image: '/n4.jpeg', 
      status: 'active',
      featured: false,
      sku: 'CIT-010',
      createdAt: '2024-01-10'
    },
    { 
      id: 11, 
      name: 'Turquoise', 
      price: 289, 
      stock: 14, 
      category: 'Semi-Precious', 
      image: '/n5.jpeg', 
      status: 'active',
      featured: false,
      sku: 'TUR-011',
      createdAt: '2024-01-10'
    },
    { 
      id: 12, 
      name: 'Peridot', 
      price: 199, 
      stock: 16, 
      category: 'Semi-Precious', 
      image: '/n6.jpeg', 
      status: 'draft',
      featured: false,
      sku: 'PER-012',
      createdAt: '2024-01-09'
    }
  ]

  const products = propProducts || defaultProducts

  // Filter products
  const filteredProducts = products.filter(product => {
    // Status filter
    if (filter !== 'all' && product.status !== filter) return false
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.sku?.toLowerCase().includes(searchLower) ||
        `$${product.price}`.includes(searchLower)
      )
    }
    
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
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

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const requestSort = (key: keyof Product) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const getStatusColor = (status: Product['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'draft': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id))
    }
  }

  const toggleSelect = (id: string | number) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) {
      alert('Please select products first')
      return
    }
    
    switch(action) {
      case 'activate':
        if (confirm(`Activate ${selectedProducts.length} products?`)) {
          alert(`${selectedProducts.length} products activated`)
          setSelectedProducts([])
        }
        break
      case 'deactivate':
        if (confirm(`Deactivate ${selectedProducts.length} products?`)) {
          alert(`${selectedProducts.length} products deactivated`)
          setSelectedProducts([])
        }
        break
      case 'delete':
        if (confirm(`Delete ${selectedProducts.length} products? This action cannot be undone.`)) {
          alert(`${selectedProducts.length} products deleted`)
          setSelectedProducts([])
        }
        break
      case 'feature':
        alert(`Featured ${selectedProducts.length} products`)
        setSelectedProducts([])
        break
      default:
        break
    }
  }

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    inactive: products.filter(p => p.status === 'inactive').length,
    draft: products.filter(p => p.status === 'draft').length,
    featured: products.filter(p => p.featured).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-green-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Active</p>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-gray-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Inactive</p>
          <p className="text-2xl font-bold text-white">{stats.inactive}</p>
        </div>
        <div className="bg-yellow-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Draft</p>
          <p className="text-2xl font-bold text-white">{stats.draft}</p>
        </div>
        <div className="bg-blue-600 rounded-xl p-4">
          <p className="text-white/80 text-xs">Featured</p>
          <p className="text-2xl font-bold text-white">{stats.featured}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-4">
          <p className="text-white/80 text-xs">Inventory Value</p>
          <p className="text-lg font-bold text-white">{formatCurrency(stats.totalValue)}</p>
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
                <option value="all">All Products</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-white/80 text-sm mb-2">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, SKU, category..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none pl-10"
                />
                <span className="absolute left-3 top-3 text-white/40">🔍</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-white/80 text-sm mb-2">Category</label>
              <select
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="precious">Precious</option>
                <option value="semi">Semi-Precious</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {showBulkActions && selectedProducts.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 flex flex-wrap items-center justify-between">
          <span className="text-white font-medium">
            {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBulkAction('activate')}
              className="px-4 py-2 bg-green-500/20 text-green-200 rounded-lg hover:bg-green-500/30 transition-all text-sm"
            >
              ✓ Activate
            </button>
            <button
              onClick={() => handleBulkAction('deactivate')}
              className="px-4 py-2 bg-gray-500/20 text-gray-200 rounded-lg hover:bg-gray-500/30 transition-all text-sm"
            >
              ✗ Deactivate
            </button>
            <button
              onClick={() => handleBulkAction('feature')}
              className="px-4 py-2 bg-yellow-500/20 text-yellow-200 rounded-lg hover:bg-yellow-500/30 transition-all text-sm"
            >
              ⭐ Feature
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-all text-sm"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => setSelectedProducts([])}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-3 w-8">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-pink-500"
                />
              </th>
              <th className="pb-3">Image</th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('name')}>
                Product {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3">SKU</th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('category')}>
                Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('price')}>
                Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('stock')}>
                Stock {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Featured</th>
              <th className="pb-3 cursor-pointer hover:text-white" onClick={() => requestSort('createdAt')}>
                Created {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="text-white hover:bg-white/5 group">
                <td className="py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    className="w-4 h-4 accent-pink-500"
                  />
                </td>
                <td className="py-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white/20 group-hover:border-pink-500 transition-all">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="py-3">
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-white/40 text-xs">{product.sku}</p>
                  </div>
                </td>
                <td className="py-3 font-mono text-sm text-white/60">{product.sku}</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-white/10 rounded-lg text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="py-3 text-yellow-300 font-bold">{formatCurrency(product.price)}</td>
                <td className="py-3">
                  <span className={product.stock < 10 ? 'text-orange-400' : 'text-green-400'}>
                    {product.stock}
                  </span>
                  {product.stock < 10 && (
                    <span className="ml-2 text-xs text-orange-400/60">(Low)</span>
                  )}
                </td>
                <td className="py-3">
                  <select
                    value={product.status}
                    onChange={(e) => onStatusChange?.(product.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(product.status)} border-0 cursor-pointer`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </td>
                <td className="py-3">
                  {product.featured ? (
                    <span className="text-yellow-400 text-xl">⭐</span>
                  ) : (
                    <span className="text-white/20 text-xl">☆</span>
                  )}
                </td>
                <td className="py-3 text-white/60 text-sm">{formatDate(product.createdAt)}</td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/products/${product.id}`}
                      target="_blank"
                      className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all"
                      title="View"
                    >
                      👁️
                    </Link>
                    <button
                      onClick={() => onDelete?.(product.id)}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results */}
        {paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-white/60 text-lg">No products found</p>
            <Link 
              href="/admin/products/create"
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} products
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  currentPage === i + 1
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all text-sm flex items-center space-x-2">
          <span>📥</span>
          <span>Export CSV</span>
        </button>
        <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all text-sm flex items-center space-x-2">
          <span>📊</span>
          <span>Print Report</span>
        </button>
      </div>
    </div>
  )
}