'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function EditProductPage() {
  const { productId } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'precious',
    description: '',
    stock: '',
    image: '/n1.jpeg',
    status: 'active',
    weight: '',
    origin: '',
    clarity: '',
    cut: ''
  })

  // Load product data
  useEffect(() => {
    // Simulate API call to fetch product
    setTimeout(() => {
      // Mock data based on productId
      const mockProducts: { [key: string]: any } = {
        '1': {
          name: 'Ruby Stone',
          price: '299',
          category: 'precious',
          description: 'Natural certified ruby with deep red color. Perfect for jewelry and collection.',
          stock: '15',
          image: '/n1.jpeg',
          status: 'active',
          weight: '2.5 carats',
          origin: 'Myanmar',
          clarity: 'VS',
          cut: 'Oval'
        },
        '2': {
          name: 'Sapphire',
          price: '399',
          category: 'precious',
          description: 'Beautiful blue sapphire with excellent clarity.',
          stock: '8',
          image: '/n2.jpeg',
          status: 'active',
          weight: '3.0 carats',
          origin: 'Sri Lanka',
          clarity: 'VVS',
          cut: 'Cushion'
        },
        '3': {
          name: 'Emerald',
          price: '499',
          category: 'precious',
          description: 'Rich green emerald from Colombia.',
          stock: '12',
          image: '/n3.jpeg',
          status: 'active',
          weight: '2.0 carats',
          origin: 'Colombia',
          clarity: 'SI',
          cut: 'Emerald'
        }
      }

      const productData = mockProducts[productId as string] || mockProducts['1']
      setFormData(productData)
      setImagePreview(productData.image)
      setLoading(false)
    }, 1000)
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In real app, handle image upload
    // For demo, just update preview
    setImagePreview('/n1.jpeg')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      alert('Product updated successfully!')
      router.push('/admin/products')
    }, 1500)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      // Simulate delete
      alert('Product deleted successfully!')
      router.push('/admin/products')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">💎</div>
          <p className="text-white text-xl">Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            Edit Product: {formData.name}
          </span>
        </h1>
        <Link 
          href="/admin/products"
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-4">Product Image</h2>
              
              <div className="relative h-64 rounded-xl overflow-hidden border-2 border-white/20 mb-4">
                <Image 
                  src={imagePreview} 
                  alt="Product preview" 
                  fill 
                  className="object-cover"
                />
              </div>

              <label className="block">
                <span className="text-white/80 text-sm mb-2 block">Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600"
                />
              </label>

              <p className="text-xs text-white/40 mt-2">Recommended size: 800x800px</p>

              {/* Status Toggle */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <label className="flex items-center justify-between">
                  <span className="text-white font-semibold">Product Status</span>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="e.g., Ruby Stone"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Price (USD) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="299.00"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Category *</label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  >
                    <option value="precious">Precious</option>
                    <option value="semi">Semi-Precious</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-white/80 text-sm mb-2">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder="Detailed description of the product..."
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Product Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="e.g., 2.5 carats"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Origin</label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="e.g., Myanmar"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Clarity</label>
                  <select
                    name="clarity"
                    value={formData.clarity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  >
                    <option value="FL">FL (Flawless)</option>
                    <option value="IF">IF (Internally Flawless)</option>
                    <option value="VVS">VVS (Very Very Slightly Included)</option>
                    <option value="VS">VS (Very Slightly Included)</option>
                    <option value="SI">SI (Slightly Included)</option>
                    <option value="I">I (Included)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Cut</label>
                  <select
                    name="cut"
                    value={formData.cut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  >
                    <option value="Round">Round</option>
                    <option value="Oval">Oval</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Princess">Princess</option>
                    <option value="Marquise">Marquise</option>
                    <option value="Pear">Pear</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">SEO Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Meta Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder={`${formData.name} - Precious Gems & Stones`}
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Meta Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="Brief description for search engines..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all font-semibold"
          >
            Delete Product
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            {saving ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preview Card */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border-2 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
        <div className="flex items-center space-x-6">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
          </div>
          <div>
            <p className="text-white font-bold text-xl">{formData.name}</p>
            <p className="text-yellow-300 text-lg">${formData.price}</p>
            <p className="text-white/60 text-sm">Stock: {formData.stock} units</p>
          </div>
          <div className="ml-auto">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              formData.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
            } text-white`}>
              {formData.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}