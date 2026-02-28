'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviews?: number
  inStock?: boolean
  isNew?: boolean
  isSale?: boolean
  isFeatured?: boolean
  discount?: number
  colors?: string[]
  sizes?: string[]
  description?: string
  onAddToCart?: (id: string | number) => void
  onAddToWishlist?: (id: string | number) => void
  onQuickView?: (id: string | number) => void
  layout?: 'grid' | 'list' | 'compact'
  showActions?: boolean
  showRating?: boolean
  showCategory?: boolean
  className?: string
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 4.5,
  reviews = 0,
  inStock = true,
  isNew = false,
  isSale = false,
  isFeatured = false,
  discount = 0,
  colors = [],
  sizes = [],
  description = '',
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  layout = 'grid',
  showActions = true,
  showRating = true,
  showCategory = true,
  className = ''
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showQuickView, setShowQuickView] = useState(false)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  // Mock additional images (in real app, these would come from props)
  const additionalImages = [image, image, image]

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    if (onAddToCart) {
      onAddToCart(id)
    }
    // Simulate add to cart
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist)
    if (onAddToWishlist) {
      onAddToWishlist(id)
    }
  }

  const handleQuickView = () => {
    setShowQuickView(true)
    if (onQuickView) {
      onQuickView(id)
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

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('⭐')
      } else if (i === fullStars && hasHalfStar) {
        stars.push('✨')
      } else {
        stars.push('☆')
      }
    }

    return stars
  }

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount

  // Grid Layout
  if (layout === 'grid') {
    return (
      <>
        <div
          className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/20 hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
                NEW
              </span>
            )}
            {isFeatured && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                FEATURED
              </span>
            )}
            {!inStock && (
              <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Sale Badge */}
          {(isSale || discountPercentage > 0) && (
            <div className="absolute top-3 right-3 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                <span className="relative px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                  -{discountPercentage}%
                </span>
              </div>
            </div>
          )}

          {/* Image Container */}
          <Link href={`/products/${id}`} className="block relative h-64 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            
            {/* Overlay with Actions */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={handleQuickView}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all transform hover:scale-110"
                title="Quick View"
              >
                👁️
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full transition-all transform hover:scale-110 ${
                  isInWishlist ? 'text-red-500' : 'text-white hover:text-red-500'
                }`}
                title="Add to Wishlist"
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Color Indicators */}
            {colors.length > 0 && (
              <div className="absolute bottom-3 left-3 flex gap-1">
                {colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-white/50"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {colors.length > 3 && (
                  <span className="text-white text-xs">+{colors.length - 3}</span>
                )}
              </div>
            )}
          </Link>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            {showCategory && (
              <Link
                href={`/products?category=${category.toLowerCase()}`}
                className="text-pink-300 text-xs font-medium hover:text-pink-200 transition-colors"
              >
                {category}
              </Link>
            )}

            {/* Product Name */}
            <Link href={`/products/${id}`} className="block">
              <h3 className="text-white font-bold text-lg mb-2 hover:text-pink-300 transition-colors line-clamp-2">
                {name}
              </h3>
            </Link>

            {/* Description (truncated) */}
            {description && (
              <p className="text-white/60 text-sm mb-3 line-clamp-2">{description}</p>
            )}

            {/* Rating */}
            {showRating && (
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {renderStars().map((star, index) => (
                    <span key={index} className="text-yellow-300">{star}</span>
                  ))}
                </div>
                {reviews > 0 && (
                  <span className="text-white/40 text-xs">({reviews})</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-yellow-300">
                  {formatCurrency(price)}
                </span>
                {originalPrice && (
                  <span className="text-white/40 text-sm line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                )}
              </div>
              {inStock && (
                <span className="text-green-400 text-xs">In Stock</span>
              )}
            </div>

            {/* Add to Cart Button */}
            {showActions && (
              <button
                onClick={handleAddToCart}
                disabled={!inStock || isAddingToCart}
                className={`w-full py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  inStock
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-pink-500 hover:to-yellow-500'
                    : 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span>🛒</span>
                    <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Hover Effects */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-full blur-2xl" />
          </div>
        </div>

        {/* Quick View Modal */}
        {showQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowQuickView(false)} />
            <div className="relative bg-gradient-to-b from-gray-900 to-purple-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20">
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full text-white hover:bg-white/20 z-10"
              >
                ✕
              </button>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-white/20">
                      <Image
                        src={additionalImages[selectedImage]}
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {additionalImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index ? 'border-pink-500' : 'border-white/20'
                          }`}
                        >
                          <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-pink-300 text-sm mb-2">{category}</p>
                      <h2 className="text-3xl font-bold text-white mb-4">{name}</h2>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex">
                          {renderStars().map((star, index) => (
                            <span key={index} className="text-yellow-300 text-xl">{star}</span>
                          ))}
                        </div>
                        <span className="text-white/60">{reviews} reviews</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl font-bold text-yellow-300">
                          {formatCurrency(price)}
                        </span>
                        {originalPrice && (
                          <span className="text-white/40 text-xl line-through">
                            {formatCurrency(originalPrice)}
                          </span>
                        )}
                        {discountPercentage > 0 && (
                          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                            Save {discountPercentage}%
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-white/80 leading-relaxed mb-6">
                        {description || 'Experience the beauty of this natural gemstone. Perfect for collectors and jewelry enthusiasts.'}
                      </p>

                      {/* Colors */}
                      {colors.length > 0 && (
                        <div className="mb-6">
                          <label className="block text-white/60 text-sm mb-2">Color</label>
                          <div className="flex gap-2">
                            {colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${
                                  selectedColor === color ? 'border-pink-500 scale-110' : 'border-white/20'
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sizes */}
                      {sizes.length > 0 && (
                        <div className="mb-6">
                          <label className="block text-white/60 text-sm mb-2">Size</label>
                          <div className="flex gap-2">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                  selectedSize === size
                                    ? 'border-pink-500 bg-pink-500/20 text-white'
                                    : 'border-white/20 text-white/60 hover:border-white/40'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity */}
                      <div className="mb-6">
                        <label className="block text-white/60 text-sm mb-2">Quantity</label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 bg-white/10 rounded-lg text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="w-16 text-center text-white font-bold text-xl">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 bg-white/10 rounded-lg text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-4">
                        <button
                          onClick={handleAddToCart}
                          disabled={!inStock}
                          className="flex-1 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={handleAddToWishlist}
                          className={`w-14 h-14 rounded-xl border-2 transition-all ${
                            isInWishlist
                              ? 'bg-red-500/20 border-red-500 text-red-500'
                              : 'border-white/20 text-white/60 hover:border-white/40'
                          }`}
                        >
                          {isInWishlist ? '❤️' : '🤍'}
                        </button>
                      </div>

                      {/* Stock Status */}
                      <div className="flex items-center space-x-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={inStock ? 'text-green-400' : 'text-red-400'}>
                          {inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // List Layout
  if (layout === 'list') {
    return (
      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/20 hover:border-pink-500 transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <Link href={`/products/${id}`} className="relative md:w-64 h-64 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold bg-gray-800 px-4 py-2 rounded-full">Out of Stock</span>
              </div>
            )}
          </Link>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                {showCategory && (
                  <Link href={`/products?category=${category.toLowerCase()}`} className="text-pink-300 text-sm">
                    {category}
                  </Link>
                )}
                <Link href={`/products/${id}`}>
                  <h3 className="text-2xl font-bold text-white mb-2 hover:text-pink-300">{name}</h3>
                </Link>
                {description && (
                  <p className="text-white/60 mb-4">{description}</p>
                )}
                
                {/* Rating */}
                {showRating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {renderStars().map((star, index) => (
                        <span key={index} className="text-yellow-300">{star}</span>
                      ))}
                    </div>
                    <span className="text-white/40">({reviews} reviews)</span>
                  </div>
                )}

                {/* Colors and Sizes */}
                {(colors.length > 0 || sizes.length > 0) && (
                  <div className="flex gap-4 mb-4">
                    {colors.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-white/60 text-sm">Colors:</span>
                        <div className="flex gap-1">
                          {colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-white/30"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {sizes.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-white/60 text-sm">Sizes:</span>
                        <span className="text-white">{sizes.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price and Actions */}
              <div className="text-right">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-yellow-300">{formatCurrency(price)}</span>
                  {originalPrice && (
                    <div className="text-white/40 text-sm line-through">{formatCurrency(originalPrice)}</div>
                  )}
                </div>

                {showActions && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={!inStock}
                      className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleAddToWishlist}
                      className={`w-12 h-12 rounded-xl border-2 transition-all ${
                        isInWishlist ? 'border-red-500 text-red-500' : 'border-white/20 text-white/60'
                      }`}
                    >
                      {isInWishlist ? '❤️' : '🤍'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Compact Layout
  return (
    <Link href={`/products/${id}`} className="block group">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-pink-500 transition-all">
        <div className="relative h-32">
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform" />
          {isSale && (
            <span className="absolute top-1 right-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">-{discount}%</span>
          )}
        </div>
        <div className="p-3">
          <h4 className="text-white font-medium text-sm mb-1 truncate">{name}</h4>
          <p className="text-yellow-300 font-bold">{formatCurrency(price)}</p>
        </div>
      </div>
    </Link>
  )
}