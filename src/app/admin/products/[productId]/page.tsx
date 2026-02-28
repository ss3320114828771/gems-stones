'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function AdminProductDetailPage() {
  const { productId } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')

  // Fetch product data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock product data
      setProduct({
        id: productId,
        name: 'Ruby Stone',
        price: 299,
        originalPrice: 399,
        category: 'precious',
        subcategory: 'ruby',
        description: 'Natural certified ruby with deep red color. Perfect for jewelry and collection.',
        shortDescription: 'Natural certified ruby',
        sku: 'RUB-001',
        stock: 15,
        inStock: true,
        image: '/n1.jpeg',
        images: ['/n1.jpeg', '/n2.jpeg', '/n3.jpeg'],
        weight: '2.5 carats',
        origin: 'Myanmar',
        clarity: 'VS',
        cut: 'Oval',
        rating: 4.8,
        reviewCount: 124,
        featured: true,
        isNew: false,
        isOnSale: true,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        status: 'active'
      })
      setLoading(false)
    }, 1000)
  }, [productId])

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      // In real app, call API to delete
      alert('Product deleted successfully')
      router.push('/admin/products')
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">💎</div>
          <p className="text-white text-xl">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-white mb-4">Product Not Found</h2>
          <Link href="/admin/products" className="text-pink-300 hover:text-pink-200">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
              Product Details
            </span>
          </h1>
          <p className="text-white/60 mt-2">Viewing product: {product.name}</p>
        </div>

        <div className="flex space-x-3">
          <Link
            href={`/admin/products/${productId}/edit`}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all flex items-center space-x-2"
          >
            <span>✏️</span>
            <span>Edit Product</span>
          </Link>
          
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all flex items-center space-x-2"
          >
            <span>🗑️</span>
            <span>Delete</span>
          </button>
          
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white/5 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-white/60">Status:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            product.status === 'active' ? 'bg-green-500' : 
            product.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
          } text-white`}>
            {product.status}
          </span>
          <span className="text-white/60">Stock:</span>
          <span className={`font-bold ${product.stock > 10 ? 'text-green-400' : 'text-orange-400'}`}>
            {product.stock} units
          </span>
        </div>
        <div className="text-white/40 text-sm">
          Last updated: {formatDate(product.updatedAt)}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {['details', 'images', 'inventory', 'seo'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-all ${
              activeTab === tab
                ? 'text-pink-300 border-b-2 border-pink-300'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-white/40 text-sm">Product ID</dt>
                    <dd className="text-white font-mono">{product.id}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 text-sm">SKU</dt>
                    <dd className="text-white">{product.sku}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 text-sm">Name</dt>
                    <dd className="text-white">{product.name}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 text-sm">Category</dt>
                    <dd className="text-white capitalize">{product.category}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 text-sm">Subcategory</dt>
                    <dd className="text-white capitalize">{product.subcategory || '—'}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-white/40 text-sm">Price</dt>
                    <dd className="text-white text-2xl font-bold text-yellow-300">${product.price}</dd>
                  </div>
                  {product.originalPrice && (
                    <div>
                      <dt className="text-white/40 text-sm">Original Price</dt>
                      <dd className="text-white line-through">${product.originalPrice}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-white/40 text-sm">Discount</dt>
                    <dd className="text-green-400">
                      {product.originalPrice ? 
                        `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off` 
                        : 'No discount'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
              <p className="text-white/80 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product Details</h3>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <dt className="text-white/40 text-sm">Weight</dt>
                  <dd className="text-white font-medium">{product.weight}</dd>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <dt className="text-white/40 text-sm">Origin</dt>
                  <dd className="text-white font-medium">{product.origin}</dd>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <dt className="text-white/40 text-sm">Clarity</dt>
                  <dd className="text-white font-medium">{product.clarity}</dd>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <dt className="text-white/40 text-sm">Cut</dt>
                  <dd className="text-white font-medium">{product.cut}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Product Images</h3>
            
            {/* Main Image */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Main Image</label>
              <div className="relative h-80 rounded-xl overflow-hidden border-2 border-white/20 max-w-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Additional Images ({product.images.length})</label>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative h-32 rounded-xl overflow-hidden border-2 border-white/20">
                    <Image
                      src={img}
                      alt={`Product image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Inventory Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white/60 text-sm">Current Stock</p>
                <p className="text-4xl font-bold text-white mt-2">{product.stock}</p>
                <p className="text-white/40 text-xs mt-2">units available</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white/60 text-sm">Low Stock Threshold</p>
                <p className="text-4xl font-bold text-white mt-2">5</p>
                <p className="text-white/40 text-xs mt-2">alert when below</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white/60 text-sm">Status</p>
                <p className={`text-2xl font-bold mt-2 ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Recent Stock Movements */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Recent Stock Movements</h4>
              <table className="w-full">
                <thead className="text-white/40 text-sm border-b border-white/10">
                  <tr>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Type</th>
                    <th className="py-2 text-left">Quantity</th>
                    <th className="py-2 text-left">Reason</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr>
                    <td className="py-2">2024-01-15</td>
                    <td className="py-2 text-green-400">+15</td>
                    <td className="py-2">Initial stock</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">SEO Information</h3>
            
            <div>
              <label className="block text-white/60 text-sm mb-2">Meta Title</label>
              <input
                type="text"
                value={`${product.name} - Precious Gems & Stones`}
                readOnly
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 focus:border-pink-500 outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Meta Description</label>
              <textarea
                rows={3}
                value={product.description.slice(0, 160)}
                readOnly
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 focus:border-pink-500 outline-none cursor-not-allowed"
              />
              <p className="text-white/40 text-xs mt-1">{product.description.length} characters</p>
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">URL Slug</label>
              <div className="flex items-center">
                <span className="text-white/40 px-3">/products/</span>
                <input
                  type="text"
                  value={product.name.toLowerCase().replace(/\s+/g, '-')}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 focus:border-pink-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="bg-white/5 rounded-xl p-4 text-sm text-white/40">
        <div className="flex justify-between">
          <span>Created: {formatDate(product.createdAt)}</span>
          <span>Updated: {formatDate(product.updatedAt)}</span>
        </div>
      </div>

      {/* Admin Info */}
      <div className="text-center text-white/40 text-sm pt-4">
        <p>Hafiz Sajid Syed - Administrator</p>
        <p>sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}