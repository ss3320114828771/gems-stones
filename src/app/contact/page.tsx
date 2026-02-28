'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
          Contact Us
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 outline-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition-all disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="text-green-400 text-center">Message sent successfully!</p>
            )}
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-8 border-2 border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Visit Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">📍</div>
                <div><p className="text-white font-semibold">Address</p><p className="text-white/80">123 Gem Street, NY 10001</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">📞</div>
                <div><p className="text-white font-semibold">Phone</p><p className="text-white/80">+1 (555) 123-4567</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">✉️</div>
                <div><p className="text-white font-semibold">Email</p><p className="text-white/80">info@gems.com</p></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-3xl p-8 border-2 border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Business Hours</h2>
            <div className="space-y-2 text-white/80">
              <p>Mon-Fri: 9am - 6pm</p>
              <p>Sat: 10am - 4pm</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}