'use client'

import { useState, useEffect } from 'react'

// Simple product type
type CartItem = {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
}

// Main cart hook
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  // Add item to cart
  const addItem = (product: { id: string | number; name: string; price: number; image: string }) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id)
      
      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...current, { ...product, quantity: 1 }]
    })
    
    // Auto-open cart when adding items
    setIsOpen(true)
  }

  // Remove item from cart
  const removeItem = (id: string | number) => {
    setItems(current => current.filter(item => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return
    
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Clear entire cart
  const clearCart = () => {
    setItems([])
  }

  // Calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isEmpty: items.length === 0
  }
}