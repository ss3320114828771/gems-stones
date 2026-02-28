// ========== CART ITEM TYPES ==========

/**
 * Cart item (product in cart)
 */
export type CartItem = {
  id: string | number           // Product ID
  name: string                  // Product name
  price: number                 // Current price
  originalPrice?: number        // Original price (if on sale)
  quantity: number              // Quantity in cart
  image: string                 // Main product image
  category?: string             // Product category
  maxQuantity?: number          // Maximum allowed quantity (stock limit)
  inStock?: boolean             // Stock status at time of adding
  selected?: boolean            // Whether item is selected for checkout
  sku?: string                  // Stock keeping unit
  weight?: string               // Item weight (for shipping)
}

// ========== CART STATE TYPES ==========

/**
 * Cart summary totals
 */
export type CartTotals = {
  subtotal: number              // Sum of all items (price * quantity)
  shipping: number              // Shipping cost
  tax: number                   // Tax amount
  discount: number              // Discount amount
  total: number                 // Final total (subtotal + shipping + tax - discount)
}

/**
 * Complete cart state
 */
export type CartState = {
  items: CartItem[]             // All items in cart
  totals: CartTotals            // Calculated totals
  itemCount: number             // Total number of items (sum of quantities)
  uniqueItemCount: number       // Number of unique products
  isEmpty: boolean              // Whether cart is empty
  currency: string              // Currency code (e.g., 'USD')
}

// ========== PROMO CODE TYPES ==========

/**
 * Promo code / discount
 */
export type PromoCode = {
  code: string                  // Promo code (e.g., 'SAVE10')
  type: 'percentage' | 'fixed'  // Discount type
  value: number                 // Discount value (percentage or amount)
  minOrder?: number             // Minimum order amount required
  maxDiscount?: number          // Maximum discount amount
  expiresAt?: string            // Expiration date
  applicableCategories?: string[] // Categories this applies to
}

// ========== SHIPPING TYPES ==========

/**
 * Shipping method
 */
export type ShippingMethod = {
  id: string                    // Method ID
  name: string                  // Display name
  price: number                 // Shipping cost
  estimatedDays: string         // Estimated delivery time (e.g., '3-5')
  icon?: string                 // Icon emoji or URL
}

// ========== CART ACTIONS ==========

/**
 * Cart action types
 */
export type CartActionType = 
  | 'ADD_ITEM'
  | 'REMOVE_ITEM'
  | 'UPDATE_QUANTITY'
  | 'CLEAR_CART'
  | 'APPLY_PROMO'
  | 'REMOVE_PROMO'
  | 'SELECT_ITEM'
  | 'SELECT_ALL'
  | 'UPDATE_SHIPPING'

/**
 * Cart action payloads
 */
export type CartActionPayload = {
  ADD_ITEM: CartItem
  REMOVE_ITEM: { id: string | number }
  UPDATE_QUANTITY: { id: string | number; quantity: number }
  APPLY_PROMO: { code: string }
  SELECT_ITEM: { id: string | number; selected: boolean }
  SELECT_ALL: { selected: boolean }
  UPDATE_SHIPPING: { method: ShippingMethod }
}

// ========== CART API RESPONSES ==========

/**
 * API response for cart operations
 */
export type CartResponse = {
  success: boolean
  cart?: CartState
  error?: string
  message?: string
}

// ========== CART VALIDATION ==========

/**
 * Cart validation result
 */
export type CartValidation = {
  isValid: boolean
  errors: string[]
  warnings: string[]
  outOfStock: Array<{ id: string | number; name: string }>
  priceChanged: Array<{ id: string | number; name: string; oldPrice: number; newPrice: number }>
}

// ========== HELPER FUNCTIONS ==========

/**
 * Calculate cart totals from items
 */
export function calculateCartTotals(
  items: CartItem[],
  shippingCost: number = 0,
  taxRate: number = 0.1,
  discount: number = 0
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const taxableAmount = subtotal - discount
  const tax = taxableAmount * taxRate
  const total = subtotal + shippingCost + tax - discount

  return {
    subtotal,
    shipping: shippingCost,
    tax,
    discount,
    total
  }
}

/**
 * Calculate item count
 */
export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

/**
 * Check if cart is empty
 */
export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0
}

/**
 * Find item in cart
 */
export function findCartItem(items: CartItem[], productId: string | number): CartItem | undefined {
  return items.find(item => item.id === productId)
}

/**
 * Validate cart items against current stock/prices
 */
export function validateCart(
  items: CartItem[],
  currentProducts: Array<{ id: string | number; price: number; inStock: boolean; stock?: number }>
): CartValidation {
  const errors: string[] = []
  const warnings: string[] = []
  const outOfStock: Array<{ id: string | number; name: string }> = []
  const priceChanged: Array<{ id: string | number; name: string; oldPrice: number; newPrice: number }> = []

  items.forEach(item => {
    const product = currentProducts.find(p => p.id === item.id)
    
    if (!product) {
      errors.push(`Product ${item.name} no longer available`)
      return
    }

    if (!product.inStock) {
      outOfStock.push({ id: item.id, name: item.name })
      errors.push(`${item.name} is out of stock`)
    }

    if (product.stock !== undefined && item.quantity > product.stock) {
      warnings.push(`${item.name} quantity exceeds available stock`)
    }

    if (product.price !== item.price) {
      priceChanged.push({
        id: item.id,
        name: item.name,
        oldPrice: item.price,
        newPrice: product.price
      })
      warnings.push(`${item.name} price has changed`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    outOfStock,
    priceChanged
  }
}

/**
 * Format cart for storage
 */
export function serializeCart(items: CartItem[]): string {
  return JSON.stringify(items)
}

/**
 * Parse cart from storage
 */
export function deserializeCart(data: string): CartItem[] {
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// ========== CONSTANTS ==========

/**
 * Default tax rate (10%)
 */
export const DEFAULT_TAX_RATE = 0.1

/**
 * Default shipping cost
 */
export const DEFAULT_SHIPPING = 10

/**
 * Free shipping threshold
 */
export const FREE_SHIPPING_THRESHOLD = 500

/**
 * Maximum quantity per item
 */
export const MAX_ITEM_QUANTITY = 99

/**
 * Sample shipping methods
 */
export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Shipping', price: 5, estimatedDays: '5-7', icon: '🚚' },
  { id: 'express', name: 'Express Shipping', price: 15, estimatedDays: '2-3', icon: '⚡' },
  { id: 'nextday', name: 'Next Day Delivery', price: 25, estimatedDays: '1', icon: '🚀' },
  { id: 'free', name: 'Free Shipping', price: 0, estimatedDays: '7-10', icon: '🎉' }
]

/**
 * Sample promo codes
 */
export const PROMO_CODES: PromoCode[] = [
  { code: 'SAVE10', type: 'percentage', value: 10, minOrder: 100 },
  { code: 'SAVE20', type: 'percentage', value: 20, minOrder: 200 },
  { code: 'FREESHIP', type: 'fixed', value: 10, minOrder: 50 },
  { code: 'WELCOME', type: 'percentage', value: 15, minOrder: 50 }
]

// ========== EXPORT ALL ==========

export default {
  // Types
  
  

  
  
  
  // Functions
  calculateCartTotals,
  calculateItemCount,
  isCartEmpty,
  findCartItem,
  validateCart,
  serializeCart,
  deserializeCart,
  
  // Constants
  DEFAULT_TAX_RATE,
  DEFAULT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  MAX_ITEM_QUANTITY,
  SHIPPING_METHODS,
  PROMO_CODES
}