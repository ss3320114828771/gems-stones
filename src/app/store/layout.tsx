import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16">
        {children}
      </main>
      <Footer />
    </>
  )
}