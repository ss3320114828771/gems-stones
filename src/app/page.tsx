import Link from 'next/link'
import Image from 'next/image'
import ProductGrid from '@/components/store/product-grid'  // Fixed import


export default function HomePage() {
  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 z-10" />
          <Image src="/n1.jpeg" alt="Hero" fill className="object-cover" />
        </div>
        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse">
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Precious Gems
              </span>
            </h1>
            <p className="text-xl text-white mb-8">Discover the finest collection of imported gemstones</p>
            <Link href="/products" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full text-lg hover:from-pink-500 hover:to-yellow-500 hover:scale-110 transition-all">
              Explore Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
            Featured Gems
          </span>
        </h2>
        <ProductGrid featured />
      </section>

      {/* Admin Info at bottom of home */}
      <div className="text-center text-white">
        <p className="text-lg">Administrator: <span className="text-yellow-300 font-bold">Hafiz Sajid Syed</span></p>
        <p className="text-sm">sajid.syed@gmail.com | hafizsajid@gmail.com</p>
      </div>
    </div>
  )
}