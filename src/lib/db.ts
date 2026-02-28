// Simple in-memory database with localStorage persistence
// No external dependencies, pure TypeScript

// ========== TYPES ==========

export type User = {
  id: string
  name: string
  email: string
  password: string // In real app, this would be hashed
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
  lastLogin?: string
  avatar?: string
  phone?: string
  address?: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  image: string
  images?: string[]
  inStock: boolean
  stock: number
  featured: boolean
  rating: number
  reviews: number
  colors?: string[]
  sizes?: string[]
  weight?: string
  origin?: string
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  productId: string
  productName: string
  price: number
  quantity: number
  image?: string
}

export type Order = {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount: number
}

// ========== MOCK DATA ==========

// Initial mock users
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    name: 'hafiz sajid',
    email: 'hafizsajid@gmail.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
    lastLogin: new Date().toISOString()
  }
]

// Initial mock products
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ruby Stone - Natural Certified',
    description: 'Natural certified ruby with deep red color. Perfect for jewelry and collection.',
    price: 299,
    originalPrice: 399,
    category: 'precious',
    subcategory: 'ruby',
    image: '/n1.jpeg',
    images: ['/n1.jpeg', '/n2.jpeg', '/n3.jpeg'],
    inStock: true,
    stock: 15,
    featured: true,
    rating: 4.8,
    reviews: 124,
    colors: ['Red', 'Dark Red'],
    weight: '2.5 carats',
    origin: 'Myanmar',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Blue Sapphire - Ceylon',
    description: 'Beautiful blue sapphire from Sri Lanka. Excellent clarity and cut.',
    price: 399,
    category: 'precious',
    subcategory: 'sapphire',
    image: '/n2.jpeg',
    images: ['/n2.jpeg', '/n3.jpeg', '/n4.jpeg'],
    inStock: true,
    stock: 8,
    featured: true,
    rating: 4.9,
    reviews: 89,
    colors: ['Blue', 'Light Blue'],
    weight: '3.0 carats',
    origin: 'Sri Lanka',
    createdAt: '2024-01-14T00:00:00.000Z',
    updatedAt: '2024-01-14T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Emerald - Colombian',
    description: 'Rich green emerald from Colombia. Natural inclusions guarantee authenticity.',
    price: 499,
    originalPrice: 599,
    category: 'precious',
    subcategory: 'emerald',
    image: '/n3.jpeg',
    images: ['/n3.jpeg', '/n4.jpeg', '/n5.jpeg'],
    inStock: true,
    stock: 12,
    featured: true,
    rating: 4.7,
    reviews: 56,
    colors: ['Green', 'Dark Green'],
    weight: '2.0 carats',
    origin: 'Colombia',
    createdAt: '2024-01-14T00:00:00.000Z',
    updatedAt: '2024-01-14T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Diamond - Solitaire',
    description: 'Brilliant cut diamond. VS clarity, excellent cut grade.',
    price: 999,
    category: 'precious',
    subcategory: 'diamond',
    image: '/n4.jpeg',
    images: ['/n4.jpeg', '/n5.jpeg', '/n6.jpeg'],
    inStock: false,
    stock: 0,
    featured: true,
    rating: 5.0,
    reviews: 45,
    weight: '1.0 carats',
    origin: 'South Africa',
    createdAt: '2024-01-13T00:00:00.000Z',
    updatedAt: '2024-01-13T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Amethyst - Purple',
    description: 'Deep purple amethyst. Perfect for meditation and healing.',
    price: 199,
    category: 'semi-precious',
    subcategory: 'amethyst',
    image: '/n5.jpeg',
    images: ['/n5.jpeg', '/n6.jpeg', '/n1.jpeg'],
    inStock: true,
    stock: 20,
    featured: false,
    rating: 4.5,
    reviews: 234,
    colors: ['Purple', 'Lavender'],
    sizes: ['Small', 'Medium', 'Large'],
    weight: '5.0 carats',
    origin: 'Brazil',
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-01-12T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Topaz - Imperial',
    description: 'Imperial topaz with golden hue. Rare and beautiful.',
    price: 249,
    originalPrice: 299,
    category: 'semi-precious',
    subcategory: 'topaz',
    image: '/n6.jpeg',
    images: ['/n6.jpeg', '/n1.jpeg', '/n2.jpeg'],
    inStock: true,
    stock: 18,
    featured: false,
    rating: 4.6,
    reviews: 78,
    colors: ['Yellow', 'Golden'],
    weight: '4.0 carats',
    origin: 'Brazil',
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-01-12T00:00:00.000Z'
  }
]

