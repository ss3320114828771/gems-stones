import Image from 'next/image'
import AdminInfo from '@/components/shared/admin-info'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
          About Us
        </span>
      </h1>

      <div className="space-y-8">
        {/* Story Section */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
          <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
            <Image src="/n2.jpeg" alt="Store" fill className="object-cover" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-gray-200 leading-relaxed">
            Founded by <span className="text-yellow-300 font-bold">Hafiz Sajid Syed</span> in 2005, 
            Precious Gems & Stones has been providing the finest quality gemstones to collectors, 
            jewelers, and enthusiasts worldwide. With over 20 years of experience in the gem trade, 
            we personally select each stone from the world's most reputable mines.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Quality', desc: 'Only the finest certified gems', color: 'from-pink-500 to-red-500', icon: '💎' },
            { title: 'Authenticity', desc: '100% genuine stones with certificates', color: 'from-blue-500 to-cyan-500', icon: '✅' },
            { title: 'Trust', desc: '20+ years of ethical trading', color: 'from-green-500 to-emerald-500', icon: '🤝' },
          ].map((item) => (
            <div key={item.title} className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-center hover:scale-105 transition-all border-2 border-white/30`}>
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/90">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Health Importance Section */}
        <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-3xl p-8 border-2 border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">💚 Health Benefits of Gemstones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
            <p>• <span className="text-yellow-300">Ruby:</span> Boosts energy & vitality</p>
            <p>• <span className="text-blue-300">Sapphire:</span> Enhances mental clarity</p>
            <p>• <span className="text-green-300">Emerald:</span> Supports heart health</p>
            <p>• <span className="text-purple-300">Amethyst:</span> Promotes calmness</p>
          </div>
          <p className="text-xs text-white/60 mt-4">*Traditional beliefs - consult healthcare professionals</p>
        </div>

        {/* Admin Info Section */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-8 text-center border-2 border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Store Administrator</h2>
          <p className="text-3xl font-bold text-yellow-300 mb-2">Hafiz Sajid Syed</p>
          <p className="text-white">sajid.syed@gmail.com</p>
          <p className="text-white">hafizsajid@gmail.com</p>
        </div>
      </div>
    </div>
  )
}