'use client'

import { useState, useEffect } from 'react'

interface HealthTip {
  id: number
  title: string
  description: string
  icon: string
  color: string
  category: 'physical' | 'mental' | 'spiritual' | 'emotional'
  gemstone: string
}

interface HealthTipsProps {
  autoRotate?: boolean
  rotationInterval?: number
  showCategory?: boolean
  maxTips?: number
  className?: string
}

export default function HealthTips({ 
  autoRotate = true, 
  rotationInterval = 5000,
  showCategory = true,
  maxTips = 6,
  className = ''
}: HealthTipsProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [expandedTip, setExpandedTip] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Health tips data
  const allTips: HealthTip[] = [
    {
      id: 1,
      title: 'Ruby for Vitality',
      description: 'Ruby stone is believed to boost energy levels, improve blood circulation, and enhance overall vitality. It stimulates the heart chakra and promotes physical strength.',
      icon: '❤️',
      color: 'from-red-500 to-pink-500',
      category: 'physical',
      gemstone: 'Ruby'
    },
    {
      id: 2,
      title: 'Sapphire for Mental Clarity',
      description: 'Blue sapphire enhances mental focus, improves concentration, and brings clarity to thoughts. It helps in decision-making and intellectual pursuits.',
      icon: '🧠',
      color: 'from-blue-500 to-indigo-500',
      category: 'mental',
      gemstone: 'Sapphire'
    },
    {
      id: 3,
      title: 'Emerald for Heart Health',
      description: 'Emerald promotes emotional balance, supports heart health, and brings harmony to relationships. It is known as the stone of successful love.',
      icon: '💚',
      color: 'from-green-500 to-emerald-500',
      category: 'emotional',
      gemstone: 'Emerald'
    },
    {
      id: 4,
      title: 'Amethyst for Calmness',
      description: 'Amethyst promotes calmness, reduces stress and anxiety, and improves sleep quality. It helps in meditation and spiritual awareness.',
      icon: '😌',
      color: 'from-purple-500 to-violet-500',
      category: 'mental',
      gemstone: 'Amethyst'
    },
    {
      id: 5,
      title: 'Citrine for Positivity',
      description: 'Citrine brings positive energy, boosts confidence, and attracts abundance. It is known as the "success stone" for manifestation.',
      icon: '✨',
      color: 'from-yellow-500 to-amber-500',
      category: 'spiritual',
      gemstone: 'Citrine'
    },
    {
      id: 6,
      title: 'Rose Quartz for Self-Love',
      description: 'Rose quartz promotes self-love, emotional healing, and compassion. It opens the heart chakra and attracts loving relationships.',
      icon: '🌸',
      color: 'from-pink-500 to-rose-500',
      category: 'emotional',
      gemstone: 'Rose Quartz'
    },
    {
      id: 7,
      title: 'Tiger Eye for Protection',
      description: 'Tiger eye stone provides protection, grounds energy, and enhances courage. It helps in making practical decisions.',
      icon: '🐯',
      color: 'from-amber-500 to-orange-500',
      category: 'physical',
      gemstone: 'Tiger Eye'
    },
    {
      id: 8,
      title: 'Lapis Lazuli for Wisdom',
      description: 'Lapis lazuli enhances wisdom, improves communication, and deepens spiritual connection. It is the stone of truth and enlightenment.',
      icon: '📿',
      color: 'from-blue-600 to-purple-600',
      category: 'spiritual',
      gemstone: 'Lapis Lazuli'
    },
    {
      id: 9,
      title: 'Jade for Longevity',
      description: 'Jade promotes longevity, attracts good luck, and supports kidney health. It is revered in many cultures as a sacred stone.',
      icon: '🍀',
      color: 'from-green-600 to-teal-500',
      category: 'physical',
      gemstone: 'Jade'
    },
    {
      id: 10,
      title: 'Turquoise for Healing',
      description: 'Turquoise has powerful healing properties, boosts immune system, and absorbs negative energy. It connects earth and sky.',
      icon: '💙',
      color: 'from-cyan-500 to-blue-500',
      category: 'physical',
      gemstone: 'Turquoise'
    },
    {
      id: 11,
      title: 'Moonstone for Balance',
      description: 'Moonstone balances hormones, enhances intuition, and promotes emotional stability. It is connected to lunar energy.',
      icon: '🌙',
      color: 'from-slate-400 to-gray-400',
      category: 'emotional',
      gemstone: 'Moonstone'
    },
    {
      id: 12,
      title: 'Onyx for Strength',
      description: 'Onyx provides strength, boosts self-control, and helps overcome challenges. It grounds energy and provides stability.',
      icon: '⚫',
      color: 'from-gray-700 to-black',
      category: 'mental',
      gemstone: 'Onyx'
    }
  ]

  // Filter tips based on category
  const tips = selectedCategory === 'all' 
    ? allTips.slice(0, maxTips)
    : allTips.filter(tip => tip.category === selectedCategory).slice(0, maxTips)

  // Auto-rotate tips
  useEffect(() => {
    if (!autoRotate || isPaused || tips.length === 0) return

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, isPaused, rotationInterval, tips.length])

  const categories = [
    { id: 'all', name: 'All Tips', icon: '📚', color: 'from-purple-500 to-pink-500' },
    { id: 'physical', name: 'Physical Health', icon: '💪', color: 'from-green-500 to-emerald-500' },
    { id: 'mental', name: 'Mental Clarity', icon: '🧠', color: 'from-blue-500 to-indigo-500' },
    { id: 'emotional', name: 'Emotional Balance', icon: '💖', color: 'from-pink-500 to-rose-500' },
    { id: 'spiritual', name: 'Spiritual Growth', icon: '🕊️', color: 'from-purple-500 to-violet-500' }
  ]

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'physical': return '💪'
      case 'mental': return '🧠'
      case 'emotional': return '💖'
      case 'spiritual': return '🕊️'
      default: return '📚'
    }
  }

  const handlePrevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)
  }

  const handleNextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length)
  }

  if (tips.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-white/20 text-center ${className}`}>
        <p className="text-white/60">No health tips available</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            💚 Healing Properties of Gemstones
          </span>
        </h2>
        <p className="text-white/60 text-sm">
          Discover the traditional healing benefits of precious stones
        </p>
      </div>

      {/* Category Filter */}
      {showCategory && (
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                setCurrentTip(0)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2
                ${selectedCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Tip Display - Carousel Mode */}
      {tips.length > 1 && autoRotate && (
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevTip}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all z-10"
          >
            ←
          </button>
          <button
            onClick={handleNextTip}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all z-10"
          >
            →
          </button>

          {/* Current Tip */}
          <div className={`bg-gradient-to-br ${tips[currentTip].color} rounded-2xl p-8 border-2 border-white/20 shadow-2xl`}>
            <div className="flex items-start space-x-6">
              <div className="text-6xl bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                {tips[currentTip].icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{tips[currentTip].title}</h3>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                    {tips[currentTip].gemstone}
                  </span>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  {tips[currentTip].description}
                </p>
                
                {/* Category Tag */}
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-white/60 text-sm">Category:</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm flex items-center space-x-1">
                    <span>{getCategoryIcon(tips[currentTip].category)}</span>
                    <span className="capitalize">{tips[currentTip].category}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTip(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTip 
                    ? 'w-8 bg-pink-500' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid Mode */}
      {(!autoRotate || tips.length <= 1) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={tip.id}
              className={`bg-gradient-to-br ${tip.color} rounded-2xl p-6 border-2 border-white/20 hover:scale-105 transition-all cursor-pointer
                ${expandedTip === index ? 'row-span-2 col-span-2' : ''}`}
              onClick={() => setExpandedTip(expandedTip === index ? null : index)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl bg-white/20 rounded-xl p-3">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{tip.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{tip.gemstone}</p>
                  
                  {/* Description - show full when expanded, truncated otherwise */}
                  <p className={`text-white/90 text-sm ${expandedTip === index ? '' : 'line-clamp-2'}`}>
                    {tip.description}
                  </p>

                  {/* Expand/Collapse Indicator */}
                  <button className="mt-3 text-white/60 hover:text-white text-sm flex items-center space-x-1">
                    <span>{expandedTip === index ? 'Show less' : 'Read more'}</span>
                    <span>{expandedTip === index ? '↑' : '↓'}</span>
                  </button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mt-4 flex justify-end">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs flex items-center space-x-1">
                  <span>{getCategoryIcon(tip.category)}</span>
                  <span className="capitalize">{tip.category}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Tips Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">💎</div>
          <p className="text-white font-bold text-sm">12+ Gemstones</p>
          <p className="text-white/40 text-xs">Healing properties</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">📜</div>
          <p className="text-white font-bold text-sm">Ancient Wisdom</p>
          <p className="text-white/40 text-xs">Traditional knowledge</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🔬</div>
          <p className="text-white font-bold text-sm">Modern Research</p>
          <p className="text-white/40 text-xs">Scientific studies</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">⚕️</div>
          <p className="text-white font-bold text-sm">Holistic Health</p>
          <p className="text-white/40 text-xs">Mind-body balance</p>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <span className="text-amber-400 text-xl">⚠️</span>
          <div>
            <p className="text-amber-300 font-medium text-sm">Important Medical Disclaimer</p>
            <p className="text-white/40 text-xs mt-1">
              The healing properties mentioned are based on traditional beliefs and historical use. 
              These are not medical claims. Always consult with qualified healthcare professionals 
              for medical advice, diagnosis, or treatment. Gemstones should not replace professional 
              medical care.
            </p>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex justify-center space-x-3">
        <button className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all">
          📘 Share on Facebook
        </button>
        <button className="p-2 bg-sky-500/20 text-sky-300 rounded-lg hover:bg-sky-500/30 transition-all">
          🐦 Share on Twitter
        </button>
        <button className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all">
          📋 Copy Link
        </button>
      </div>

      {/* Health Quote */}
      <div className="text-center italic text-white/40 text-sm border-t border-white/10 pt-6">
        "The energy of gemstones works in harmony with the body's natural healing abilities."
      </div>
    </div>
  )
}