// Initial mock orders
const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    userId: '1',
    userName: 'Hafiz Sajid Syed',
    userEmail: 'sajid.syed@gmail.com',
    items: [
      { productId: '1', productName: 'Ruby Stone', price: 299, quantity: 1, image: '/n1.jpeg' }
    ],
    subtotal: 299,
    tax: 29.9,
    shipping: 10,
    total: 338.9,
    status: 'delivered',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    shippingAddress: '123 Main St, New York, NY 10001',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'ord_2',
    userId: '3',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    items: [
      { productId: '2', productName: 'Blue Sapphire', price: 399, quantity: 2, image: '/n2.jpeg' }
    ],
    subtotal: 798,
    tax: 79.8,
    shipping: 15,
    total: 892.8,
    status: 'processing',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    createdAt: '2024-01-16T14:20:00.000Z',
    updatedAt: '2024-01-16T14:20:00.000Z'
  }
]

// Mock categories
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Precious Gems', slug: 'precious', description: 'Diamonds, Rubies, Sapphires, Emeralds', productCount: 4, image: '/n1.jpeg' },
  { id: '2', name: 'Semi-Precious', slug: 'semi-precious', description: 'Amethyst, Topaz, Garnet, Citrine', productCount: 2, image: '/n5.jpeg' },
  { id: '3', name: 'Crystals', slug: 'crystals', description: 'Healing and meditation crystals', productCount: 0, image: '/n6.jpeg' },
  { id: '4', name: 'Rare Collectibles', slug: 'rare', description: 'Unique and rare specimens', productCount: 0, image: '/n4.jpeg' }
]

// ========== DATABASE CLASS ==========

class Database {
  private users: User[] = []
  private products: Product[] = []
  private orders: Order[] = []
  private categories: Category[] = []
  private initialized = false

  constructor() {
    this.load()
  }

  // Load data from localStorage
  private load() {
    if (typeof window === 'undefined') return

    try {
      // Load users
      const users = localStorage.getItem('db_users')
      this.users = users ? JSON.parse(users) : [...MOCK_USERS]

      // Load products
      const products = localStorage.getItem('db_products')
      this.products = products ? JSON.parse(products) : [...MOCK_PRODUCTS]

      // Load orders
      const orders = localStorage.getItem('db_orders')
      this.orders = orders ? JSON.parse(orders) : [...MOCK_ORDERS]

      // Load categories
      const categories = localStorage.getItem('db_categories')
      this.categories = categories ? JSON.parse(categories) : [...MOCK_CATEGORIES]

      this.initialized = true
    } catch (error) {
      console.error('Failed to load database:', error)
      this.resetToMock()
    }
  }

