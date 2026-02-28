import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-pink-950">
      {/* Simple Navigation */}
      <nav className="absolute top-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-pink-300 transition-colors">
              ✨ GEMS & STONES
            </Link>
            <div className="space-x-4">
              <Link href="/auth/login" className="text-white/80 hover:text-white px-4 py-2">
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-0">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white/30 text-sm">
          © 2024 GEMS & STONES. All rights reserved.
        </p>
      </footer>
    </div>
  )
}