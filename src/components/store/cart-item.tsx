'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CartItemProps {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
  category?: string
  maxQuantity?: number
  onUpdateQuantity?: (id: string | number, newQuantity: number) => void
  onRemove?: (id: string | number) => void
  onSaveForLater?: (id: string | number) => void
  showActions?: boolean
  showSaveLater?: boolean
  isEditable?: boolean
  isSelected?: boolean
  onSelect?: (id: string | number, selected: boolean) => void
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  category = 'Gemstone',
  maxQuantity = 99,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  showActions = true,
  showSaveLater = true,
  isEditable = true,
  isSelected = false,
  onSelect
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [isRemoving, setIsRemoving] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const subtotal = price * itemQuantity

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return
    
    setItemQuantity(newQuantity)
    setIsUpdating(true)
    
    if (onUpdateQuantity) {
      onUpdateQuantity(id, newQuantity)
    }
    
    // Simulate update delay
    setTimeout(() => {
      setIsUpdating(false)
    }, 500)
  }

  const handleRemove = () => {
    if (onRemove) {
      setIsRemoving(true)
      onRemove(id)
    }
  }

  const handleSaveForLater = () => {
    if (onSaveForLater) {
      onSaveForLater(id)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getStockStatus = () => {
    if (itemQuantity >= maxQuantity) {
      return { text: 'Max stock reached', color: 'text-orange-400' }
    }
    if (maxQuantity - itemQuantity < 5) {
      return { text: 'Low stock', color: 'text-orange-400' }
    }
    return { text: 'In stock', color: 'text-green-400' }
  }

  const stockStatus = getStockStatus()

  return (
    <div 
      className={`
        relative bg-gradient-to-br from-white/10 to-white/5 
        backdrop-blur-sm rounded-2xl border-2 
        transition-all duration-300 overflow-hidden
        ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        ${isSelected ? 'border-pink-500 shadow-lg shadow-pink-500/20' : 'border-white/20 hover:border-pink-300'}
      `}
    >
      {/* Selection Checkbox */}
      {onSelect && (
        <div className="absolute top-4 left-4 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(id, e.target.checked)}
            className="w-5 h-5 accent-pink-500 cursor-pointer"
          />
        </div>
      )}

      {/* Remove Animation Overlay */}
      {isRemoving && (
        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-20">
          <div className="text-white font-bold animate-pulse">Removing...</div>
        </div>
      )}

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Product Image */}
          <div className={`
            relative w-full sm:w-32 h-32 rounded-xl overflow-hidden 
            border-2 border-white/20 group
            ${onSelect ? 'sm:ml-8' : ''}
          `}>
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Category Badge */}
            <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs">
              {category}
            </div>

            {/* Sale Badge */}
            {price > 500 && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 rounded-lg text-white text-xs font-bold animate-pulse">
                SALE
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <Link 
                  href={`/products/${id}`}
                  className="text-xl font-bold text-white hover:text-pink-300 transition-colors"
                >
                  {name}
                </Link>
                <p className="text-white/40 text-sm">SKU: GEM-{String(id).padStart(4, '0')}</p>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-300">{formatCurrency(price)}</p>
                <p className="text-white/40 text-sm">each</p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${stockStatus.color.replace('text', 'bg')}`} />
              <span className={`text-sm ${stockStatus.color}`}>{stockStatus.text}</span>
              {isUpdating && (
                <span className="text-xs text-white/40 animate-pulse">Updating...</span>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <span className="text-white/60 text-sm">Qty:</span>
                <div className="flex items-center bg-white/10 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(itemQuantity - 1)}
                    disabled={!isEditable || itemQuantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-l-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-white font-medium">
                    {itemQuantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(itemQuantity + 1)}
                    disabled={!isEditable || itemQuantity >= maxQuantity}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-r-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  >
                    +
                  </button>
                </div>
                <span className="text-white/40 text-xs">max {maxQuantity}</span>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <p className="text-white/60 text-sm">Subtotal:</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(subtotal)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {showActions && (
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all text-sm flex items-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Remove</span>
                </button>

                {showSaveLater && (
                  <button
                    onClick={handleSaveForLater}
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all text-sm flex items-center space-x-2"
                  >
                    <span>⏰</span>
                    <span>Save for Later</span>
                  </button>
                )}

                <Link
                  href={`/products/${id}`}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all text-sm flex items-center space-x-2"
                >
                  <span>👁️</span>
                  <span>View Details</span>
                </Link>

                <button
                  onClick={() => {/* Add to wishlist */}}
                  className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-lg hover:bg-pink-500/30 transition-all text-sm flex items-center space-x-2"
                >
                  <span>❤️</span>
                  <span>Wishlist</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30 rounded-2xl">
          <div className="bg-gradient-to-b from-gray-900 to-purple-900 rounded-2xl p-6 max-w-sm mx-4 border border-white/20">
            <div className="text-center">
              <div className="text-5xl mb-4 animate-bounce">🗑️</div>
              <h3 className="text-xl font-bold text-white mb-2">Remove Item?</h3>
              <p className="text-white/60 mb-6">
                Are you sure you want to remove <span className="text-pink-300">{name}</span> from your cart?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleRemove}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Remove
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Free Shipping Indicator */}
      {subtotal >= 500 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-500 py-1 px-4">
          <p className="text-white text-xs text-center animate-pulse">
            🎉 Free shipping eligible! This item contributes to free shipping
          </p>
        </div>
      )}
    </div>
  )
}