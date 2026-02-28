'use client'

import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'

export default function CartPage() {  // <-- MUST HAVE default export
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
        <Link href="/products" className="text-pink-300 hover:text-pink-200">
          Continue Shopping →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Shopping Cart ({itemCount} items)
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <div className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.name}</h3>
                  <p className="text-yellow-300">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-white/10 rounded"
                    >-</button>
                    <span className="text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-white/10 rounded"
                    >+</button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-400"
                    >Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 sticky top-32">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-2 text-white/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-yellow-300">
                    ${(subtotal + 5 + subtotal * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-yellow-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}