'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  color: string
  icon: string
}

interface HeroSectionProps {
  autoPlay?: boolean
  interval?: number
  showSearch?: boolean
  showStats?: boolean
  height?: 'small' | 'medium' | 'large' | 'full'
  overlay?: 'light' | 'dark' | 'none'
  className?: string
}

export default function HeroSection({
  autoPlay = true,
  interval = 5000,
  showSearch = true,
  showStats = true,
  height = 'large',
  overlay = 'dark',
  className = ''
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // Hero slides data
  const slides: HeroSlide[] = [
    {
      id: 1,
      title: 'Discover Rare Gemstones',
      subtitle: 'Exclusive Collection 2024',
      description: 'Explore our curated selection of the finest precious stones from around the world.',
      image: '/n1.jpeg',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      color: 'from-purple-600 to-pink-600',
      icon: '💎'
    },
    {
      id: 2,
      title: 'Natural Rubies & Sapphires',
      subtitle: 'Certified Authentic',
      description: 'Each gemstone comes with international certification of authenticity.',
      image: '/n2.jpeg',
      ctaText: 'View Collection',
      ctaLink: '/products?category=precious',
      color: 'from-red-600 to-orange-600',
      icon: '❤️'
    },
    {
      id: 3,
      title: 'Luxury Jewelry Collection',
      subtitle: 'Handcrafted Excellence',
      description: 'Discover our exclusive range of handcrafted jewelry pieces.',
      image: '/n3.jpeg',
      ctaText: 'Explore',
      ctaLink: '/products',
      color: 'from-blue-600 to-cyan-600',
      icon: '👑'
    },
    {
      id: 4,
      title: 'Healing Crystals & Stones',
      subtitle: 'Natural Energy',
      description: 'Harness the power of natural crystals for wellness and balance.',
      image: '/n4.jpeg',
      ctaText: 'Learn More',
      ctaLink: '/about',
      color: 'from-green-600 to-emerald-600',
      icon: '✨'
    }
  ]

  // Auto-play slides
  useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isPaused, slides.length])

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Entrance animation
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const getHeightClass = () => {
    switch(height) {
      case 'small': return 'h-[400px]'
      case 'medium': return 'h-[500px]'
      case 'large': return 'h-[600px]'
      case 'full': return 'h-screen'
      default: return 'h-[600px]'
    }
  }

  const getOverlayClass = () => {
    switch(overlay) {
      case 'light': return 'bg-white/30'
      case 'dark': return 'bg-black/50'
      case 'none': return ''
      default: return 'bg-black/50'
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div 
      className={`relative ${getHeightClass()} w-full overflow-hidden rounded-3xl ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`
        }}
      >
        <Image
          src={currentSlideData.image}
          alt={currentSlideData.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${getOverlayClass()} bg-gradient-to-r ${currentSlideData.color} mix-blend-multiply`} />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`max-w-7xl mx-auto px-4 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Icon with Animation */}
          <div className="text-8xl mb-6 animate-bounce">
            {currentSlideData.icon}
          </div>

          {/* Subtitle */}
          <p className="text-pink-300 text-xl md:text-2xl font-light tracking-widest mb-4 animate-pulse">
            {currentSlideData.subtitle}
          </p>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            {currentSlideData.title}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {currentSlideData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href={currentSlideData.ctaLink}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full text-lg hover:from-pink-500 hover:to-yellow-500 transition-all transform hover:scale-110 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">{currentSlideData.ctaText}</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full text-lg border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for gems..."
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white placeholder-white/60 focus:border-pink-500 focus:outline-none transition-all pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  🔍
                </button>

                {/* Search Suggestions */}
                <div className="absolute left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hidden group-focus-within:block">
                  {['Ruby', 'Sapphire', 'Emerald', 'Diamond'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSearchQuery(item)}
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Stats Section */}
      {showStats && (
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-white font-bold text-xl">1000+</div>
                <div className="text-white/60 text-sm">Gemstones</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">🌍</div>
                <div className="text-white font-bold text-xl">25+</div>
                <div className="text-white/60 text-sm">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">👑</div>
                <div className="text-white font-bold text-xl">5000+</div>
                <div className="text-white/60 text-sm">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-white font-bold text-xl">4.9</div>
                <div className="text-white/60 text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all transform hover:scale-110 flex items-center justify-center"
      >
        ←
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all transform hover:scale-110 flex items-center justify-center"
      >
        →
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-pink-500 rounded-full'
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Sale Badge */}
      <div className="absolute top-8 right-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-4 text-white font-bold animate-bounce">
        <div className="text-2xl">-20%</div>
        <div className="text-xs">Limited Time</div>
      </div>
    </div>
  )
}