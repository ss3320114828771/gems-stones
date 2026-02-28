'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Ruby Stone', price: 299, stock: 15, category: 'Precious', image: '/n1.jpeg', status: 'active' },
    { id: 2, name: 'Sapphire', price: 399, stock: 8, category: 'Precious', image: '/n2.jpeg', status: 'active' },
    { id: 3, name: 'Emerald', price: 499, stock: 12, category: 'Precious', image: '/n3.jpeg', status: 'active' },
    { id: 4, name: 'Diamond', price: 999, stock: 5, category: 'Precious', image: '/n4.jpeg', status: 'active' },
    { id: 5, name: 'Amethyst', price: 199, stock: 20, category: 'Semi-Precious', image: '/n5.jpeg', status: 'inactive' },
    { id: 6, name: 'Topaz', price: 249, stock: 18, category: 'Semi-Precious', image: '/n6.jpeg', status: 'active' },
  ])

  const [search, setSearch] = useState('')

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            Products Management
          </span>
        </h1>
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all">
          + Add New Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-3">Image</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Stock</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="text-white hover:bg-white/5">
                <td className="py-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="py-3 font-bold">{product.name}</td>
                <td className="py-3 text-white/80">{product.category}</td>
                <td className="py-3 text-yellow-300 font-bold">${product.price}</td>
                <td className="py-3">
                  <span className={product.stock > 10 ? 'text-green-400' : 'text-orange-400'}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  } text-white`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30">Edit</button>
                    <button className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}