'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  promoCode?: string
  onApplyPromo?: (code: string) => Promise<boolean>
  onCheckout?: () => void
  onContinueShopping?: () => void
  itemCount?: number
  showBreakdown?: boolean
  showShipping?: boolean
  showTax?: boolean
  showPromo?: boolean
  minOrderAmount?: number
  freeShippingThreshold?: number
  className?: string
  isCheckout?: boolean
}

export default function CartSummary({
  subtotal,
  shipping = 5,
  tax = subtotal * 0.08,
  discount = 0,
  promoCode: initialPromoCode = '',
  onApplyPromo,
  onCheckout,
  onContinueShopping,
  itemCount = 0,
  showBreakdown = true,
  showShipping = true,
  showTax = true,
  showPromo = true,
  minOrderAmount = 0,
  freeShippingThreshold = 500,
  className = '',
  isCheckout = false
}: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState(initialPromoCode)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [appliedDiscount, setAppliedDiscount] = useState(discount)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [estimatedDelivery, setEstimatedDelivery] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  // Calculate delivery date based on shipping method
  useEffect(() => {
    const today = new Date()
    let deliveryDays = 0
    
    switch(shippingMethod) {
      case 'express':
        deliveryDays = 3
        break
      case 'nextday':
        deliveryDays = 1
        break
      default:
        deliveryDays = 7
    }
    
    const deliveryDate = new Date(today.setDate(today.getDate() + deliveryDays))
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }))
  }, [shippingMethod])

  const shippingCost = shippingMethod === 'express' ? 15 : shippingMethod === 'nextday' ? 25 : shipping
  const finalDiscount = promoApplied ? subtotal * 0.1 : appliedDiscount
  const taxableAmount = subtotal - finalDiscount
  const taxAmount = showTax ? (showTax ? taxableAmount * 0.08 : 0) : 0
  const total = subtotal - finalDiscount + shippingCost + taxAmount
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code')
      return
    }

    setPromoLoading(true)
    setPromoError('')

    try {
      if (onApplyPromo) {
        const success = await onApplyPromo(promoCode)
        if (success) {
          setPromoApplied(true)
          setPromoError('')
          // Simulate 10% discount
          setAppliedDiscount(subtotal * 0.1)
        } else {
          setPromoError('Invalid promo code')
        }
      } else {
        // Simulate promo validation
        setTimeout(() => {
          if (promoCode.toUpperCase() === 'GEMS10') {
            setPromoApplied(true)
            setPromoError('')
            setAppliedDiscount(subtotal * 0.1)
          } else if (promoCode.toUpperCase() === 'SAVE20') {
            setPromoApplied(true)
            setPromoError('')
            setAppliedDiscount(subtotal * 0.2)
          } else if (promoCode.toUpperCase() === 'FREESHIP') {
            
            
            (0)
          } else {
            setPromoError('Invalid promo code')
          }
          setPromoLoading(false)
        }, 1000)
      }
    } catch (error) {
      setPromoError('Error applying promo code')
    } finally {
      setPromoLoading(false)
    }
  }

  const handleRemovePromo = () => {
    setPromoApplied(false)
    setPromoCode('')
    setAppliedDiscount(0)
    setPromoError('')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`
  }

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', cost: 5, days: '5-7', icon: '🚚' },
    { id: 'express', name: 'Express Shipping', cost: 15, days: '2-3', icon: '⚡' },
    { id: 'nextday', name: 'Next Day Delivery', cost: 25, days: '1', icon: '🚀' },
  ]

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <span>🛒</span>
            <span>Order Summary</span>
          </h2>
          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Free Shipping Progress */}
        {freeShippingThreshold > 0 && subtotal < freeShippingThreshold && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Free Shipping</span>
              <span className="text-yellow-300 font-medium">
                {formatCurrency(remainingForFreeShipping)} more
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
              />
            </div>
            <p className="text-white/40 text-xs">
              Add {formatCurrency(remainingForFreeShipping)} more to get free shipping
            </p>
          </div>
        )}

        {/* Free Shipping Achieved */}
        {freeShippingThreshold > 0 && subtotal >= freeShippingThreshold && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3">
            <p className="text-green-400 text-sm flex items-center space-x-2">
              <span>🎉</span>
              <span>Congratulations! You've got free shipping</span>
            </p>
          </div>
        )}

        {/* Price Breakdown */}
        {showBreakdown && (
          <div className="space-y-3">
            <div className="flex justify-between text-white/80">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-green-400">
                <span className="flex items-center space-x-1">
                  <span>Discount (10%)</span>
                  <button 
                    onClick={handleRemovePromo}
                    className="text-white/40 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </span>
                <span>-{formatCurrency(finalDiscount)}</span>
              </div>
            )}

            {showShipping && (
              <div className="space-y-2">
                <div className="flex justify-between text-white/80">
                  <span>Shipping</span>
                  <span>{formatCurrency(shippingCost)}</span>
                </div>
                
                {/* Shipping Method Selector */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {shippingMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setShippingMethod(method.id)}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        shippingMethod === method.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{method.icon}</div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-[10px] opacity-80">{method.days} days</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Delivery Estimate */}
                {estimatedDelivery && (
                  <p className="text-white/40 text-xs flex items-center space-x-1">
                    <span>📅</span>
                    <span>Estimated delivery: {estimatedDelivery}</span>
                  </p>
                )}
              </div>
            )}

            {showTax && (
              <div className="flex justify-between text-white/80">
                <span>Tax (8%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}

            {/* Min Order Warning */}
            {minOrderAmount > 0 && subtotal < minOrderAmount && (
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-2">
                <p className="text-orange-400 text-xs">
                  Minimum order amount is {formatCurrency(minOrderAmount)}
                </p>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between text-white font-bold text-xl pt-3 border-t border-white/10">
              <span>Total</span>
              <span className="text-yellow-300">{formatCurrency(total)}</span>
            </div>

            {/* Savings Summary */}
            {finalDiscount > 0 && (
              <p className="text-green-400 text-xs flex items-center space-x-1">
                <span>💰</span>
                <span>You saved {formatCurrency(finalDiscount)} on this order</span>
              </p>
            )}
          </div>
        )}

        {/* Promo Code Input */}
        {showPromo && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="text-white/60 text-sm block">Have a promo code?</label>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  disabled={promoApplied}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-500 outline-none disabled:opacity-50"
                />
                {promoApplied && (
                  <div className="absolute right-2 top-2 text-green-400">
                    ✓
                  </div>
                )}
              </div>
              {!promoApplied ? (
                <button
                  onClick={handleApplyPromo}
                  disabled={promoLoading}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-yellow-500 transition-all disabled:opacity-50 min-w-[80px]"
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              ) : (
                <button
                  onClick={handleRemovePromo}
                  className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  Remove
                </button>
              )}
            </div>
            {promoError && (
              <p className="text-red-400 text-xs flex items-center space-x-1">
                <span>⚠️</span>
                <span>{promoError}</span>
              </p>
            )}
            {promoApplied && (
              <p className="text-green-400 text-xs flex items-center space-x-1">
                <span>✓</span>
                <span>Promo code applied successfully!</span>
              </p>
            )}

            {/* Example Promos */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 bg-white/5 rounded-lg text-white/40 text-xs">GEMS10</span>
              <span className="px-2 py-1 bg-white/5 rounded-lg text-white/40 text-xs">SAVE20</span>
              <span className="px-2 py-1 bg-white/5 rounded-lg text-white/40 text-xs">FREESHIP</span>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        {!isCheckout && (
          <button
            onClick={onCheckout}
            disabled={minOrderAmount > 0 && subtotal < minOrderAmount}
            className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl text-lg hover:from-pink-500 hover:to-yellow-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            Proceed to Checkout
          </button>
        )}

        {/* Continue Shopping */}
        {onContinueShopping && (
          <button
            onClick={onContinueShopping}
            className="w-full py-3 text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Continue Shopping
          </button>
        )}

        {/* Payment Methods */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-white/40 text-xs text-center mb-2">We Accept</p>
          <div className="flex justify-center space-x-4 text-2xl">
            <span title="Visa">💳</span>
            <span title="Mastercard">💳</span>
            <span title="PayPal">📱</span>
            <span title="Apple Pay">🍎</span>
            <span title="Google Pay">📱</span>
            <span title="Bitcoin">₿</span>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 text-white/40 text-xs">
          <div className="flex items-center space-x-1">
            <span>🔒</span>
            <span>SSL Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🛡️</span>
            <span>Buyer Protection</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💰</span>
            <span>Price Match</span>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="bg-green-500/10 rounded-lg p-3 text-center">
          <p className="text-green-400 text-xs font-medium">30-Day Money Back Guarantee</p>
          <p className="text-white/40 text-[10px] mt-1">Not satisfied? Return within 30 days</p>
        </div>

        {/* Toggle Details Button (Mobile) */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="lg:hidden w-full py-2 text-white/40 hover:text-white text-sm flex items-center justify-center space-x-1"
        >
          <span>{showDetails ? 'Hide' : 'Show'} order details</span>
          <span>{showDetails ? '↑' : '↓'}</span>
        </button>

        {/* Additional Details (Hidden on mobile by default) */}
        <div className={`space-y-3 text-xs ${showDetails ? 'block' : 'hidden lg:block'}`}>
          <div className="flex justify-between text-white/40">
            <span>Item count:</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between text-white/40">
            <span>Average item price:</span>
            <span>{formatCurrency(itemCount ? subtotal / itemCount : 0)}</span>
          </div>
          <div className="flex justify-between text-white/40">
            <span>Shipping method:</span>
            <span className="capitalize">{shippingMethod}</span>
          </div>
          <div className="flex justify-between text-white/40">
            <span>Tax rate:</span>
            <span>8%</span>
          </div>
        </div>

        {/* Order Summary Footer */}
        <div className="pt-4 text-center">
          <p className="text-white/30 text-[10px]">
            By proceeding to checkout, you agree to our 
            <Link href="/terms" className="text-pink-300 hover:text-pink-200 mx-1">Terms</Link>
            and
            <Link href="/privacy" className="text-pink-300 hover:text-pink-200 ml-1">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}