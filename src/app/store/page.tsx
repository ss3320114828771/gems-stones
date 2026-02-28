import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/store/hero-section'
import ProductGrid from '@/components/store/product-grid'

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      
      {/* Featured Products */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            Featured Gems
          </span>
        </h2>
        <ProductGrid featured />
      </section>

      {/* Health Benefits Section */}
      <section className="max-w-4xl mx-auto bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30 rounded-3xl p-8 border-2 border-white/20 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          💎 Healing Properties of Gemstones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div className="space-y-2">
            <p className="text-yellow-300 font-bold">• Ruby</p>
            <p>Enhances vitality, courage, and passion. Promotes healthy blood circulation.</p>
          </div>
          <div className="space-y-2">
            <p className="text-blue-300 font-bold">• Sapphire</p>
            <p>Brings mental clarity, wisdom, and protects against negative energy.</p>
          </div>
          <div className="space-y-2">
            <p className="text-green-300 font-bold">• Emerald</p>
            <p>Supports heart health, emotional balance, and unconditional love.</p>
          </div>
          <div className="space-y-2">
            <p className="text-purple-300 font-bold">• Amethyst</p>
            <p>Promotes calmness, better sleep, and spiritual awareness.</p>
          </div>
        </div>
        <p className="text-sm text-white/60 mt-4 text-center">
          *Traditional beliefs - consult healthcare professionals for medical advice
        </p>
      </section>
    </div>
  )
}