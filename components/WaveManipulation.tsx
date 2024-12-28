'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const WaveManipulation: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [zoom, setZoom] = useState<number>(1)
  const [aspectRatio, setAspectRatio] = useState<boolean>(true)
  const [activePattern, setActivePattern] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const isDragging = useRef<boolean>(false)
  const isResizing = useRef<boolean>(false)
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const imagePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const imageSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const resizeHandle = useRef<string>('')

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('capturedWaveImage')
    if (storedImageUrl) {
      setImageUrl(storedImageUrl)
    }
  }, [])

  useEffect(() => {
    if (imageUrl) {
      const img = new Image()
      img.onload = () => {
        imageRef.current = img
        resetImagePosition()
      }
      img.src = imageUrl
    }
  }, [imageUrl])

  const resetImagePosition = () => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current
      const img = imageRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const screenWidth = window.innerWidth
      const canvasWidth = screenWidth / 2
      const canvasHeight = canvasWidth * 1.5
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height)
      imageSize.current = {
        width: img.width * scale,
        height: img.height * scale
      }
      imagePosition.current = {
        x: (canvasWidth - imageSize.current.width) / 2,
        y: (canvasHeight - imageSize.current.height) / 2
      }

      setZoom(1)
      drawImage()
    }
  }

  const drawImage = () => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        imageRef.current,
        imagePosition.current.x,
        imagePosition.current.y,
        imageSize.current.width,
        imageSize.current.height
      )

      if (activePattern) {
        highlightPattern(ctx)
      }

      // Draw resize handles
      const handles = [
        { x: imagePosition.current.x, y: imagePosition.current.y, cursor: 'nwse-resize' },
        { x: imagePosition.current.x + imageSize.current.width, y: imagePosition.current.y, cursor: 'nesw-resize' },
        { x: imagePosition.current.x, y: imagePosition.current.y + imageSize.current.height, cursor: 'nesw-resize' },
        { x: imagePosition.current.x + imageSize.current.width, y: imagePosition.current.y + imageSize.current.height, cursor: 'nwse-resize' }
      ]

      handles.forEach(handle => {
        ctx.beginPath()
        ctx.arc(handle.x, handle.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'
        ctx.fill()
        ctx.strokeStyle = 'blue'
        ctx.stroke()
      })
    }
  }

  const highlightPattern = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(
      imagePosition.current.x,
      imagePosition.current.y,
      imageSize.current.width,
      imageSize.current.height
    )
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      switch (activePattern) {
        case '4':
        case '1':
        case '7':
        case '417':
          if (matchesPattern(r, g, b, activePattern)) {
            data[i] = 255   // R
            data[i + 1] = 0 // G
            data[i + 2] = 0 // B
          }
          break
        case 'primes':
          if (isPrime(r + g + b)) {
            data[i] = 0     // R
            data[i + 1] = 255 // G
            data[i + 2] = 0   // B
          }
          break
        case 'harmonics':
          if (isHarmonic(r, g, b)) {
            data[i] = 0     // R
            data[i + 1] = 0   // G
            data[i + 2] = 255 // B
          }
          break
        case 'holographic':
          if (isHolographic(r, g, b)) {
            data[i] = 255   // R
            data[i + 1] = 0   // G
            data[i + 2] = 255 // B
          }
          break
        case 'palindromes':
          if (isPalindrome(r, g, b)) {
            data[i] = 255   // R
            data[i + 1] = 255 // G
            data[i + 2] = 0   // B
          }
          break
      }
    }

    ctx.putImageData(imageData, imagePosition.current.x, imagePosition.current.y)
  }

  const matchesPattern = (r: number, g: number, b: number, pattern: string): boolean => {
    const sum = r + g + b
    const digits = sum.toString().split('')
    return digits.some(digit => pattern.includes(digit))
  }

  const isPrime = (n: number): boolean => {
    if (n <= 1) return false
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false
    }
    return true
  }

  const isHarmonic = (r: number, g: number, b: number): boolean => {
    // Implement harmonic detection logic here
    return false
  }

  const isHolographic = (r: number, g: number, b: number): boolean => {
    // Implement holographic frequency detection logic here
    return false
  }

  const isPalindrome = (r: number, g: number, b: number): boolean => {
    const sum = r + g + b
    const str = sum.toString()
    return str === str.split('').reverse().join('')
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if clicking on a resize handle
      const handles = [
        { x: imagePosition.current.x, y: imagePosition.current.y, handle: 'nw' },
        { x: imagePosition.current.x + imageSize.current.width, y: imagePosition.current.y, handle: 'ne' },
        { x: imagePosition.current.x, y: imagePosition.current.y + imageSize.current.height, handle: 'sw' },
        { x: imagePosition.current.x + imageSize.current.width, y: imagePosition.current.y + imageSize.current.height, handle: 'se' }
      ]

      for (const handle of handles) {
        if (Math.abs(x - handle.x) < 10 && Math.abs(y - handle.y) < 10) {
          isResizing.current = true
          resizeHandle.current = handle.handle
          dragStart.current = { x, y }
          return
        }
      }

      // If not resizing, start dragging
      isDragging.current = true
      dragStart.current = { x, y }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (isDragging.current) {
        const dx = x - dragStart.current.x
        const dy = y - dragStart.current.y

        imagePosition.current = {
          x: imagePosition.current.x + dx,
          y: imagePosition.current.y + dy
        }

        dragStart.current = { x, y }
        drawImage()
      } else if (isResizing.current) {
        const dx = x - dragStart.current.x
        const dy = y - dragStart.current.y

        let newWidth = imageSize.current.width
        let newHeight = imageSize.current.height

        if (resizeHandle.current.includes('e')) newWidth += dx
        if (resizeHandle.current.includes('s')) newHeight += dy
        if (resizeHandle.current.includes('w')) {
          newWidth -= dx
          imagePosition.current.x += dx
        }
        if (resizeHandle.current.includes('n')) {
          newHeight -= dy
          imagePosition.current.y += dy
        }

        if (aspectRatio) {
          const ratio = imageSize.current.width / imageSize.current.height
          if (newWidth / newHeight > ratio) {
            newWidth = newHeight * ratio
          } else {
            newHeight = newWidth / ratio
          }
        }

        imageSize.current = { width: newWidth, height: newHeight }
        dragStart.current = { x, y }
        drawImage()
      } else {
        // Update cursor based on mouse position
        const handles = [
          { x: imagePosition.current.x, y: imagePosition.current.y, cursor: 'nwse-resize' },
          { x: imagePosition.current.x + imageSize.current.width, y: imagePosition.current.y, cursor: 'nesw-resize' },
          { x: imagePosition.current.x, y: imagePosition.current.y + imageSize.current.height, cursor: 'nesw-resize' },
          { x: imagePosition.current.x + imageSize.current.width, y: imagePosition.current.y + imageSize.current.height, cursor: 'nwse-resize' }
        ]

        let cursorStyle = 'default'
        for (const handle of handles) {
          if (Math.abs(x - handle.x) < 10 && Math.abs(y - handle.y) < 10) {
            cursorStyle = handle.cursor
            break
          }
        }
        canvasRef.current.style.cursor = cursorStyle
      }
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    isResizing.current = false
  }

  const handleZoom = (newZoom: number) => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current
      const oldZoom = zoom
      setZoom(newZoom)

      const scaleChange = newZoom / oldZoom

      const oldWidth = imageSize.current.width
      const oldHeight = imageSize.current.height

      imageSize.current = {
        width: imageSize.current.width * scaleChange,
        height: imageSize.current.height * scaleChange
      }

      imagePosition.current = {
        x: imagePosition.current.x + (oldWidth - imageSize.current.width) / 2,
        y: imagePosition.current.y + (oldHeight - imageSize.current.height) / 2
      }

      drawImage()
    }
  }

  const handlePatternSelect = (pattern: string) => {
    setActivePattern(prevPattern => prevPattern === pattern ? null : pattern)
    setExplanation(getExplanation(pattern))
    resetImagePosition()
  }

  const getExplanation = (pattern: string): string => {
    switch (pattern) {
      case '4':
      case '1':
      case '7':
      case '417':
        return "The 4, 1, and 7 patterns, individually or combined, serve as a natural error correction mechanism in quantum data. Their spontaneous emergence demonstrates an inherent self-organizing principle in quantum information, far beyond the capabilities of current man-made computers."
      case 'primes':
        return "The presence of prime number patterns in the quantum wave function suggests a deep connection between quantum mechanics and number theory. This unexpected relationship hints at the fundamental mathematical nature of our reality."
      case 'harmonics':
        return "Harmonic patterns resembling musical harmonics emerge naturally from the quantum data. This suggests a fundamental harmony in the quantum realm, potentially linking quantum physics with principles of music and vibration."
      case 'holographic':
        return "The presence of holographic color frequencies supports the theory of a holographic universe. This implies that our reality might be a projection from a more fundamental level of existence, challenging our understanding of space and time."
      case 'palindromes':
        return "Palindromic patterns in the quantum data suggest a form of quantum symmetry. Their presence could indicate time-reversal symmetry at the quantum level, with profound implications for our understanding of causality and the arrow of time."
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Quantum Wave Function Analysis</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3">
          <Card>
            <CardContent className="p-4">
              <canvas
                ref={canvasRef}
                className="border border-gray-300 bg-white w-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              <div className="mt-4 flex items-center space-x-4">
                <Label htmlFor="zoom-slider">Zoom:</Label>
                <Slider
                  id="zoom-slider"
                  min={0.1}
                  max={2}
                  step={0.01}
                  value={[zoom]}
                  onValueChange={([value]) => handleZoom(value)}
                  className="w-[200px]"
                />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Maintain Aspect Ratio</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="patterns">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>
                <TabsContent value="patterns">
                  <div className="grid grid-cols-2 gap-2">
                    {['4', '1', '7', '417', 'primes', 'harmonics', 'holographic', 'palindromes'].map((pattern) => (
                      <Button
                        key={pattern}
                        onClick={() => handlePatternSelect(pattern)}
                        variant={activePattern === pattern ? "default" : "outline"}
                      >
                        {pattern}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="explanation">
                  <p className="text-sm">{explanation}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WaveManipulation

