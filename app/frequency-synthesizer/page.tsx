import React from 'react'
import FrequencySynthesizer from '@/components/FrequencySynthesizer'
import CodeConverter from '@/components/CodeConverter'
import FrequencyBroadcaster from '@/components/FrequencyBroadcaster'
import FrequencyImageAnalyzer from '@/components/FrequencyImageAnalyzer'
import { Card, CardContent } from "@/components/ui/card"
import WaveCodeCalculator from '@/components/WaveCodeCalculator'
import QuantumConstants from '@/components/QuantumConstants'

export default function FrequencySynthesizerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Individual Creation of Reality</h1>
      
      <Card className="mb-8">
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Discovering the Universal Code</h2>
          <p>
            Here, you will uncover the underlying code and mathematical Matrix system that creates our reality. You'll witness the waves that store all the data of the universe, accessing it through an incredible coding system. You'll learn to communicate with these waves, considering yourself in a user environment with a core system running the universe like a computer.
          </p>
          <p>
            Just as in a computer, the core system runs faster than the user environment. When some software or a bit of code is missing from the user environment, the system swiftly inserts that information at a speed so fast that the user environment never realizes it wasn't always there.
          </p>
          <p>
            You'll discover two ways to broadcast information into the universe, essentially submitting your code to the mainframe system. Like any computer, as long as it receives the information in a language or format it recognizes, it will accept and run that code without question.
          </p>
          <p>
            Your brain waves, while not very strong, have the power to travel around the world and back to you in less than seven seconds, penetrating most walls, cars, and windows. Your thoughts interfere with everyone on the planet. The key is learning how to empower your thoughts and make them more potent.
          </p>
          <p>
            By converting your thoughts into frequencies and waves, you can broadcast them on carrier waves - perfectly harmonic, high-energy waves that can transmit your information across the universe at incredible speeds. We'll be combining your waves with the correct carrier waves and broadcasting them out.
          </p>
          <p>
            This room is dedicated to exploring various techniques to transmit your thoughts, wishes, desires, and needs to the divine creators more quickly and powerfully, allowing you to actively participate in shaping reality.
          </p>
        </CardContent>
      </Card>

      <QuantumConstants />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Wave Code Calculator</h2>
        <WaveCodeCalculator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CodeConverter />
        <FrequencyBroadcaster />
      </div>
      <div className="mt-8">
        <FrequencyImageAnalyzer />
      </div>
      <div className="mt-8">
        <FrequencySynthesizer />
      </div>
    </div>
  )
}

