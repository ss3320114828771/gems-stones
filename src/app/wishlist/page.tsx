'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Mock wishlist data
const MOCK_WISHLIST = [
  {
    id: 1,
    name: 'Ruby Stone - Natural Certified',
    price: 299,
    originalPrice: 399,
    image: '/n1.jpeg',
    category: 'Precious',
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Blue Sapphire - Ceylon',
    price: 399,
    image: '/n2.jpeg',
    category: 'Precious',
    inStock: true,
    rating: 4.9
  },
  {
    id: 3,
    name: 'Emerald - Colombian',
    price: 499,
    originalPrice: 599,
    image: '/n3.jpeg',
    category: 'Precious',
    inStock: false,
    rating: 4.7
  }
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST)

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id))
  }

  const moveToCart = (id: number) => {
    console.log('Moving to cart:', id)
    // In real app, add to cart and remove from wishlist
    removeFromWishlist(id)
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="text-8xl mb-6 animate-pulse">🤍</div>
        <h1 className="text-4xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
        <p className="text-white/60 mb-8">Save your favorite gems and come back to them later.</p>
        <Link 
          href="/products"
          className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full text-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
        >
          ✨ Explore Collection
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            My Wishlist
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div 
            key={item.id} 
            className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/20 hover:border-pink-500 transition-all group"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Category Badge */}
              <span className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                {item.category}
              </span>

              {/* Stock Badge */}
              {!item.inStock && (
                <span className="absolute top-3 right-3 px-3 py-1 bg-red-500/90 rounded-full text-white text-xs">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <Link href={`/products/${item.id}`}>
                <h3 className="text-white font-bold text-lg mb-2 hover:text-pink-300 transition-colors">
                  {item.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(item.rating) ? 'text-yellow-300' : 'text-white/20'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-white/40 text-xs">{item.rating}</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-yellow-300">
                  ${item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-white/40 text-sm line-through">
                    ${item.originalPrice}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => moveToCart(item.id)}
                  disabled={!item.inStock}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    item.inStock
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-pink-500 hover:to-yellow-500'
                      : 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                  }`}
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="px-4 py-3 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                  title="Remove from wishlist"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="text-center mt-12">
        <Link 
          href="/products"
          className="text-white/60 hover:text-white transition-colors inline-flex items-center space-x-2"
        >
          <span>←</span>
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Admin Info */}
      <div className="text-center text-white/40 text-sm mt-8">
        <p>Hafiz Sajid Syed - Administrator</p>
        <p>sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}