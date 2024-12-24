'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Rnd } from 'react-rnd'

const WaveManipulation: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>(null)
  const [spinSpeed, setSpinSpeed] = useState(1)
  const [shrinkFactor, setShrinkFactor] = useState(1)
  const [leftRightMovement, setLeftRightMovement] = useState(0)
  const [size, setSize] = useState({ width: 600, height: 400 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [keepAspectRatio, setKeepAspectRatio] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const originalImageRef = useRef<HTMLImageElement | null>(null)
  const [inverted, setInverted] = useState(false)
  const [hologramBackground, setHologramBackground] = useState(false)
  const [colorShift, setColorShift] = useState(0)
  const [frequencyWaves, setFrequencyWaves] = useState([1, 1, 1])

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
        
          setSize({ width: img.width, height: img.height })
        }
      }
      img.src = storedImageData
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const animate = useCallback(() => {
    if (!canvasRef.current || !originalImageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animateFrame = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    
      if (hologramBackground) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(255, 0, 255, 0.2)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      const spinOffset = (time * 0.1 * spinSpeed) % (Math.PI * 2)
      ctx.rotate(spinOffset)
    
      const imageAspectRatio = originalImageRef.current.width / originalImageRef.current.height
      const canvasAspectRatio = canvas.width / canvas.height
    
      let drawWidth: number
      let drawHeight: number
    
      if (canvasAspectRatio > imageAspectRatio) {
        drawHeight = canvas.height
        drawWidth = drawHeight * imageAspectRatio
      } else {
        drawWidth = canvas.width
        drawHeight = drawWidth / imageAspectRatio
      }
    
      drawWidth *= shrinkFactor
      drawHeight *= shrinkFactor
    
      const leftRightOffset = leftRightMovement * 100

      const waveOffset = frequencyWaves.reduce((acc, freq, index) => {
        return acc + Math.sin(time * 0.001 * freq) * (10 / (index + 1))
      }, 0)
    
      ctx.drawImage(
        originalImageRef.current,
        -drawWidth / 2 + leftRightOffset + waveOffset,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      )
    
      if (colorShift > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          data[i] = (data[i] + colorShift) % 256
          data[i + 1] = (data[i + 1] + colorShift) % 256
          data[i + 2] = (data[i + 2] + colorShift) % 256
        }
        ctx.putImageData(imageData, 0, 0)
      }
    
      if (inverted) {
        ctx.globalCompositeOperation = 'difference'
        ctx.fillStyle = 'white'
        ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
      }
    
      ctx.restore()
    
      animationRef.current = requestAnimationFrame(animateFrame)
    }
    
    animationRef.current = requestAnimationFrame(animateFrame)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [spinSpeed, shrinkFactor, leftRightMovement, hologramBackground, inverted, colorShift, frequencyWaves])

  useEffect(() => {
    const cleanup = animate()
    return cleanup
  }, [animate])

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(event.target.value))
  }

  const handleFrequencyChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequencies = [...frequencyWaves]
    newFrequencies[index] = parseFloat(event.target.value)
    setFrequencyWaves(newFrequencies)
  }

  const startRecording = useCallback(() => {
    if (canvasRef.current) {
      try {
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
      } catch (error) {
        console.error('Error starting recording:', error)
        alert('Failed to start recording. Your browser may not support this feature.')
      }
    }
  }, [])

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      chunksRef.current = []
    }
  }

  const resetControls = () => {
    setSpinSpeed(1)
    setShrinkFactor(1)
    setLeftRightMovement(0)
    setSize({ width: 600, height: 400 })
    setPosition({ x: 0, y: 0 })
    setInverted(false)
    setHologramBackground(false)
    setColorShift(0)
    setFrequencyWaves([1, 1, 1])
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
                Spin Speed:
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={spinSpeed}
                  onChange={(e) => setSpinSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </label>
              <span className="text-black">{spinSpeed.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Shrink Factor:
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={shrinkFactor}
                  onChange={(e) => setShrinkFactor(parseFloat(e.target.value))}
                  className="w-full"
                />
              </label>
              <span className="text-black">{shrinkFactor.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Left-Right Movement:
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={leftRightMovement}
                  onChange={(e) => setLeftRightMovement(parseFloat(e.target.value))}
                  className="w-full"
                />
              </label>
              <span className="text-black">{leftRightMovement.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-black">
                Color Shift:
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={colorShift}
                  onChange={(e) => setColorShift(parseInt(e.target.value))}
                  className="w-full"
                />
              </label>
              <span className="text-black">{colorShift}</span>
            </div>
            {frequencyWaves.map((freq, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 text-black">
                  Frequency Wave {index + 1}:
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={freq}
                    onChange={handleFrequencyChange(index)}
                    className="w-full"
                  />
                </label>
                <span className="text-black">{freq.toFixed(1)}</span>
              </div>
            ))}
            <div className="mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  checked={hologramBackground}
                  onChange={(e) => setHologramBackground(e.target.checked)}
                  className="mr-2"
                />
                Hologram Background
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  checked={inverted}
                  onChange={(e) => setInverted(e.target.checked)}
                  className="mr-2"
                />
                Invert Image
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  checked={keepAspectRatio}
                  onChange={(e) => setKeepAspectRatio(e.target.checked)}
                  className="mr-2"
                />
                Keep Aspect Ratio
              </label>
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
          <div className="md:w-2/3" ref={containerRef}>
            <Rnd
              size={{ width: size.width, height: size.height }}
              position={{ x: position.x, y: position.y }}
              onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
              onResizeStop={(e, direction, ref, delta, position) => {
                setPosition(position)
                if (keepAspectRatio) {
                  const aspectRatio = size.width / size.height
                  if (direction.includes('right') || direction.includes('left')) {
                    setSize({
                      width: ref.offsetWidth,
                      height: ref.offsetWidth / aspectRatio,
                    })
                  } else {
                    setSize({
                      width: ref.offsetHeight * aspectRatio,
                      height: ref.offsetHeight,
                    })
                  }
                } else {
                  setSize({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                  })
                }
              }}
              lockAspectRatio={keepAspectRatio}
            >
              <canvas 
                ref={canvasRef} 
                width={size.width}
                height={size.height}
                className="border border-gray-300 w-full h-full" 
                aria-label="Wave Manipulation Visualization"
              />
            </Rnd>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return <WaveManipulation />
}