  // Save data to localStorage
  private save() {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('db_users', JSON.stringify(this.users))
      localStorage.setItem('db_products', JSON.stringify(this.products))
      localStorage.setItem('db_orders', JSON.stringify(this.orders))
      localStorage.setItem('db_categories', JSON.stringify(this.categories))
    } catch (error) {
      console.error('Failed to save database:', error)
    }
  }

  // Reset to mock data
  private resetToMock() {
    this.users = [...MOCK_USERS]
    this.products = [...MOCK_PRODUCTS]
    this.orders = [...MOCK_ORDERS]
    this.categories = [...MOCK_CATEGORIES]
    this.save()
  }

  // ========== USER FUNCTIONS ==========

  getUsers(): User[] {
    return this.users
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id)
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  }

  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const now = new Date().toISOString()
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...userData,
      createdAt: now,
      updatedAt: now
    }
    this.users.push(newUser)
    this.save()
    return newUser
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) return undefined

    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.save()
    return this.users[index]
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) return false

    this.users.splice(index, 1)
    this.save()
    return true
  }

  // ========== PRODUCT FUNCTIONS ==========

  getProducts(): Product[] {
    return this.products
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id)
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category)
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter(p => p.featured)
  }

  getProductsInStock(): Product[] {
    return this.products.filter(p => p.inStock && p.stock > 0)
  }

  searchProducts(query: string): Product[] {
    const q = query.toLowerCase()
    return this.products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }

  createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const now = new Date().toISOString()
    const newProduct: Product = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...productData,
      createdAt: now,
      updatedAt: now
    }
    this.products.push(newProduct)
    this.save()
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return undefined

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.save()
    return this.products[index]
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    this.save()
    return true
  }

  updateStock(id: string, quantity: number): boolean {
    const product = this.getProductById(id)
    if (!product) return false

    product.stock = quantity
    product.inStock = quantity > 0
    product.updatedAt = new Date().toISOString()
    this.save()
    return true
  }

  // ========== ORDER FUNCTIONS ==========

  getOrders(): Order[] {
    return this.orders
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id)
  }

  getOrdersByUser(userId: string): Order[] {
    return this.orders.filter(o => o.userId === userId)
  }

  getOrdersByStatus(status: Order['status']): Order[] {
    return this.orders.filter(o => o.status === status)
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
    const now = new Date().toISOString()
    const newOrder: Order = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
      createdAt: now,
      updatedAt: now
    }
    this.orders.push(newOrder)
    this.save()
    return newOrder
  }

  updateOrderStatus(id: string, status: Order['status']): Order | undefined {
    const order = this.getOrderById(id)
    if (!order) return undefined

    order.status = status
    order.updatedAt = new Date().toISOString()
    this.save()
    return order
  }

  updatePaymentStatus(id: string, paymentStatus: Order['paymentStatus']): Order | undefined {
    const order = this.getOrderById(id)
    if (!order) return undefined

    order.paymentStatus = paymentStatus
    order.updatedAt = new Date().toISOString()
    this.save()
    return order
  }

  // ========== CATEGORY FUNCTIONS ==========

  getCategories(): Category[] {
    return this.categories
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(c => c.id === id)
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find(c => c.slug === slug)
  }

  // ========== CART FUNCTIONS ==========

  getCart(userId: string): CartItem[] {
    const key = `cart_${userId}`
    if (typeof window === 'undefined') return []
    
    const cart = localStorage.getItem(key)
    return cart ? JSON.parse(cart) : []
  }

  saveCart(userId: string, cart: CartItem[]): void {
    const key = `cart_${userId}`
    if (typeof window === 'undefined') return
    
    localStorage.setItem(key, JSON.stringify(cart))
  }

  addToCart(userId: string, product: Product, quantity: number = 1): CartItem[] {
    const cart = this.getCart(userId)
    const existing = cart.find(item => item.productId === product.id)

    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      })
    }

    this.saveCart(userId, cart)
    return cart
  }

  removeFromCart(userId: string, productId: string): CartItem[] {
    const cart = this.getCart(userId)
    const updated = cart.filter(item => item.productId !== productId)
    this.saveCart(userId, updated)
    return updated
  }

  updateCartQuantity(userId: string, productId: string, quantity: number): CartItem[] {
    const cart = this.getCart(userId)
    const item = cart.find(item => item.productId === productId)
    
    if (item) {
      item.quantity = quantity
      this.saveCart(userId, cart)
    }
    
    return cart
  }

  clearCart(userId: string): void {
    const key = `cart_${userId}`
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }

  // ========== STATISTICS FUNCTIONS ==========

  getStats() {
    const totalUsers = this.users.length
    const totalProducts = this.products.length
    const totalOrders = this.orders.length
    const totalRevenue = this.orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0)
    
    const pendingOrders = this.orders.filter(o => o.status === 'pending').length
    const processingOrders = this.orders.filter(o => o.status === 'processing').length
    const completedOrders = this.orders.filter(o => o.status === 'delivered').length
    
    const outOfStock = this.products.filter(p => !p.inStock).length
    const featuredProducts = this.products.filter(p => p.featured).length
    
    const avgOrderValue = totalOrders > 0 
      ? totalRevenue / totalOrders 
      : 0

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      processingOrders,
      completedOrders,
      outOfStock,
      featuredProducts,
      avgOrderValue
    }
  }

  // ========== UTILITY FUNCTIONS ==========

  resetDatabase(): void {
    this.resetToMock()
  }

  clearDatabase(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem('db_users')
    localStorage.removeItem('db_products')
    localStorage.removeItem('db_orders')
    localStorage.removeItem('db_categories')
    
    this.users = []
    this.products = []
    this.orders = []
    this.categories = []
  }

  exportData(): string {
    return JSON.stringify({
      users: this.users,
      products: this.products,
      orders: this.orders,
      categories: this.categories
    })
  }

  importData(json: string): boolean {
    try {
      const data = JSON.parse(json)
      if (data.users) this.users = data.users
      if (data.products) this.products = data.products
      if (data.orders) this.orders = data.orders
      if (data.categories) this.categories = data.categories
      this.save()
      return true
    } catch {
      return false
    }
  }
}

// ========== EXPORT SINGLETON INSTANCE ==========

export const db = new Database()

// ========== HELPER FUNCTIONS ==========

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function calculateOrderTotal(items: OrderItem[], taxRate: number = 0.1, shipping: number = 10): {
  subtotal: number
  tax: number
  shipping: number
  total: number
} {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax + shipping
  
  return { subtotal, tax, shipping, total }
}

export function getLowStockProducts(products: Product[], threshold: number = 5): Product[] {
  return products.filter(p => p.inStock && p.stock < threshold)
}

export default db