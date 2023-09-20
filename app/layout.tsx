import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Image from 'next/image'

const styles = {
  backgroundImage: 'url("/Main-BG.png")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
}


export const metadata: Metadata = {
  title: 'Saudi Life',
  description: 'Senior Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
      <div style={styles}>
      <Navbar />
      <Hero />
      </div>
        {children}
        <Footer />
        </body>
    </html>
    
  )
}
