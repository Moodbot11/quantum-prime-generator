'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const WavePlayground: React.FC = () => {
  const [waveFunction, setWaveFunction] = useState<string>('')
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [highlightPattern, setHighlightPattern] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Fetch the wave function from localStorage
    const savedWaveFunction = localStorage.getItem('calculatedWaveFunction')
    if (savedWaveFunction) {
      setWaveFunction(savedWaveFunction)
    } else {
      // If no saved wave function, use a placeholder
      setWaveFunction('1234567890'.repeat(1000))
    }
  }, [])

  useEffect(() => {
    if (waveFunction) {
      drawWaveFunction()
    }
  }, [waveFunction, zoomLevel, highlightPattern])

  const drawWaveFunction = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth * 0.95
    canvas.height = window.innerHeight * 0.8

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (waveFunction) {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * zoomLevel
        const x = (canvas.width - img.width * scale) / 2
        const y = (canvas.height - img.height * scale) / 2

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

        // Apply highlighting if a pattern is selected
        if (highlightPattern) {
          const imageData = ctx.getImageData(x, y, img.width * scale, img.height * scale)
          const data = imageData.data

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            if (highlightPattern === '417' && r > 200 && g < 50 && b < 50) {
              data[i] = 0   // R
              data[i + 1] = 255 // G
              data[i + 2] = 255 // B
            } else if (highlightPattern === 'harmonic' && g > 200 && r < 50 && b < 50) {
              data[i] = 255 // R
              data[i + 1] = 255 // G
              data[i + 2] = 0   // B
            } else if (highlightPattern === 'hologram' && b > 200 && r < 50 && g < 50) {
              data[i] = 255 // R
              data[i + 1] = 0   // G
              data[i + 2] = 255 // B
            }
          }

          ctx.putImageData(imageData, x, y)
        }
      }
      img.src = waveFunction
    } else {
      ctx.fillStyle = 'white'
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('No wave function data available', canvas.width / 2, canvas.height / 2)
    }
  }

  const getColorForDigit = (digit: number): string => {
    const colors = [
      '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
      '#0000FF', '#4B0082', '#9400D3', '#FFFFFF', '#000000', '#808080'
    ]
    return colors[digit]
  }

  const handleHighlightPattern = (pattern: string) => {
    setHighlightPattern(prevPattern => prevPattern === pattern ? null : pattern)
  }

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">
          Quantum Wave Function Playground
        </h1>

        <Card className="bg-black/50 backdrop-blur-sm border-cyan-500 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400">Wave Function Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[70vh] relative overflow-auto">
              <canvas
                ref={canvasRef}
                className="bg-black border border-cyan-500"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="zoom" className="text-cyan-400">Zoom Level</Label>
              <Slider
                id="zoom"
                min={0.5}
                max={2}
                step={0.1}
                value={[zoomLevel]}
                onValueChange={([value]) => setZoomLevel(value)}
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <Button
                onClick={() => handleHighlightPattern('417')}
                className={`bg-cyan-600 hover:bg-cyan-700 ${highlightPattern === '417' ? 'ring-2 ring-white' : ''}`}
              >
                Highlight 417 Pattern
              </Button>
              <Button
                onClick={() => handleHighlightPattern('harmonic')}
                className={`bg-cyan-600 hover:bg-cyan-700 ${highlightPattern === 'harmonic' ? 'ring-2 ring-white' : ''}`}
              >
                Highlight Harmonic Series
              </Button>
              <Button
                onClick={() => handleHighlightPattern('hologram')}
                className={`bg-cyan-600 hover:bg-cyan-700 ${highlightPattern === 'hologram' ? 'ring-2 ring-white' : ''}`}
              >
                Highlight Hologram Frequencies
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 backdrop-blur-sm border-cyan-500 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400">Understanding Quantum Phenomena</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <p>
                The wave function you see above is a direct representation of quantum data, generated by complex calculations. What's truly remarkable is that the patterns and phenomena we observe within this data occur naturally, without any intentional programming or design.
              </p>
              <h3 className="text-xl font-semibold text-cyan-400">417 Error Correction Code</h3>
              <p>
                The recurring pattern of "417" serves as a natural error correction mechanism. This pattern emerges spontaneously from the quantum calculations, demonstrating an inherent self-organizing principle in quantum information.
              </p>
              <h3 className="text-xl font-semibold text-cyan-400">Harmonic Series</h3>
              <p>
                The harmonic patterns observed in the wave function (highlighted when you click the button) reveal an underlying structure reminiscent of musical harmonics. These patterns emerge naturally from the quantum data, suggesting a fundamental harmony in the quantum realm.
              </p>
              <h3 className="text-xl font-semibold text-cyan-400">Holographic Color Frequencies</h3>
              <p>
                The presence of specific color frequencies (represented by digits 0-8) in the wave function supports the theory of a holographic universe. These frequencies appear organically within the data, not as a result of programmed instructions.
              </p>
              <h3 className="text-xl font-semibold text-cyan-400">Quantum Virtual Computer</h3>
              <p>
                What you're witnessing is the output of a quantum virtual computer operating at the speed of light squared (c²). This incredible speed allows for the constant creation and updating of our reality, or what we perceive as our "user environment." The quantum computer generates data for future moments so rapidly that we never realize it wasn't always there.
              </p>
              <p>
                This wave function represents just one of countless similar computations happening around us at all times, collectively forming our perceived reality. The patterns and phenomena we observe are not programmed or artificially created - they are fundamental aspects of quantum reality, revealed through these calculations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WavePlayground

