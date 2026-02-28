'use client'

import { useState } from 'react'

interface ProductFilterProps {
  onFilterChange: (category: string, priceRange: string, search: string) => void
  selectedCategory: string
  selectedPriceRange: string
  searchQuery: string
}

export default function ProductFilter({
  onFilterChange,
  selectedCategory,
  selectedPriceRange,
  searchQuery
}: ProductFilterProps) {
  const [category, setCategory] = useState(selectedCategory)
  const [priceRange, setPriceRange] = useState(selectedPriceRange)
  const [search, setSearch] = useState(searchQuery)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    setCategory(newCategory)
    onFilterChange(newCategory, priceRange, search)
  }

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriceRange = e.target.value
    setPriceRange(newPriceRange)
    onFilterChange(category, newPriceRange, search)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    onFilterChange(category, priceRange, newSearch)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Search</label>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-pink-500 outline-none"
          >
            <option value="all">All Categories</option>
            <option value="precious">Precious Gems</option>
            <option value="semi-precious">Semi-Precious</option>
            <option value="crystals">Crystals</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-pink-500 outline-none"
          >
            <option value="all">All Prices</option>
            <option value="under100">Under $100</option>
            <option value="100-300">$100 - $300</option>
            <option value="300-500">$300 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="over1000">$1000+</option>
          </select>
        </div>
      </div>
    </div>
  )
}