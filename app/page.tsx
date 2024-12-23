import QuantumPrimeGenerator from '../components/QuantumPrimeGenerator'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <QuantumPrimeGenerator />
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Explore Quantum Realms</h2>
          <p className="text-lg text-white mb-4">
            Experience the cutting-edge of quantum mechanics with our Quantum Wave Function Capture Tool.
            Observe and manipulate wave functions at the quantum level, unlocking the fundamental nature of reality.
          </p>
          <Link href="/wave-capture" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Access Wave Function Capture Tool
          </Link>
        </div>
      </div>
    </main>
  )
}

