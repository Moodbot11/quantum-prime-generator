import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ImageCaptureProps {
  content: string
  onClose: () => void
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ content, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (content) {
      renderImage()
    }
  }, [content, renderImage])

  const renderImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const padding = 20
    const maxWidth = 800
    const fontSize = 14
    const scale = 0.67 // 67% of original size
    const lineHeight = fontSize * 1.2

    ctx.font = `${fontSize}px monospace`

    const words = content.split('')
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

    canvas.width = (textWidth + padding * 2) * scale
    canvas.height = (textHeight + padding * 2) * scale

    ctx.scale(scale, scale)

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale)

    ctx.font = `${fontSize}px monospace`
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'top'

    lines.forEach((line, index) => {
      const x = padding
      const y = padding + index * lineHeight
      ctx.fillText(line, x, y)
    })
  }

  const handleCapture = () => {
    if (canvasRef.current) {
      try {
        const imageData = canvasRef.current.toDataURL('image/png')
        localStorage.setItem('capturedWaveImage', imageData)
        router.push('/wave-manipulation')
      } catch (err) {
        console.error('Capture error:', err)
        alert('Failed to capture the image. Please try again.')
      }
    } else {
      alert('No image captured. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full m-4">
        <h3 className="text-xl font-bold mb-4">Captured Wave Image</h3>
        <div className="mb-4 overflow-auto" style={{ maxHeight: '60vh' }}>
          <canvas ref={canvasRef} className="mx-auto" />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCapture}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCapture

