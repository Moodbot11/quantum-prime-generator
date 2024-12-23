'use client'

import React, { useState, useRef } from 'react'
import Big from 'big.js'
import ImageCapture from './ImageCapture'

type Big = any;

const QuantumWaveFunctionCaptureTool: React.FC = () => {
  Big.DP = 9999;
  Big.RM = Big.roundDown;

  const [frequency1, setFrequency1] = useState('')
  const [frequency2, setFrequency2] = useState('')
  const [operation, setOperation] = useState<'multiply' | 'divide' | 'superposition' | 'interference' | 'entanglement' | 'quantum-fourier'>('multiply')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [showImageCapture, setShowImageCapture] = useState(false)
  const [outputDigits, setOutputDigits] = useState<number>(9999)
  const [quantumNoise, setQuantumNoise] = useState(0)

  const resultCanvasRef = useRef<HTMLCanvasElement>(null)

  const handleCapture = () => {
    setError('')
    setResult('')

    try {
      const bigFreq1 = new Big(frequency1)
      const bigFreq2 = new Big(frequency2)

      let capturedResult: Big

      switch (operation) {
        case 'multiply':
          capturedResult = bigFreq1.times(bigFreq2)
          break
        case 'divide':
          if (bigFreq2.eq(0)) {
            throw new Error('Division by zero is not allowed')
          }
          capturedResult = bigFreq1.div(bigFreq2)
          break
        case 'superposition':
          capturedResult = bigFreq1.plus(bigFreq2)
          break
        case 'interference':
          capturedResult = bigFreq1.times(bigFreq2).mod(1)
          break
        case 'entanglement':
          capturedResult = bigFreq1.times(bigFreq2).sqrt()
          break
        case 'quantum-fourier':
          capturedResult = bigFreq1.times(Math.PI).times(bigFreq2).sin()
          break
        default:
          throw new Error('Invalid operation')
      }

      // Apply quantum noise
      if (quantumNoise > 0) {
        const noise = new Big(Math.random()).times(quantumNoise)
        capturedResult = capturedResult.plus(noise).minus(noise.div(2))
      }

      let formattedResult = capturedResult.toFixed(outputDigits)
      formattedResult = formattedResult.replace(/\.?0+$/, "")
      if (formattedResult.length > outputDigits) {
        formattedResult = formattedResult.slice(0, outputDigits)
      }

      setResult(formattedResult)
      renderResult(formattedResult)
    } catch (err) {
      console.error('Error in handleCapture:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during wave function capture')
    }
  }

  const renderResult = (result: string) => {
    const canvas = resultCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const padding = 50 // 50 pixels border
    const maxWidth = 800
    const fontSize = 14
    const scale = 0.67 // 67% of original size
    const lineHeight = fontSize * 1.2

    ctx.font = `${fontSize}px monospace`

    const words = result.split('')
    const lines: string[] = [''] 
    let currentLineWidth = 0

    for (const word of words) {
      const wordWidth = ctx.measureText(word).width
      if (currentLineWidth + wordWidth > maxWidth) {
        lines.push('')
        currentLineWidth = 0
      }
      lines[lines.length - 1] += word
      currentLineWidth += wordWidth
    }

    const textWidth = Math.min(maxWidth, Math.max(...lines.map(line => ctx.measureText(line).width)))
    const textHeight = lines.length * lineHeight

    const scaledWidth = (textWidth + padding * 2) * scale
    const scaledHeight = (textHeight + padding * 2) * scale

    canvas.width = scaledWidth
    canvas.height = scaledHeight

    // Create a white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.scale(scale, scale)

    ctx.font = `${fontSize}px monospace`
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'top'

    lines.forEach((line, index) => {
      const x = padding
      const y = padding + index * lineHeight
      ctx.fillText(line, x, y)
    })
  }

  const handleCaptureImage = () => {
    if (result) {
      setShowImageCapture(true)
    } else {
      setError('No wave function captured. Please capture a wave function first.')
    }
  }

  return (
    <div className="p-6 rounded-lg shadow-lg mx-auto bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Quantum Wave Function Capture Tool (up to 9999 digits input/output)</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="frequency1" className="block text-sm font-medium">Frequency 1</label>
          <textarea
            id="frequency1"
            value={frequency1}
            onChange={(e) => setFrequency1(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-y min-h-[100px]"
            placeholder="Enter frequency (up to 9999 digits)"
          />
        </div>
        <div>
          <label htmlFor="frequency2" className="block text-sm font-medium">Frequency 2</label>
          <textarea
            id="frequency2"
            value={frequency2}
            onChange={(e) => setFrequency2(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-y min-h-[100px]"
            placeholder="Enter frequency (up to 9999 digits)"
          />
        </div>
        <div>
          <label htmlFor="operation" className="block text-sm font-medium">Quantum Operation</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as typeof operation)}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
            <option value="superposition">Superposition</option>
            <option value="interference">Interference</option>
            <option value="entanglement">Entanglement</option>
            <option value="quantum-fourier">Quantum Fourier Transform</option>
          </select>
        </div>
        <div>
          <label htmlFor="outputDigits" className="block text-sm font-medium">Output Digits (1-9999)</label>
          <input
            type="number"
            id="outputDigits"
            value={outputDigits}
            onChange={(e) => setOutputDigits(Math.min(9999, Math.max(1, parseInt(e.target.value) || 1)))}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="1"
            max="9999"
          />
        </div>
        <div>
          <label htmlFor="quantumNoise" className="block text-sm font-medium">Quantum Noise (0-1)</label>
          <input
            type="number"
            id="quantumNoise"
            value={quantumNoise}
            onChange={(e) => setQuantumNoise(Math.min(1, Math.max(0, parseFloat(e.target.value) || 0)))}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            max="1"
            step="0.01"
          />
        </div>
        <button
          onClick={handleCapture}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Capture Wave Function
        </button>
        {error && (
          <div className="text-red-500 mt-2">{error}</div>
        )}
        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-cyan-400 mb-2">Captured Quantum State:</h3>
            <div className="bg-gray-100 p-4 rounded-md mt-2 w-full overflow-x-auto">
              <div className="flex justify-center items-center">
                <canvas ref={resultCanvasRef} className="mx-auto" />
              </div>
            </div>
            <button
              onClick={handleCaptureImage}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Capture Wave Image
            </button>
          </div>
        )}
      </div>
      {showImageCapture && (
        <ImageCapture
          content={result}
          onClose={() => setShowImageCapture(false)}
        />
      )}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-cyan-400 mb-2">About the Quantum Operations:</h3>
        <p><strong>Multiply:</strong> Standard multiplication of the two frequencies.</p>
        <p><strong>Divide:</strong> Standard division of Frequency 1 by Frequency 2.</p>
        <p><strong>Superposition:</strong> Adds the two frequencies, representing the combination of two quantum states.</p>
        <p><strong>Interference:</strong> Multiplies the frequencies and takes the modulus, simulating quantum wave interaction.</p>
        <p><strong>Entanglement:</strong> Multiplies the frequencies and takes the square root, simulating quantum entanglement.</p>
        <p><strong>Quantum Fourier Transform:</strong> Applies a simplified version of the Quantum Fourier Transform to the frequencies.</p>
        <p><strong>Quantum Noise:</strong> Adds random quantum fluctuations to the result, simulating environmental effects on quantum systems.</p>
      </div>
    </div>
  )
}

export default QuantumWaveFunctionCaptureTool

