'use client'

import { useState, useEffect } from 'react'
import ProductCard from './product-card'

interface ProductGridProps {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: string
  featured?: boolean
  limit?: number
  columns?: 2 | 3 | 4
  showHeader?: boolean
  title?: string
}

// Mock products data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Ruby Stone - Natural Certified',
    price: 299,
    originalPrice: 399,
    image: '/n1.jpeg',
    category: 'precious',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    description: 'Natural certified ruby with deep red color.'
  },
  {
    id: 2,
    name: 'Blue Sapphire - Ceylon',
    price: 399,
    image: '/n2.jpeg',
    category: 'precious',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    description: 'Beautiful blue sapphire from Sri Lanka.'
  },
  {
    id: 3,
    name: 'Emerald - Colombian',
    price: 499,
    originalPrice: 599,
    image: '/n3.jpeg',
    category: 'precious',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    featured: true,
    description: 'Rich green emerald from Colombia.'
  },
  {
    id: 4,
    name: 'Amethyst - Purple',
    price: 199,
    image: '/n4.jpeg',
    category: 'semi-precious',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    featured: false,
    description: 'Deep purple amethyst. Perfect for meditation.'
  },
  {
    id: 5,
    name: 'Topaz - Imperial',
    price: 249,
    image: '/n5.jpeg',
    category: 'semi-precious',
    rating: 4.6,
    reviews: 78,
    inStock: false,
    featured: false,
    description: 'Imperial topaz with golden hue.'
  },
  {
    id: 6,
    name: 'Rose Quartz',
    price: 89,
    image: '/n6.jpeg',
    category: 'crystals',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    featured: false,
    description: 'Beautiful rose quartz for love and healing.'
  }
]

export default function ProductGrid({
  category,
  minPrice,
  maxPrice,
  search,
  sort = 'featured',
  featured = false,
  limit = 12,
  columns = 3,
  showHeader = true,
  title = 'Products'
}: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS)

  // Filter and sort products
  useEffect(() => {
    let filtered = [...MOCK_PRODUCTS]

    // Filter by featured
    if (featured) {
      filtered = filtered.filter(p => p.featured)
    }

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }

    // Filter by price range
    if (minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= minPrice)
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= maxPrice)
    }

    // Filter by search query
    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch(sort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id - a.id
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

    // Apply limit
    filtered = filtered.slice(0, limit)

    setFilteredProducts(filtered)
  }, [category, minPrice, maxPrice, search, sort, featured, limit])

  // Get columns class
  const getColumnsClass = () => {
    switch(columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2'
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div>
      {/* Header */}
      {showHeader && (
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-2xl">
          <p className="text-white/60">No products found</p>
        </div>
      ) : (
        <div className={`grid ${getColumnsClass()} gap-6`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              category={product.category}
              rating={product.rating}
              reviews={product.reviews}
              inStock={product.inStock}
              description={product.description}
            />
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="text-center text-white/40 text-sm mt-6">
        Showing {filteredProducts.length} products
      </div>
    </div>
  )
}