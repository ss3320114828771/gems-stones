'use client'

import { useState } from 'react'
import ProductGrid from '@/components/store/product-grid'
import ProductFilter from '@/components/store/product-filter'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('featured')

  const handleFilterChange = (category: string, priceRange: string, search: string) => {
    setSelectedCategory(category)
    setSelectedPriceRange(priceRange)
    setSearchQuery(search)
  }

  const getPriceRange = () => {
    switch(selectedPriceRange) {
      case 'under100': return { min: 0, max: 100 }
      case '100-300': return { min: 100, max: 300 }
      case '300-500': return { min: 300, max: 500 }
      case '500-1000': return { min: 500, max: 1000 }
      case 'over1000': return { min: 1000, max: 999999 }
      default: return undefined
    }
  }

  const priceRange = getPriceRange()

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            Our Collection
          </span>
        </h1>
        <p className="text-white/60 text-lg">Discover the finest gems from around the world</p>
      </div>

      {/* Filter */}
      <ProductFilter 
        onFilterChange={handleFilterChange}
        selectedCategory={selectedCategory}
        selectedPriceRange={selectedPriceRange}
        searchQuery={searchQuery}
      />

      {/* Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-8 gap-4">
        <p className="text-white/60">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Showing all products'}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-sm">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-pink-500 outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <ProductGrid 
        category={selectedCategory === 'all' ? undefined : selectedCategory}
        minPrice={priceRange?.min}
        maxPrice={priceRange?.max}
        search={searchQuery}
        sort={sortBy}
        featured={false}
        limit={12}
        columns={3}
        showHeader={false}
      />

      {/* Admin Info */}
      <div className="text-center text-white/40 text-sm mt-8">
        <p>Hafiz Sajid Syed - Administrator</p>
        <p>sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}