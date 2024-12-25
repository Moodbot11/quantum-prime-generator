'use client'

import React, { useState, useRef, useEffect } from 'react'
import WaveManipulation from '@/components/WaveManipulation'
import GoogleAIChatbot from '@/components/GoogleAIChatbot'
import { Button } from "@/components/ui/button"

export default function WaveManipulationPage() {
  const [showChatbot, setShowChatbot] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [spinSpeed, setSpinSpeed] = useState(0.01)
  const [zoomLevel, setZoomLevel] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalImageRef = useRef<HTMLImageElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('capturedWaveImage')
    if (storedImageUrl) {
      setImageUrl(storedImageUrl)
      const img = new Image()
      img.onload = () => {
        originalImageRef.current = img
        drawImage()
      }
      img.src = storedImageUrl
    }
  }, [])

  useEffect(() => {
    drawImage()
  }, [spinSpeed, zoomLevel])

  const drawImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !originalImageRef.current) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let spinOffset = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(spinOffset)
      
      if (originalImageRef.current) {
        const imageAspectRatio = originalImageRef.current.width / originalImageRef.current.height
        const canvasAspectRatio = canvas.width / canvas.height
      
        let drawWidth: number
        let drawHeight: number
      
        if (imageAspectRatio > canvasAspectRatio) {
          drawWidth = canvas.width * zoomLevel
          drawHeight = drawWidth / imageAspectRatio
        } else {
          drawHeight = canvas.height * zoomLevel
          drawWidth = drawHeight * imageAspectRatio
        }
      
        ctx.drawImage(
          originalImageRef.current,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight
        )
      }

      ctx.restore()
      spinOffset += spinSpeed
      animationRef.current = requestAnimationFrame(animate)
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animate()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 p-4">
        <div className="mb-4">
          <label htmlFor="spinSpeed" className="block text-sm font-medium text-gray-700">
            Spin Speed:
          </label>
          <input
            type="range"
            id="spinSpeed"
            min="-0.1"
            max="0.1"
            step="0.001"
            value={spinSpeed}
            onChange={(e) => setSpinSpeed(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zoomLevel" className="block text-sm font-medium text-gray-700">
            Zoom Level:
          </label>
          <input
            type="range"
            id="zoomLevel"
            min="0.1"
            max="3"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <WaveManipulation />
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => setShowChatbot(!showChatbot)} 
          className="w-full py-4 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          {showChatbot ? 'Hide' : 'Consult'} Medical AI Advisor
        </Button>
        {showChatbot && (
          <div className="mt-8">
            <GoogleAIChatbot />
          </div>
        )}
      </div>
    </div>
  )
}

