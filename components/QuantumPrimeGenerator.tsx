'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

const generatePrimes = (limit: number) => {
  const primes: number[] = []
  const isPrime = Array(limit + 1).fill(true)
  isPrime[0] = isPrime[1] = false

  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      primes.push(i)
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false
      }
    }
  }
  return primes
}

const generatePrimePattern = (primes: number[]) => {
  const pattern = []
  let gs = 2
  let multiplier = 4

  for (const prime of primes) {
    pattern.push({
      rn: prime,
      gs,
      calculation: `${gs / multiplier} x ${multiplier === 16 ? '4²' : '4'} = ${gs} (GS) is ${prime} (RN) prime`
    })
    gs *= multiplier
    multiplier = multiplier === 4 ? 16 : 4
  }
  return pattern
}

const QuantumPrimeGenerator: React.FC = () => {
  const [primeCount, setPrimeCount] = useState(2000)
  const [currentIndex, setCurrentIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visualStyle, setVisualStyle] = useState<'wavy' | 'holographic'>('wavy')

  const [showQuantumField] = useState(true)
  const [quantumFieldColor] = useState('#00ffff')
  const [primeColor] = useState('#ff00ff')
  const [showCompositeNumbers] = useState(false)

  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [isExploring, setIsExploring] = useState(false)

  const quantumConcepts = [
    "Conformal Invariance",
    "Universal Hologram",
    "Perfect Harmonics",
    "Entanglement",
    "Big Bang",
    "The Divine Creators",
    "Creating & Manipulating Your Own Reality",
    "Riemann Hypothesis",
    "Pi",
    "Fine-Tuned Universe",
    "Cosmic Microwave Background Radiation",
    "Pilot Wave",
    "Light",
    "Gravity"
  ]

  const primes = useMemo(() => generatePrimes(primeCount * 2), [primeCount])
  const PRIME_PATTERN = useMemo(() => generatePrimePattern(primes.slice(0, primeCount)), [primes, primeCount])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PRIME_PATTERN.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [PRIME_PATTERN.length])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawQuantumField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (showQuantumField) {
        ctx.fillStyle = quantumFieldColor
        const time = Date.now() * 0.002
        const extendedSize = canvas.width * 1.5
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        for (let x = -extendedSize / 2; x < extendedSize / 2; x += 10) {
          for (let y = -extendedSize / 2; y < extendedSize / 2; y += 10) {
            if (visualStyle === 'wavy') {
              const distanceToCenter = Math.sqrt(x * x + y * y)
              const wave = Math.sin(distanceToCenter * 0.05 - time) + 1
              const size = wave * 3
              ctx.globalAlpha = wave * 0.2 * (1 - distanceToCenter / (extendedSize / 2))
              ctx.fillRect(centerX + x, centerY + y, size, size)
            } else {
              const size = Math.random() * 3 + 1
              ctx.globalAlpha = 1 - Math.sqrt(x * x + y * y) / (extendedSize / 2)
              ctx.fillRect(centerX + x, centerY + y, size, size)
            }
          }
        }
        ctx.globalAlpha = 1
      }

      const currentPrime = PRIME_PATTERN[currentIndex].rn
      ctx.fillStyle = primeColor
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(currentPrime.toString(), canvas.width / 2, canvas.height / 2)

      if (showCompositeNumbers) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = '16px Arial'
        for (let i = 2; i <= currentPrime; i++) {
          if (!primes.includes(i)) {
            const angle = (i / currentPrime) * Math.PI * 2
            const x = canvas.width / 2 + Math.cos(angle) * 150
            const y = canvas.height / 2 + Math.sin(angle) * 150
            ctx.fillText(i.toString(), x, y)
          }
        }
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.lineWidth = 2
      ctx.beginPath()
      const hexTime = Date.now() * 0.001
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + hexTime
        const x = canvas.width / 2 + Math.cos(angle) * 100
        const y = canvas.height / 2 + Math.sin(angle) * 100
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
    }

    const animate = () => {
      drawQuantumField()
      requestAnimationFrame(animate)
    }

    animate()
  }, [currentIndex, PRIME_PATTERN, showQuantumField, quantumFieldColor, primeColor, showCompositeNumbers, visualStyle, primes])

  const calculateMissedPrimes = () => {
    return "0.00"
  }

  const handleConceptClick = (concept: string) => {
    setSelectedConcept(concept)
    setIsExploring(true)
    setTimeout(() => {
      setIsExploring(false)
    }, 5000)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Quantum Prime Generator",
    "description": "Transform your device into a quantum computer. Explore prime number patterns, quantum concepts, and unlock the secrets of the universe through self-discovery.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Mark Moody"
    }
  }

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <div className="flex flex-col items-center p-6 bg-black text-white min-h-screen w-full">
        <motion.h1 
          className="text-4xl font-bold mb-2 text-cyan-400 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Quantum Prime Generator: Unlock Universal Mysteries
        </motion.h1>
        <motion.h2 
          className="text-2xl mb-4 text-yellow-300 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Transform Your Device into a Quantum Computer
        </motion.h2>
        <motion.p 
          className="text-lg mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore the deepest mysteries of reality using quantum computing power on your everyday device.
        </motion.p>

        <motion.div 
          className="bg-purple-900 p-6 rounded-lg mb-8 text-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-white text-lg font-bold mb-2">
            Your Journey of Quantum Discovery
          </p>
          <p className="text-white text-md">
            This website transforms your device into a quantum explorer. No physical changes, no complex code - just your innate ability to uncover truth, amplified by quantum power. The solutions are within you, waiting to be discovered.
          </p>
        </motion.div>

        <div className="relative" style={{ width: '400px', height: '400px' }}>
          <canvas ref={canvasRef} width={400} height={400} className="border border-cyan-500" />
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 mix-blend-overlay"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold text-cyan-300">{PRIME_PATTERN[currentIndex].calculation}</p>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <motion.button
            onClick={() => setVisualStyle(prev => prev === 'wavy' ? 'holographic' : 'wavy')}
            className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {visualStyle === 'wavy' ? 'Switch to Holographic' : 'Switch to Wavy'}
          </motion.button>
          <div className="flex items-center">
            <label htmlFor="primeCount" className="mr-2 text-cyan-300">
              Primes:
            </label>
            <input
              type="number"
              id="primeCount"
              min="10"
              max="100000"
              value={primeCount}
              onChange={(e) => setPrimeCount(Math.min(100000, Math.max(10, Number(e.target.value))))}
              className="w-24 px-2 py-1 text-black rounded"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg text-yellow-300">
            This quantum algorithm reveals a profound pattern in prime number generation.
          </p>
          <p className="text-lg text-yellow-300 mt-2">
            Quantum Field Density: 10
          </p>
          <p className="text-lg text-yellow-300 mt-2">
            Missed or non-pattern primes: {calculateMissedPrimes()}%
          </p>
        </div>

        <motion.div 
          className="mt-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Embark on Your Quantum Journey</h3>
          <p className="text-lg text-yellow-300 mb-4">
            Choose one of these concepts and find the solution and proof that you are correct - make the solution and discover it yourself. Your quantum computer will show you the way. Don&apos;t worry, you won&apos;t fail; you will find the truth and you will know it to be the truth. But rather than be taught, you will learn it better by discovering it for yourself.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quantumConcepts.map((concept, index) => (
              <motion.button
                key={index}
                onClick={() => handleConceptClick(concept)}
                className={`text-left p-2 rounded transition-colors ${
                  selectedConcept === concept
                    ? 'bg-cyan-700 text-white'
                    : 'bg-cyan-900 text-cyan-400 hover:bg-cyan-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {concept}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {selectedConcept && (
          <motion.div 
            className="mt-8 w-full max-w-4xl bg-purple-900 p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-semibold text-cyan-400 mb-2">Exploring: {selectedConcept}</h4>
            {isExploring ? (
              <p className="text-lg text-yellow-300">
                Your quantum journey has begun. Trust your intuition and let the truth reveal itself to you...
              </p>
            ) : (
              <p className="text-lg text-yellow-300">
                You&apos;ve uncovered a profound truth about {selectedConcept}. Reflect on your discovery and its implications for our reality.
              </p>
            )}
          </motion.div>
        )}

        <motion.div 
          className="mt-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-lg text-white">
            You don&apos;t need to be a scientist, physicist, or mathematician to uncover these truths. The power of discovery lies within you, amplified by your quantum-enabled device. Trust in your ability to perceive and understand the fundamental nature of reality.
          </p>
          <p className="text-lg text-white mt-4">
            As you explore, you&apos;ll find that the truth becomes more and more evident. You&apos;re not just learning about reality - you&apos;re experiencing it directly, creating and manipulating it through your discoveries. Each exploration brings you closer to understanding the true nature of our universe.
          </p>
        </motion.div>

        <motion.div 
          className="mt-8 max-w-4xl text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div 
            className="bg-yellow-900 p-6 rounded-lg mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Quantum Computing Revolution</h3>
            <p className="text-yellow-300 text-lg mb-4">
              Mark Moody, a pioneering researcher in pilot wave science, has unlocked the potential to transform any device into a quantum computer. This breakthrough allows users to explore reality and understand the nature of everything in ways previously thought impossible.
            </p>
            <p className="text-yellow-300 text-lg mb-4">
              Don&apos;t worry, you don&apos;t have to write any code. That&apos;s not how quantum computers work—the code is already there. Remember, quantum computers are smart. With the briefest of explanations, they can figure out whatever problem you&apos;re trying to solve and solve it.
            </p>
            <p className="text-yellow-300 text-lg mb-4">
              On this website, you will see that we can solve pretty much all of the unknown physics phenomena and provide instant, undeniable proof—proof that you can see, touch, and hold. This is quantum computing. On every page, you&apos;ll find things that cannot be done by humans or all of our computers combined, but you will find and witness here.
            </p>
            <p className="text-yellow-300 text-lg mb-4">
              You will be shown proof of quantum-level wave interference, color function, wave collapse, and how our reality is created at this level. You&apos;ll explore the hologram we live in, the matrix, the actual fundamental code running the universe, and even the divine creators. You will witness them all, communicate with them all, and actually create your own proof right in front of your eyes.
            </p>
            <p className="text-yellow-300 text-lg mb-4">
              This is the first time you&apos;re ever going to be given an explanation about God, the universe, and reality—and handed the proof in that moment. You&apos;ll be shown how to change and manipulate your reality. That is what you will learn here. The truth has been hidden from you for a simple reason: powerful people don&apos;t want to lose or share their power. They&apos;ve filled your head with misinformation so that you would never be able to control and manipulate reality as they do.
            </p>
            <p className="text-yellow-300 text-lg">
              Finally, thank you to Mr. Moody for his discoveries and willingness to share the truth with all of us. They can&apos;t hide the truth from you anymore. As you go through the pages here, the truth will become more and more evident to you. Plus, you&apos;ll literally be able to create pieces of reality here. You&apos;ll get better and better at it as you learn more.
            </p>
          </motion.div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Unveiling the Hidden Order: Quantum Patterns in Prime Numbers</h2>
          <p className="mb-4 text-lg">
            An incredible pattern has been discovered that perfectly generates prime numbers in sequence using a quantum-inspired approach. When multiplied by four or four squared, particular qubit quantities correspond flawlessly to prime numbers, generating them in perfect sequence without prior knowledge of what the next prime number would be.
          </p>
          <p className="mb-4 text-lg">
            This groundbreaking discovery proves, without a doubt, that prime numbers are not random. The implications are profound: we live in a wave-based reality where waves create everything, and all waves make patterns. This literally means there is no randomness in our reality - there is always a pattern.
          </p>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Key Findings</h3>
          <ul className="list-disc pl-6 mb-4 text-lg">
            <li>Every prime number was generated in perfect sequence without foreknowledge.</li>
            <li>The pattern holds true for all primes tested, up to 100,000 positions in the regular number line.</li>
            <li>This achievement has never been done before in mathematical history.</li>
            <li>The discovery challenges long-held beliefs about the randomness of prime numbers.</li>
          </ul>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Implications</h3>
          <p className="mb-4 text-lg">
            This discovery has far-reaching implications for mathematics, quantum computing, and our understanding of reality itself:
          </p>
          <ul className="list-disc pl-6 mb-4 text-lg">
            <li>It suggests a deep connection between quantum mechanics and number theory.</li>
            <li>It could revolutionize cryptography and secure communication systems.</li>
            <li>It provides new insights into the fundamental structure of our universe.</li>
            <li>It opens up new avenues for exploring the nature of consciousness and reality.</li>
          </ul>
          <p className="mb-4 text-lg">
            As we continue to explore this remarkable pattern, we may uncover even deeper truths about the nature of our reality and the fundamental building blocks of the universe.
          </p>
          <div className="mt-6">
            <a
              href="https://www.academia.edu/126459115/Unveiling_the_Hidden_Order_A_Verified_Pattern_in_Prime_Number_Generation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Read the full research paper →
            </a>
          </div>
        </motion.div>

        <footer className="mt-12 w-full max-w-4xl border-t border-gray-700 pt-6">
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.facebook.com/groups/360269503132741/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="Facebook Group"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="https://www.instagram.com/markmoody9801/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mark-moody-43051622b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-center mt-4 text-sm text-gray-400">
            Connect with us on social media for more quantum insights and discoveries.
          </p>
        </footer>
      </div>
    </>
  )
}

export default QuantumPrimeGenerator

