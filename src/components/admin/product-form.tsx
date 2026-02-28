'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface ProductFormProps {
  productId?: string
  initialData?: ProductData
  mode: 'create' | 'edit'
}

interface ProductData {
  id?: string
  name: string
  price: string
  category: string
  description: string
  stock: string
  image: string
  status: 'active' | 'inactive' | 'draft'
  weight?: string
  origin?: string
  clarity?: string
  cut?: string
  dimensions?: string
  certification?: string
}

export default function ProductForm({ productId, initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [imagePreview, setImagePreview] = useState('/n1.jpeg')
  const [formData, setFormData] = useState<ProductData>({
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
    cut: '',
    dimensions: '',
    certification: ''
  })

  // Load product data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData)
      setImagePreview(initialData.image)
      setLoading(false)
    } else if (mode === 'edit' && !initialData) {
      // Simulate API call to fetch product
      setTimeout(() => {
        const mockData: ProductData = {
          id: productId,
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
          cut: 'Oval',
          dimensions: '8x6mm',
          certification: 'GIA Certified'
        }
        setFormData(mockData)
        setImagePreview(mockData.image)
        setLoading(false)
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [mode, productId, initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Validate form
    if (!formData.name || !formData.price || !formData.description || !formData.stock) {
      alert('Please fill in all required fields')
      setSaving(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      alert(`Product ${mode === 'create' ? 'created' : 'updated'} successfully!`)
      router.push('/admin/products')
    }, 1500)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      setSaving(true)
      // Simulate API call
      setTimeout(() => {
        setSaving(false)
        alert('Product deleted successfully!')
        router.push('/admin/products')
      }, 1500)
    }
  }

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }))
    alert('Product saved as draft')
  }

  const handlePreview = () => {
    // Open preview in new tab or modal
    window.open(`/products/${productId || 'preview'}`, '_blank')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">💎</div>
          <p className="text-white text-xl">Loading product data...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            {mode === 'create' ? 'Add New Product' : 'Edit Product'}
          </span>
        </h1>
        
        <div className="flex flex-wrap gap-3">
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handlePreview}
              className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all flex items-center space-x-2"
            >
              <span>👁️</span>
              <span>Preview</span>
            </button>
          )}
          
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all flex items-center space-x-2"
          >
            <span>📝</span>
            <span>Save Draft</span>
          </button>
          
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all flex items-center space-x-2"
            >
              <span>🗑️</span>
              <span>Delete</span>
            </button>
          )}
          
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2"
          >
            <span>✕</span>
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/10 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
          style={{ width: activeTab === 'basic' ? '33%' : activeTab === 'details' ? '66%' : '100%' }}
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'basic'
              ? 'text-pink-300 border-b-2 border-pink-300'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Basic Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'details'
              ? 'text-pink-300 border-b-2 border-pink-300'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Product Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'seo'
              ? 'text-pink-300 border-b-2 border-pink-300'
              : 'text-white/60 hover:text-white'
          }`}
        >
          SEO & Meta
        </button>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none transition-colors"
                    placeholder="e.g., Ruby Stone"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Price (USD) <span className="text-red-400">*</span>
                  </label>
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
                  <label className="block text-white/80 text-sm mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  >
                    <option value="precious">Precious</option>
                    <option value="semi">Semi-Precious</option>
                    <option value="rare">Rare</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Stock Quantity <span className="text-red-400">*</span>
                  </label>
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

                <div>
                  <label className="block text-white/80 text-sm mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">SKU (Optional)</label>
                  <input
                    type="text"
                    name="sku"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="RUB-001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder="Detailed description of the product..."
                />
                <p className="text-white/40 text-xs mt-1">
                  {formData.description.length} characters (recommended: 150-300)
                </p>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Short Description</label>
                <textarea
                  name="shortDescription"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder="Brief description for product cards..."
                />
              </div>
            </div>
          )}

          {/* Product Details Tab */}
          {activeTab === 'details' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 space-y-6">
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
                    <option value="">Select clarity</option>
                    <option value="FL">FL (Flawless)</option>
                    <option value="IF">IF (Internally Flawless)</option>
                    <option value="VVS1">VVS1</option>
                    <option value="VVS2">VVS2</option>
                    <option value="VS1">VS1</option>
                    <option value="VS2">VS2</option>
                    <option value="SI1">SI1</option>
                    <option value="SI2">SI2</option>
                    <option value="I1">I1</option>
                    <option value="I2">I2</option>
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
                    <option value="">Select cut</option>
                    <option value="Round">Round</option>
                    <option value="Oval">Oval</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Princess">Princess</option>
                    <option value="Marquise">Marquise</option>
                    <option value="Pear">Pear</option>
                    <option value="Heart">Heart</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Dimensions</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="e.g., 8x6mm"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Certification</label>
                  <input
                    type="text"
                    name="certification"
                    value={formData.certification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="e.g., GIA Certified"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Additional Details</label>
                <textarea
                  name="additionalDetails"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder="Any other relevant details..."
                />
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder={`${formData.name || 'Product Name'} - Precious Gems & Stones`}
                />
                <p className="text-white/40 text-xs mt-1">Recommended: 50-60 characters</p>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Meta Description</label>
                <textarea
                  name="metaDescription"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder="Brief description for search engines..."
                />
                <p className="text-white/40 text-xs mt-1">Recommended: 150-160 characters</p>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Meta Keywords</label>
                <input
                  type="text"
                  name="metaKeywords"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                  placeholder="ruby, gemstone, precious, jewelry"
                />
                <p className="text-white/40 text-xs mt-1">Comma-separated keywords</p>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">URL Slug</label>
                <div className="flex items-center">
                  <span className="text-white/40 px-3">/products/</span>
                  <input
                    type="text"
                    name="slug"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 outline-none"
                    placeholder="ruby-stone"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Image Upload & Preview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Image Upload */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 sticky top-32">
            <h3 className="text-lg font-bold text-white mb-4">Product Image</h3>
            
            <div className="relative h-64 rounded-xl overflow-hidden border-2 border-white/20 mb-4 group">
              <Image 
                src={imagePreview} 
                alt="Product preview" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm">Click to change</span>
              </div>
            </div>

            <label className="block">
              <span className="text-white/80 text-sm mb-2 block">Upload New Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 file:cursor-pointer cursor-pointer"
              />
            </label>

            <p className="text-xs text-white/40 mt-2">Recommended size: 800x800px, max 2MB</p>

            {/* Image Gallery */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/80 text-sm mb-3">Additional Images</p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative h-20 rounded-lg overflow-hidden border border-white/20 cursor-pointer hover:border-pink-500 transition-colors">
                    <Image src={`/n${i}.jpeg`} alt={`Gallery ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

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
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
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
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center space-x-2 min-w-[160px] justify-center"
        >
          {saving ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>{mode === 'create' ? 'Creating...' : 'Saving...'}</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>{mode === 'create' ? 'Create Product' : 'Save Changes'}</span>
            </>
          )}
        </button>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border-2 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
        <div className="flex items-center space-x-6">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-xl">{formData.name || 'Product Name'}</p>
                <p className="text-yellow-300 text-lg">${formData.price || '0'}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                formData.status === 'active' ? 'bg-green-500' : 
                formData.status === 'inactive' ? 'bg-gray-500' : 'bg-yellow-500'
              } text-white`}>
                {formData.status}
              </span>
            </div>
            <p className="text-white/60 text-sm mt-2 line-clamp-2">{formData.description || 'Description...'}</p>
            <div className="flex items-center space-x-4 mt-2 text-white/40 text-xs">
              <span>📦 Stock: {formData.stock || '0'}</span>
              <span>📏 {formData.dimensions || 'Dimensions'}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}