'use client'

import { useState, useEffect } from 'react'

// Simple types
type Product = {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  image: string
  images?: string[]
  inStock: boolean
  featured?: boolean
  rating?: number
  reviews?: number
  colors?: string[]
  sizes?: string[]
  createdAt?: string
}

type FilterOptions = {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  search?: string
}

// Mock products for demo
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ruby Stone - Natural Certified',
    price: 299,
    originalPrice: 399,
    description: 'Natural certified ruby with deep red color. Perfect for jewelry and collection.',
    category: 'precious',
    image: '/n1.jpeg',
    images: ['/n1.jpeg', '/n2.jpeg', '/n3.jpeg'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 124,
    colors: ['Red', 'Dark Red'],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Blue Sapphire - Ceylon',
    price: 399,
    description: 'Beautiful blue sapphire from Sri Lanka. Excellent clarity and cut.',
    category: 'precious',
    image: '/n2.jpeg',
    images: ['/n2.jpeg', '/n3.jpeg', '/n4.jpeg'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 89,
    colors: ['Blue', 'Light Blue'],
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    name: 'Emerald - Colombian',
    price: 499,
    originalPrice: 599,
    description: 'Rich green emerald from Colombia. Natural inclusions guarantee authenticity.',
    category: 'precious',
    image: '/n3.jpeg',
    images: ['/n3.jpeg', '/n4.jpeg', '/n5.jpeg'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 56,
    colors: ['Green', 'Dark Green'],
    createdAt: '2024-01-14'
  },
  {
    id: 4,
    name: 'Diamond - Solitaire',
    price: 999,
    description: 'Brilliant cut diamond. VS clarity, excellent cut grade.',
    category: 'precious',
    image: '/n4.jpeg',
    images: ['/n4.jpeg', '/n5.jpeg', '/n6.jpeg'],
    inStock: false,
    featured: true,
    rating: 5.0,
    reviews: 45,
    createdAt: '2024-01-13'
  },
  {
    id: 5,
    name: 'Amethyst - Purple',
    price: 199,
    description: 'Deep purple amethyst. Perfect for meditation and healing.',
    category: 'semi-precious',
    image: '/n5.jpeg',
    images: ['/n5.jpeg', '/n6.jpeg', '/n1.jpeg'],
    inStock: true,
    rating: 4.5,
    reviews: 234,
    colors: ['Purple', 'Lavender'],
    sizes: ['Small', 'Medium', 'Large'],
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    name: 'Topaz - Imperial',
    price: 249,
    originalPrice: 299,
    description: 'Imperial topaz with golden hue. Rare and beautiful.',
    category: 'semi-precious',
    image: '/n6.jpeg',
    images: ['/n6.jpeg', '/n1.jpeg', '/n2.jpeg'],
    inStock: true,
    rating: 4.6,
    reviews: 78,
    colors: ['Yellow', 'Golden'],
    createdAt: '2024-01-12'
  },
  {
    id: 7,
    name: 'Rose Quartz',
    price: 89,
    description: 'Beautiful rose quartz for love and healing.',
    category: 'crystals',
    image: '/n1.jpeg',
    images: ['/n1.jpeg', '/n2.jpeg', '/n3.jpeg'],
    inStock: true,
    rating: 4.4,
    reviews: 156,
    colors: ['Pink', 'Light Pink'],
    createdAt: '2024-01-11'
  },
  {
    id: 8,
    name: 'Citrine - Golden',
    price: 159,
    description: 'Golden citrine for abundance and positivity.',
    category: 'semi-precious',
    image: '/n2.jpeg',
    images: ['/n2.jpeg', '/n3.jpeg', '/n4.jpeg'],
    inStock: true,
    rating: 4.3,
    reviews: 67,
    colors: ['Yellow', 'Orange'],
    createdAt: '2024-01-11'
  },
  {
    id: 9,
    name: 'Onyx - Black',
    price: 129,
    description: 'Black onyx for protection and strength.',
    category: 'semi-precious',
    image: '/n3.jpeg',
    images: ['/n3.jpeg', '/n4.jpeg', '/n5.jpeg'],
    inStock: true,
    rating: 4.2,
    reviews: 43,
    colors: ['Black'],
    createdAt: '2024-01-10'
  },
  {
    id: 10,
    name: 'Turquoise',
    price: 289,
    description: 'Natural turquoise with beautiful matrix.',
    category: 'precious',
    image: '/n4.jpeg',
    images: ['/n4.jpeg', '/n5.jpeg', '/n6.jpeg'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 34,
    colors: ['Blue', 'Green'],
    createdAt: '2024-01-10'
  }
]

// Main products hook
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load products on start
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(r => setTimeout(r, 500))
      
      // Check localStorage first
      const saved = localStorage.getItem('products')
      if (saved) {
        setProducts(JSON.parse(saved))
      } else {
        // Use mock products
        setProducts(MOCK_PRODUCTS)
        localStorage.setItem('products', JSON.stringify(MOCK_PRODUCTS))
      }
      setError(null)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Get all products with optional filtering
  const getProducts = (options?: FilterOptions) => {
    let filtered = [...products]

    if (options) {
      if (options.category) {
        filtered = filtered.filter(p => p.category === options.category)
      }
      if (options.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= options.minPrice!)
      }
      if (options.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= options.maxPrice!)
      }
      if (options.inStock) {
        filtered = filtered.filter(p => p.inStock)
      }
      if (options.featured) {
        filtered = filtered.filter(p => p.featured)
      }
      if (options.search) {
        const searchLower = options.search.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
        )
      }
    }

    return filtered
  }

  // Get single product by ID
  const getProduct = (id: string | number) => {
    return products.find(p => p.id === id)
  }

  // Get related products (same category)
  const getRelatedProducts = (productId: string | number, limit = 4) => {
    const product = getProduct(productId)
    if (!product) return []
    
    return products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit)
  }

  // Get featured products
  const getFeaturedProducts = (limit = 6) => {
    return products
      .filter(p => p.featured)
      .slice(0, limit)
  }

  // Get products by category
  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category)
  }

  // Get unique categories
  const getCategories = () => {
    const categories = products.map(p => p.category)
    return [...new Set(categories)]
  }

  // Get price range
  const getPriceRange = () => {
    if (products.length === 0) return { min: 0, max: 0 }
    const prices = products.map(p => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }

  // Admin functions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    }
    const updated = [newProduct, ...products]
    setProducts(updated)
    localStorage.setItem('products', JSON.stringify(updated))
    return newProduct
  }

  const updateProduct = (id: string | number, updates: Partial<Product>) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, ...updates } : p
    )
    setProducts(updated)
    localStorage.setItem('products', JSON.stringify(updated))
  }

  const deleteProduct = (id: string | number) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    localStorage.setItem('products', JSON.stringify(updated))
  }

  // Statistics
  const getProductStats = () => {
    const total = products.length
    const inStock = products.filter(p => p.inStock).length
    const outOfStock = total - inStock
    const featured = products.filter(p => p.featured).length
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / total
    const totalValue = products.reduce((sum, p) => sum + p.price, 0)

    return {
      total,
      inStock,
      outOfStock,
      featured,
      avgPrice: Math.round(avgPrice * 100) / 100,
      totalValue
    }
  }

  return {
    // Data
    products,
    loading,
    error,
    refresh: loadProducts,

    // Get functions
    getProducts,
    getProduct,
    getRelatedProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getCategories,
    getPriceRange,

    // Admin functions
    addProduct,
    updateProduct,
    deleteProduct,
    getProductStats
  }
}