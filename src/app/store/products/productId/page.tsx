'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in real app, fetch from API
  const product = {
    id: productId,
    name: 'Ruby Stone',
    price: 299,
    category: 'Precious',
    description: 'Natural certified ruby with deep red color. Perfect for jewelry and collection.',
    images: ['/n1.jpeg', '/n2.jpeg', '/n3.jpeg'],
    details: [
      'Weight: 2.5 carats',
      'Origin: Myanmar',
      'Clarity: VS',
      'Cut: Oval',
      'Certified: GIA'
    ]
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 rounded-3xl overflow-hidden border-4 border-white/20">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all
                  ${selectedImage === idx ? 'border-pink-500 scale-105' : 'border-white/20'}`}
              >
                <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          <p className="text-3xl font-bold text-yellow-300">${product.price}</p>
          <p className="text-gray-300">{product.description}</p>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Product Details</h3>
            <ul className="space-y-2">
              {product.details.map((detail, idx) => (
                <li key={idx} className="text-gray-300">• {detail}</li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-white">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white/10 rounded-l-xl text-white hover:bg-white/20"
              >
                -
              </button>
              <span className="w-16 h-10 bg-white/10 flex items-center justify-center text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-white/10 rounded-r-xl text-white hover:bg-white/20"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all">
              Add to Cart
            </button>
            <button className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all">
              Buy Now
            </button>
          </div>

          <Link href="/products" className="block text-center text-white/60 hover:text-white">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}