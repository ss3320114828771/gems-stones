export default function DirectionsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
          Directions
        </span>
      </h1>

      <div className="space-y-8">
        {/* Map Placeholder */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-2xl text-white/50">Interactive Map Loading...</p>
          </div>
        </div>

        {/* Transport Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'By Subway', icon: '🚇', lines: ['4,5,6 to 42nd St', 'A,C,E to 34th St', 'B,D,F,M to Bryant Park'], color: 'from-purple-900/50 to-pink-900/50' },
            { title: 'By Bus', icon: '🚌', lines: ['M1,M2,M3,M4 to 5th Ave', 'M5 to 42nd St', 'M7 to 7th Ave'], color: 'from-blue-900/50 to-cyan-900/50' },
            { title: 'Parking', icon: '🅿️', lines: ['Street parking available', 'Public garage on 42nd St', 'Valet service available'], color: 'from-green-900/50 to-emerald-900/50' },
            { title: 'Accessibility', icon: '♿', lines: ['Wheelchair accessible', 'Elevator available', 'Assistance available'], color: 'from-orange-900/50 to-red-900/50' },
          ].map((item) => (
            <div key={item.title} className={`bg-gradient-to-br ${item.color} rounded-3xl p-6 border-2 border-white/20`}>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
              <ul className="space-y-2 text-white/80">
                {item.lines.map((line, idx) => <li key={idx}>• {line}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}