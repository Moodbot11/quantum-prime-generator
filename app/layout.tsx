import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quantum Prime Generator',
  description: 'Explore quantum computing, prime number patterns, and wave function capture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">Quantum Prime Generator</Link>
            <Link href="/wave-capture" className="text-white hover:text-cyan-400 mr-4">Wave Capture</Link>
            <Link href="/wave-manipulation" className="text-white hover:text-cyan-400">Wave Manipulation</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

