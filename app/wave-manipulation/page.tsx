'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Link from 'next/link'

const WaveManipulation: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [waveAmplitude, setWaveAmplitude] = useState(10)
  const [waveFrequency, setWaveFrequency] = useState(1)
  // const [environmentalFrequency, setEnvironmentalFrequency] = useState(0.5)
  // const [clarity, setClarity] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  // const router = useRouter()

  const originalImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const storedImageData = localStorage.getItem('capturedWaveImage')
    if (storedImageData) {
      setImageData(storedImageData)
      localStorage.removeItem('capturedWaveImage')

      const img = new Image()
      img.onload = () => {
        originalImageRef.current = img
        if (canvasRef.current && containerRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
          }
        
          // Set canvas size to match the container, maintaining aspect ratio
          const containerAspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight
          const imageAspectRatio = img.width / img.height
        
          let canvasWidth, canvasHeight
        
          if (containerAspectRatio > imageAspectRatio) {
            canvasHeight = containerRef.current.clientHeight
            canvasWidth = canvasHeight * imageAspectRatio
          } else {
            canvasWidth = containerRef.current.clientWidth
            canvasHeight = canvasWidth / imageAspectRatio
          }
        
          canvasRef.current.width = canvasWidth
          canvasRef.current.height = canvasHeight
        
          animate()
        }
      }
      img.src = storedImageData
    }
  }, [])

  const animate = useCallback(() => {
    return () => {
      const animateFrame = (time: number) => {
        if (canvasRef.current && originalImageRef.current) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          if (!ctx) return

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.save()
          ctx.translate(canvas.width / 2, canvas.height / 2)
          ctx.rotate(rotation * Math.PI / 180)
        
          const imageAspectRatio = originalImageRef.current.width / originalImageRef.current.height
          const canvasAspectRatio = canvas.width / canvas.height
        
          let drawWidth, drawHeight
        
          if (canvasAspectRatio > imageAspectRatio) {
            drawHeight = canvas.height * scale
            drawWidth = drawHeight * imageAspectRatio
          } else {
            drawWidth = canvas.width * scale
            drawHeight = drawWidth / imageAspectRatio
          }
        
          // Apply wave effect (stretching and shrinking)
          const stretchFactor = 1 + Math.sin(time * 0.001 * waveFrequency) * (waveAmplitude / 100)
          drawWidth *= stretchFactor
          drawHeight *= stretchFactor

          ctx.drawImage(originalImageRef.current, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)

          ctx.restore()
        }
        animationRef.current = requestAnimationFrame(animateFrame)
        
        // Return a cleanup function
        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      }
      animationRef.current = requestAnimationFrame(animateFrame)
    }
  }, [scale, rotation, waveAmplitude, waveFrequency])

  useEffect(() => {
    const animationCleanup = animate()
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (typeof animationCleanup === 'function') {
        animationCleanup()
      }
    }
  }, [animate])

  const handleScale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(event.target.value))
  }

  const handleRotation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(parseFloat(event.target.value))
  }

  const handleWaveAmplitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWaveAmplitude(parseFloat(event.target.value))
  }

  const handleWaveFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWaveFrequency(parseFloat(event.target.value))
  }

  // const handleEnvironmentalFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnvironmentalFrequency(parseFloat(event.target.value))
  // }

  // const handleClarity = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setClarity(parseFloat(event.target.value))
  // }

  const startRecording = () => {
    if (canvasRef.current) {
      const stream = canvasRef.current.captureStream(60)
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' })

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.style.display = 'none'
        a.href = url
        a.download = 'wave_manipulation.webm'
        a.click()
        window.URL.revokeObjectURL(url)
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      chunksRef.current = []
    }
  }

  const resetControls = () => {
    setScale(1)
    setRotation(0)
    setWaveAmplitude(0)
    setWaveFrequency(1)
  }

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-black">Quantum Wave Manipulation</h1>
      {!imageData ? (
        <div className="text-red-500 mb-4">
          <p>No quantum wave data found. Please go back and capture a wave first.</p>
          <Link href="/wave-capture" className="text-blue-500 underline">
            Return to Wave Capture
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 pr-4">
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Scale:
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={handleScale}
                  className="w-full"
                />
              </label>
              <span className="text-black">{scale.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Rotation:
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={handleRotation}
                  className="w-full"
                />
              </label>
              <span className="text-black">{rotation}°</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Wave Amplitude (Stretch Factor):
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={waveAmplitude}
                  onChange={handleWaveAmplitude}
                  className="w-full"
                />
              </label>
              <span className="text-black">{waveAmplitude}%</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Wave Frequency:
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={waveFrequency}
                  onChange={handleWaveFrequency}
                  className="w-full"
                />
              </label>
              <span className="text-black">{waveFrequency.toFixed(1)} Hz</span>
            </div>
            <div className="mb-4">
              <button
                onClick={resetControls}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Reset Controls
              </button>
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Stop Recording
                </button>
              )}
            </div>
          </div>
          <div className="md:w-2/3" ref={containerRef} style={{ height: '600px' }}>
            <canvas ref={canvasRef} className="border border-gray-300 w-full h-full" />
          </div>
        </div>
      )}
    </div>
  )
}

export default WaveManipulation

